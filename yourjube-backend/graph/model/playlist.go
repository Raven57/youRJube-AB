package model

import "time"

type Playlist struct {
  Playlistid          string            `json:"playlistid"`
  Playlisttitle       string            `json:"playlisttitle"`
  Playlistdescription string            `json:"playlistdescription"`
  Createdtime         time.Time         `json:"createdtime"`
  Updatedtime         time.Time         `json:"updatedtime"`
  Playlisturl         string            `json:"playlisturl"`
  Thumbnailsource     string            `json:"thumbnailsource"`
  Privacyid           string            `json:"privacyid"`
  Userid              string            `json:"userid"`
  Privacy             *Privacy          `json:"privacy"`
  Playlistdetails     []*Playlistdetail `json:"playlistdetails"`
  User                *User             `json:"user"`
}
