package model

import "time"

type Video struct {
  Videoid          string            `json:"videoid"`
  Videotitle       string            `json:"videotitle"`
  Videodescription string            `json:"videodescription"`
  Videosource      string            `json:"videosource"`
  Uploadtime       time.Time         `json:"uploadtime"`
  Publishtime      time.Time         `json:"publishtime"`
  Thumbnailsource  string            `json:"thumbnailsource"`
  Viewcount        float64           `json:"viewcount"`
  Userid           string            `json:"userid"`
  Typeid           string            `json:"typeid"`
  Videoconditionid string            `json:"videoconditionid"`
  Locationid       string            `json:"locationid"`
  Restrictionid    string            `json:"restrictionid"`
  Categoryid       string            `json:"categoryid"`
  Privacyid        string            `json:"privacyid"`
  //Videotype        *Videotype        `json:"videotype"`
  //Videocondition   *Videocondition   `json:"videocondition"`
  //Location         *Location         `json:"location"`
  //Restriction      *Restriction      `json:"restriction"`
  //Category         *Category         `json:"category"`
  //Privacy          *Privacy          `json:"privacy"`
  //Comments         []*Comment        `json:"comments"`
  //Reactions        []*Reaction       `json:"reactions"`
  //Playlistdetails  []*Playlistdetail `json:"playlistdetails"`
}

