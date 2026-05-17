package main

import "time"

type Variant struct {
	Label    string `json:"label"`
	Price    string `json:"price"`
	Currency string `json:"currency"`
	URL      string `json:"url"`
}

func (v Variant) DisplayPrice() string {
	if v.Currency != "" {
		return v.Currency + " " + v.Price
	}
	return v.Price
}

type Product struct {
	Name     string    `json:"name"`
	Image    string    `json:"image"`
	Shop     string    `json:"shop"`
	Variants []Variant `json:"variants"`
}

func (p Product) First() Variant {
	if len(p.Variants) == 0 {
		return Variant{}
	}
	return p.Variants[0]
}

func (p Product) Multi() bool {
	return len(p.Variants) > 1
}

type JobStatus string

const (
	StatusQueued  JobStatus = "queued"
	StatusRunning JobStatus = "running"
	StatusDone    JobStatus = "done"
	StatusFailed  JobStatus = "failed"
)

type JobProgress struct {
	Scraped      int `json:"scraped"`
	Skipped      int `json:"skipped"`
	Total        int `json:"total"`
	Batch        int `json:"batch,omitempty"`
	TotalBatches int `json:"total_batches,omitempty"`
}

type Job struct {
	ID             string      `json:"id"`
	Sites          []string    `json:"sites"`
	SitemapURL     string      `json:"sitemap_url,omitempty"`
	SitemapID      int64       `json:"sitemap_id,omitempty"`
	ConsoleUserID  string      `json:"console_user_id,omitempty"`
	MaxProducts    int         `json:"max_products"`
	BatchSize      int         `json:"batch_size"`
	BatchPauseSecs int         `json:"batch_pause_secs"`
	Status         JobStatus   `json:"status"`
	Progress       JobProgress `json:"progress"`
	Products       []Product   `json:"products"`
	Error          string      `json:"error,omitempty"`
	CreatedAt      time.Time   `json:"created_at"`
	UpdatedAt      time.Time   `json:"updated_at"`
}

type StartJobRequest struct {
	// Site discovery mode: scrapes /sitemap.xml for each site and finds product sitemaps
	Sites []string `json:"sites"`
	// Direct sitemap mode: scrapes this specific sitemap XML URL
	SitemapURL    string `json:"sitemap_url"`
	SitemapID     int64  `json:"sitemap_id"`      // console scraper_sitemaps.id for live progress sync
	ConsoleUserID string `json:"console_user_id"` // console user_id for linking products

	MaxProducts    int `json:"max_products"`
	BatchSize      int `json:"batch_size"`       // URLs per batch, default 50
	BatchPauseSecs int `json:"batch_pause_secs"` // seconds between batches, default 120
}

type ProgressEvent struct {
	Type         string   `json:"type"`
	Scraped      int      `json:"scraped,omitempty"`
	Skipped      int      `json:"skipped,omitempty"`
	Total        int      `json:"total,omitempty"`
	Batch        int      `json:"batch,omitempty"`
	TotalBatches int      `json:"total_batches,omitempty"`
	Message      string   `json:"message,omitempty"`
	Product      *Product `json:"product,omitempty"`
}
