package postgres


import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type CommentsRepo struct{
  DB * pg.DB
}
func (l *CommentsRepo) GetCommentByField (field, value string) (*model.Comment, error){
  var loc model.Comment
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}

func (l *CommentsRepo) GetCommentsByField (field, value string) ([]*model.Comment, error){
  var loc []*model.Comment
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *CommentsRepo) GetCommentsByUser(id string) ([]*model.Comment, error) {
  return l.GetCommentsByField("userid",id)
}
