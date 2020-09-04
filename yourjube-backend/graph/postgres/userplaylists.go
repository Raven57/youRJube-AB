package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type Userplaylistrepo struct{
  DB * pg.DB
}
func (u *Userplaylistrepo) Create(tx *pg.Tx, video *model.Userplaylist) (*model.Userplaylist,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (u *Userplaylistrepo) Delete (tx *pg.Tx, video *model.Userplaylist) (*model.Userplaylist,error){
  _,err := tx.Model(video).Where("userid = ?",video.Userid).Where("playlistid = ?",video.Playlistid).Delete()
  return video, err
}
func (l *Userplaylistrepo) GetSubsByField (field, value string) (*model.Usersubscription, error){
  var loc model.Usersubscription
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()
  return &loc,err
}

func (l *Userplaylistrepo) FindOne (userid, playlistid string) (*model.Userplaylist, error){
  var loc model.Userplaylist
  err := l.DB.Model(&loc).Where("userid = ?",userid).Where("playlistid = ?",playlistid).Limit(1).Select()
  return &loc,err
}
func (u *Userplaylistrepo) UpdateNotif (tx *pg.Tx, video *model.Usersubscription) (*model.Usersubscription,error){
  _,err := tx.Model(video).Where("userid = ?",video.Userid).Where("channelid = ?",video.Channelid).Update()
  return video, err
}
func (l *Userplaylistrepo) CountSubs (userid string) (int, error){
  var loc model.Usersubscription
  count, err := l.DB.Model(&loc).Where("channelid = ?",userid).Count()
  return count,err
}

func (l *Userplaylistrepo) GetForUser (userid string)([]*model.Userplaylist, error){
  var subs []*model.Userplaylist
  err := l.DB.Model(&subs).Where("userid = ?",userid).Select()
  return subs, err
}


func (l *Userplaylistrepo) GetForPlaylist (playlistid string)([]*model.Userplaylist, error){
  var subs []*model.Userplaylist
  err := l.DB.Model(&subs).Where("playlistid = ?",playlistid).Select()
  return subs, err
}
