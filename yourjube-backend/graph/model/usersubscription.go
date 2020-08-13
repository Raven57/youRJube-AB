package model

type Usersubscription struct {
  Userid       string `json:"userid"`
  Channelid    string `json:"channelid"`
  Notification bool   `json:"notification"`
  //User         *User  `json:"user"`
  //Channel      *User  `json:"channel"`
}
