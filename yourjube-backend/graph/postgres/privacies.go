package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type PrivaciesRepo struct{
  DB * pg.DB
}


func (l *PrivaciesRepo) GetPrivacyByField (field, value string) (*model.Privacy, error){
  var loc model.Privacy
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}

