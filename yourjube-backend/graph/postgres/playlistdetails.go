package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
  "log"
  "time"
  "errors"
)

type Playlistdetailsrepo struct{
  DB * pg.DB
}
func (l *Playlistdetailsrepo) GetPlaylistDetailByField (field, value string) (*model.Playlistdetail, error){
  var loc model.Playlistdetail
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()
  return &loc,err
}

func (l *Playlistdetailsrepo) GetPremiumdetailsByField (field, value string) ([]*model.Playlistdetail, error){
  var loc []*model.Playlistdetail
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *Playlistdetailsrepo) GetCurrentPremiumdetailByField (field, value string) (*model.Playlistdetail, error){
  var loc model.Playlistdetail
  err := l.DB.Model(&loc).Where("enddate > ?",time.Now()).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return &loc,err
}
func (l *Playlistdetailsrepo) GetOnePlaylistDetail(plid,vidid string) (*model.Playlistdetail, error) {
  var loc model.Playlistdetail
  err := l.DB.Model(&loc).Where("playlistid = ?",plid).Where("videoid = ? ",vidid).Limit(1).Select()
  return &loc,err
}
func (l *Playlistdetailsrepo) GetPlaylistDetail(id string) ([]*model.Playlistdetail, error) {
  return l.GetPremiumdetailsByField("playlistid",id)
}
func (u *Playlistdetailsrepo) DeleteOne (tx *pg.Tx, video *model.Playlistdetail) (*model.Playlistdetail,error){
  _,err := tx.Model(video).Where("videoid = ?",video.Videoid).Where("playlistid = ?",video.Playlistid).Delete()
  return video, err
}
func (u *Playlistdetailsrepo) Update (video *model.Playlistdetail) (*model.Playlistdetail,error){
  tx, err := u.DB.Begin()
  if err != nil {
    log.Printf("Error saat buat trannsaksi update %v", err)
    return nil, errors.New("ERROR TRANSAKSI update")
  }

  defer tx.Rollback()

  _,errr := tx.Model(video).Where("videoid = ?",video.Videoid).Where("playlistid = ?",video.Playlistid).Update()
  if errr!=nil{
    return nil, errr
  }

  if err := tx.Commit(); err != nil {
    log.Printf("Error commit finishing update %v", err)
    return nil, err
  }

  return video, nil
}
func (u *Playlistdetailsrepo) DeleteAll (tx *pg.Tx, video *[]*model.Playlistdetail, psid string) ([]*model.Playlistdetail,error){
  _,err := tx.Model(video).Where("playlistid = ?",psid).Delete()
  return *video, err
}
func (l *Playlistdetailsrepo) GetCurrentPremiumdetailByUser(id string) (*model.Playlistdetail, error) {
  return l.GetCurrentPremiumdetailByField("userid",id)
}

func (l *Playlistdetailsrepo) Create (tx *pg.Tx, user *model.Playlistdetail) (*model.Playlistdetail,error){
  _,err := tx.Model(user).Returning("NULL").Insert()
  return user, err
}

//func (u *Playlistdetailsrepo) Update (tx *pg.Tx, user *model.Playlistdetail) (*model.Playlistdetail,error){
//  _,err := tx.Model(user).Where("startdate = ?",user.Startdate).Where(" userid = ?",user.Userid).Update()
//  return user, err
//}
