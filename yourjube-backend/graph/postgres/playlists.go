package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "fmt"
)

type PlaylistsRepo struct{
  DB * pg.DB
}
func (l *PlaylistsRepo) GetPlaylistByField (field, value string) (*model.Playlist, error){
  var loc model.Playlist
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).First()
  return &loc,err
}

func (l *PlaylistsRepo) GetPlaylistsByField (field, value string) ([]*model.Playlist, error){
  var loc []*model.Playlist
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return loc,err
}

func (l *PlaylistsRepo) GetPlaylistsByUser(id string) ([]*model.Playlist, error) {
  return l.GetPlaylistsByField("userid",id)
}

