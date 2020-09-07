package postgres

import (
  "fmt"
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
)

type VideoconditionsRepo struct{
  DB * pg.DB
}

func (l *VideoconditionsRepo) GetConditionByField (field, value string) (*model.Videocondition, error){
  var loc model.Videocondition
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}


func (l *VideoconditionsRepo) GetConditionById(id string) (*model.Videocondition, error) {
  return l.GetConditionByField("videoconditionid",id)
}
