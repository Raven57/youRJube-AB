package model

import "time"

type Premiumdetail struct {
  Userid      string       `json:"userid"`
  Premiumid   string       `json:"premiumid"`
  Startdate   time.Time    `json:"startdate"`
  Enddate     time.Time    `json:"enddate"`
  //Premiumtype *Premiumtype `json:"premiumtype"`
}
