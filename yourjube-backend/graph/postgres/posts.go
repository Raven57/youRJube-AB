package postgres

import (
  "fmt"
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
)

type PostsRepo struct{
  DB * pg.DB
}
func (l *PostsRepo) GetPostByField (field, value string) (*model.Post, error){
  var loc model.Post
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}
func (u *PostsRepo) CreatePost (tx *pg.Tx, video *model.Post) (*model.Post,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (l *PostsRepo) GetPostsByField (field, value string) ([]*model.Post, error){
  var loc []*model.Post
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *PostsRepo) GetPostsByUser(id string) ([]*model.Post, error) {
  return l.GetPostsByField("userid",id)
}



