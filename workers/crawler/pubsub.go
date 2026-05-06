package main

import (
	"context"
	"encoding/json"
	"sync"
)

// ---- Job queue ----

var jobQueue = make(chan string, 256)

func enqueueJob(jobID string) {
	jobQueue <- jobID
}

// ---- Progress pub/sub ----

type subscriber struct {
	ch chan string
}

var (
	subsMu sync.Mutex
	subs   = map[string][]*subscriber{}
)

func subscribe(jobID string) *subscriber {
	s := &subscriber{ch: make(chan string, 64)}
	subsMu.Lock()
	subs[jobID] = append(subs[jobID], s)
	subsMu.Unlock()
	return s
}

func unsubscribe(jobID string, s *subscriber) {
	subsMu.Lock()
	list := subs[jobID]
	for i, sub := range list {
		if sub == s {
			subs[jobID] = append(list[:i], list[i+1:]...)
			break
		}
	}
	if len(subs[jobID]) == 0 {
		delete(subs, jobID)
	}
	subsMu.Unlock()
}

type ProgressEvent struct {
	Type    string   `json:"type"`
	Scraped int      `json:"scraped,omitempty"`
	Skipped int      `json:"skipped,omitempty"`
	Total   int      `json:"total,omitempty"`
	Product *Product `json:"product,omitempty"`
	Message string   `json:"message,omitempty"`
}

func publishProgress(_ context.Context, jobID string, ev ProgressEvent) {
	data, _ := json.Marshal(ev)
	msg := string(data)
	subsMu.Lock()
	for _, s := range subs[jobID] {
		select {
		case s.ch <- msg:
		default:
		}
	}
	subsMu.Unlock()
}
