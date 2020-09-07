package model

import "time"

type Playlistdetail struct {
  Playlistid string  `json:"playlistid"`
  Videoid    string  `json:"videoid"`
  Viewcount  float64 `json:"viewcount"`
  Videoorder int     `json:"videoorder"`
  Dateadded time.Time `json:"updatedtime"`
  //Video      *Video  `json:"video"`
}
