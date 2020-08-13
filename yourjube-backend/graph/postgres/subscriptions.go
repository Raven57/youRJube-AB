package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type SubscriptionsRepo struct{
  DB * pg.DB
}
func (u *SubscriptionsRepo) Subscribe (tx *pg.Tx, video *model.Usersubscription) (*model.Usersubscription,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (u *SubscriptionsRepo) Unsubscribe (tx *pg.Tx, video *model.Usersubscription) (*model.Usersubscription,error){
  _,err := tx.Model(video).Where("userid = ?",video.Userid).Where("channelid = ?",video.Channelid).Delete()
  return video, err
}
func (l *SubscriptionsRepo) GetSubsByField (field, value string) (*model.Usersubscription, error){
 var loc model.Usersubscription
 err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()
 return &loc,err
}

func (l *SubscriptionsRepo) FindOne (userid, channel string) (*model.Usersubscription, error){
 var loc model.Usersubscription
 err := l.DB.Model(&loc).Where("userid = ?",userid).Where("channelid = ?",channel).Limit(1).Select()
 return &loc,err
}
func (u *SubscriptionsRepo) UpdateNotif (tx *pg.Tx, video *model.Usersubscription) (*model.Usersubscription,error){
  _,err := tx.Model(video).Where("userid = ?",video.Userid).Where("channelid = ?",video.Channelid).Update()
  return video, err
}
func (l *SubscriptionsRepo) CountSubs (userid string) (int, error){
 var loc model.Usersubscription
 count, err := l.DB.Model(&loc).Where("channelid = ?",userid).Count()
 return count,err
}

func (l *SubscriptionsRepo) GetForUser (userid string)([]*model.Usersubscription, error){
  var subs []*model.Usersubscription
  err := l.DB.Model(&subs).Where("userid = ?",userid).Select()
  return subs, err
}

