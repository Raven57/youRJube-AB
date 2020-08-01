package postgres
import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type RestrictionsRepo struct{
  DB * pg.DB
}


func (l *RestrictionsRepo) GetRestrictionByField (field, value string) (*model.Restriction, error){
  var loc model.Restriction
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return &loc,err
}

func (l *RestrictionsRepo) GetRestrictionById(id string) (*model.Restriction, error) {
  return l.GetRestrictionByField("restrictionid",id)
}
