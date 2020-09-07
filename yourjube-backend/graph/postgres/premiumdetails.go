package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
  "time"
)

type PremiumdetailsRepo struct{
  DB * pg.DB
}


func (l *PremiumdetailsRepo) GetLocationByField (field, value string) (*model.Premiumdetail, error){
  var loc model.Premiumdetail
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}

func (l *PremiumdetailsRepo) GetPremiumdetailsByField (field, value string) ([]*model.Premiumdetail, error){
  var loc []*model.Premiumdetail
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *PremiumdetailsRepo) GetCurrentPremiumdetailByField (field, value string) (*model.Premiumdetail, error){
  var loc model.Premiumdetail
  err := l.DB.Model(&loc).Where("enddate > ?",time.Now()).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return &loc,err
}

func (l *PremiumdetailsRepo) GetPremiumdetailsByUser(id string) ([]*model.Premiumdetail, error) {
  return l.GetPremiumdetailsByField("userid",id)
}

func (l *PremiumdetailsRepo) GetCurrentPremiumdetailByUser(id string) (*model.Premiumdetail, error) {
  return l.GetCurrentPremiumdetailByField("userid",id)
}

func (l *PremiumdetailsRepo) CreateDetail (tx *pg.Tx, user *model.Premiumdetail) (*model.Premiumdetail,error){
  _,err := tx.Model(user).Returning("NULL").Insert()
  return user, err
}

func (u *PremiumdetailsRepo) Update (tx *pg.Tx, user *model.Premiumdetail) (*model.Premiumdetail,error){
  _,err := tx.Model(user).Where("startdate = ?",user.Startdate).Where(" userid = ?",user.Userid).Update()
  return user, err
}
