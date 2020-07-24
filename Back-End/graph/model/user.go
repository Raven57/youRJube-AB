package model

import "time"

type User struct {
	Userid         string       `json:"userid"`
	Useremail      string       `json:"useremail"`
	Username       string       `json:"username"`
	Joindate       time.Time    `json:"joindate"`
	Channeldetail  string       `json:"channeldetail"`
	Channelurl     string       `json:"channelurl"`
	Bgimgaddr      string       `json:"bgimgaddr"`
	Premiumstart   time.Time    `json:"premiumstart"`
	Premiumend     time.Time    `json:"premiumend"`
	Profileimgaddr string       `json:"profileimgaddr"`
	Premiumid      string       `json:"premiumid"`
}