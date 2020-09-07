package postgres
import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type ReactiontypesRepo struct{
  DB * pg.DB
}
func (l *ReactiontypesRepo) GetReactionByField (field, value string) (*model.Reactiontype, error){
  var loc model.Reactiontype
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}
func (u *ReactiontypesRepo) CreateReaction (tx *pg.Tx, video *model.Reactiontype) (*model.Reactiontype,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (l *ReactiontypesRepo) GetReactionsByField (field, value string) ([]*model.Reactiontype, error){
  var loc []*model.Reactiontype
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *ReactiontypesRepo) GetReactionsByUser(id string) ([]*model.Reactiontype, error) {
  return l.GetReactionsByField("userid",id)
}

