package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
  "errors"
)

type PlaylistsRepo struct{
  DB * pg.DB
}
func (l *PlaylistsRepo) GetPlaylistByField (field, value string) (*model.Playlist, error){
  var loc model.Playlist
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()
  return &loc,err
}

func (l *PlaylistsRepo) GetPlaylistsByField (field, value string) ([]*model.Playlist, error){
  var loc []*model.Playlist
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *PlaylistsRepo) GetPlaylistsByUser(id string) ([]*model.Playlist, error) {
  var loc []*model.Playlist
  err := l.DB.Model(&loc).Where("userid = ? ",id).Order("privacyid DESC").Select()
  return loc,err
}

func (l *PlaylistsRepo) GetPlaylistByID (id string) (*model.Playlist, error){
  return l.GetPlaylistByField("playlistid",id)
}

func (u *PlaylistsRepo) Create(tx *pg.Tx, video *model.Playlist) (*model.Playlist,error){
  _,err := tx.Model(video).Returning("*").Insert()
  return video, err
}
func (u *PlaylistsRepo) Delete (tx *pg.Tx, video *model.Playlist) (*model.Playlist,error){
  _,err := tx.Model(video).Where("playlistid = ?",video.Playlistid).Delete()
  return video, err
}

func (u *PlaylistsRepo) Update (tx *pg.Tx, video *model.Playlist) (*model.Playlist,error){
  _,err := tx.Model(video).Where("playlistid = ?",video.Playlistid).Update()
  return video, err
}
func (r *PlaylistsRepo) GetAllPlaylistChannel(filter *model.PlaylistFilter) ([]*model.Playlist, error) {
  var vids []*model.Playlist

  q:=r.DB.Model(&vids)


  //ubah kondisi filter
  if filter!= nil  {
    //if filter.Categoryid!=nil&&*filter.Categoryid!=""{
    //  //q.Where("name ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Categoryid))
    //  q.Where("categoryid = ?",  *filter.Categoryid)
    //}
    if filter.Userid!=nil && *filter.Userid!=""{
      q.Where("userid = ?",*filter.Userid)
    }
    if filter.Restrictionid!=nil && *filter.Restrictionid=="1"{
      q.Where("restrictionid = 1")
    }
    if filter.Typeid!=nil && *filter.Typeid=="1"{
      q.Where("typeid = 1")
    }
  }

  err:=q.Select()
  if err!= nil{
    return nil, errors.New("Error query home videos")
  }

  return vids,nil
}

