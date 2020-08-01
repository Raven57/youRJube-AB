package model

import "time"

type Post struct {
  Postid      string      `json:"postid"`
  Postpicture string      `json:"postpicture"`
  Posttime    time.Time   `json:"posttime"`
  Postdetail  string      `json:"postdetail"`
  Userid      string      `json:"userid"`
  User        *User       `json:"user"`
  Reactions   []*Reaction `json:"reactions"`
}

