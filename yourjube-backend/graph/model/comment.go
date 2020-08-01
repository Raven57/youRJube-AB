package model

import "time"

type Comment struct {
  Commentid     string      `json:"commentid"`
  Commentdetail string      `json:"commentdetail"`
  Commenttime   time.Time   `json:"commenttime"`
  Userid        string      `json:"userid"`
  Videoid       string      `json:"videoid"`
  Rootcommentid string      `json:"rootcommentid"`
  User          *User       `json:"user"`
  Video         *Video      `json:"video"`
  Rootcomment   *Comment    `json:"rootcomment"`
  Reactions     []*Reaction `json:"reactions"`
}
