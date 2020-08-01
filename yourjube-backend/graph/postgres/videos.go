package postgres

import (
  "fmt"
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
)

type VideosRepo struct {
  DB *pg.DB
}

func (v *VideosRepo) GetVideoByField (field, value string) (*model.Video, error){
  var vid model.Video
  err := v.DB.Model(&vid).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()
  return &vid,err
}

func (v *VideosRepo) GetVideoByID(id string) (*model.Video, error) {
  return v.GetVideoByField("videoid",id)
}

func (v *VideosRepo) GetVideoByUserAndTitle(title,userid string) (*model.Video, error) {
  var vid model.Video
  err := v.DB.Model(&vid).Where("userid = ?",userid).Where("videotitle = ?",title).Limit(1).Select()
  return &vid,err
}

func (v *VideosRepo) GetVideosByUser(userid string) ([]*model.Video, error) {
  var videos []*model.Video
  err := v.DB.Model(&videos).Where("userid = ?",userid).Select()
  if err != nil {
    return nil, err
  }
  return videos, nil
}
func (u *VideosRepo) CreateVideo (tx *pg.Tx, video *model.Video) (*model.Video,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}

func (u *VideosRepo) FinishUpload (tx *pg.Tx, video *model.Video) (*model.Video,error){
  _,err := tx.Model(video).Where("videotitle = ?",video.Videotitle).Update()
  return video, err
}
