package postgres
import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type ReactionsRepo struct{
  DB * pg.DB
}
func (u *ReactionsRepo) React (tx *pg.Tx, video *model.Reaction) (*model.Reaction,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (u *ReactionsRepo) DeleteReaction (tx *pg.Tx, input *model.Reaction) (*model.Reaction,error){

  q := tx.Model(input).Where("userid = ?",input.Userid)


    if input.Postid!=""{
      q.Where("postid = ? ",input.Postid)
    }
    if input.Commentid!=""{
      q.Where("commentid = ? ",input.Commentid)
    }
    if input.Videoid!=""{
      q.Where("videoid = ? ",input.Videoid)
  }

  _,err := q.Delete()
  return input, err
}
func (l *ReactionsRepo) GetReactionByField (field, value string) (*model.Reaction, error){
  var loc model.Reaction
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}
func (u *ReactionsRepo) CreateReaction (tx *pg.Tx, video *model.Reaction) (*model.Reaction,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (l *ReactionsRepo) GetReactionsByField (field, value string) ([]*model.Reaction, error){
  var loc []*model.Reaction
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *ReactionsRepo) GetReactionsByUser(id string) ([]*model.Reaction, error) {
  return l.GetReactionsByField("userid",id)
}
func (l *ReactionsRepo) FindOne (input *model.ReactionFilter, reactiontypeid string) (*model.Reaction, error){
  var loc model.Reaction
  q := l.DB.Model(&loc).Where("userid = ?",input.Userid)

  if reactiontypeid!="" {
    q.Where("reactiontypeid = ?",reactiontypeid)
  }

  if input!=nil {
    if input.Postid!=nil && *input.Postid!=""{
      q.Where("postid = ? ",*input.Postid)
    }
    if input.Commentid!=nil && *input.Commentid!=""{
      q.Where("commentid = ? ",*input.Commentid)
    }
    if input.Videoid!=nil && *input.Videoid!=""{
      q.Where("videoid = ? ",*input.Videoid)
    }
  }
  err := q.Limit(1).Select()
  return &loc,err
}
func (l *ReactionsRepo) CountLike (videoid, commentid, postid *string) (int, error){
  var loc model.Reaction

  q := l.DB.Model(&loc).Where("reactiontypeid = 1")


  if videoid!=nil && *videoid!=""{
    q.Where("videoid = ?",*videoid)
  }
  if commentid!=nil && *commentid!=""{
    q.Where("commentid = ?",*commentid)
  }
  if postid!=nil && *postid!=""{
    q.Where("postid = ?",*postid)
  }

  count, err := q.Count()

  return count,err
}
func (l *ReactionsRepo) CountDislike (videoid, commentid, postid *string) (int, error){
  var loc model.Reaction

  q := l.DB.Model(&loc).Where("reactiontypeid = 2")

    if videoid!=nil && *videoid!=""{
     q.Where("videoid = ?",*videoid)
    }
    if commentid!=nil && *commentid!=""{
     q.Where("commentid = ?",*commentid)
    }
    if postid!=nil && *postid!=""{
      q.Where("postid = ?",*postid)
    }

  count, err := q.Count()

  return count,err
}
