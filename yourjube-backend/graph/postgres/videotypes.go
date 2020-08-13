package postgres

import (
  "fmt"
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
)

type VideotypesRepo struct{
  DB * pg.DB
}

func (l *VideotypesRepo) GetTypeByField (field, value string) (*model.Videotype, error){
  var loc model.Videotype
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}


func (l *VideotypesRepo) GetTypeById(id string) (*model.Videotype, error) {
  return l.GetTypeByField("videotypeid",id)
}
