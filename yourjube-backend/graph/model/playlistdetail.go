package model



type Playlistdetail struct {
  Playlistid string  `json:"playlistid"`
  Videoid    string  `json:"videoid"`
  Viewcount  float64 `json:"viewcount"`
  Videoorder int     `json:"videoorder"`
  Video      *Video  `json:"video"`
}
