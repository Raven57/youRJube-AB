package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type LocationsRepo struct{
  DB * pg.DB
}


func (l *LocationsRepo) GetLocationByField (field, value string) (*model.Location, error){
  var loc model.Location
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return &loc,err
}

func (l *LocationsRepo) GetAllLocation() ([]*model.Location, error){
  var loc []*model.Location
  err := l.DB.Model(&loc).Select()
  return loc,err
}

func (l *LocationsRepo) GetLocationById(id string) (*model.Location, error) {
  return l.GetLocationByField("locationid",id)
  //var user model.Location
  //err := l.DB.Model(&user).Where("locationid = ?", id).First()
  //if err != nil {
  //  return nil, err
  //}
  //return &user, nil
}
func (l *LocationsRepo) GetLocationByName(name string) (*model.Location, error) {
  return l.GetLocationByField("locationname",name)
  //var user model.Location
  //err := l.DB.Model(&user).Where("locationid = ?", id).First()
  //if err != nil {
  //  return nil, err
  //}
  //return &user, nil
}
func (l *LocationsRepo) CreateLoc(tx *pg.Tx, loc *model.Location) (*model.Location,error) {
  _,err := tx.Model(loc).Returning("NULL").Insert()
  return loc, err
}

