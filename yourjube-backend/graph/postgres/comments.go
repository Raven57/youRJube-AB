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
func (l *CommentsRepo) GetCommentByID (id string) (*model.Comment, error){
  return l.GetCommentByField("commentid",id)
}
func (l *CommentsRepo) GetCommentsByField (field, value string) ([]*model.Comment, error){
  var loc []*model.Comment
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}
func (u *CommentsRepo) CreateComment (tx *pg.Tx, video *model.Comment) (*model.Comment,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (l *CommentsRepo) GetCommentsByUser(id string) ([]*model.Comment, error) {
  return l.GetCommentsByField("userid",id)
}
func (l *CommentsRepo) GetCommentsByVideo(id string) ([]*model.Comment, error) {
  return l.GetCommentsByField("videoid",id)
}
func (l *CommentsRepo) CountReply(id string) (int, error) {
  var loc []*model.Comment
  i,err := l.DB.Model(&loc).Where("rootcommentid = ?",id).Count()
  if err!=nil {
    return 0,err
  }
  return i,nil
}
