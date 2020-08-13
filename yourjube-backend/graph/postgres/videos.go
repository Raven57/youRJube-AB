package postgres

import (
  "errors"
  "fmt"
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
  "log"
  "math/rand"
  "time"
)

type VideosRepo struct {
  DB *pg.DB
}

func (v *VideosRepo) GetVideoByField (field, value string) (*model.Video, error){
  var vid model.Video
  err := v.DB.Model(&vid).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()

  if vid.Videoconditionid=="2"{
    if vid.Publishtime.Before(time.Now())||vid.Publishtime.Equal(time.Now()){
      vid.Videoconditionid="1"

      tx, err := v.DB.Begin()
      if err != nil {
        log.Printf("Error update Vid %v", err)
        return nil, errors.New("ERROR TRANSAKSI update Vid")
      }

      defer tx.Rollback()

      if _, err := v.UpdateVideo(tx, &vid); err != nil {
        log.Printf("Error update vid %v", err)
        return nil, err
      }

      if err := tx.Commit(); err != nil {
        log.Printf("Error commit update vid %v", err)
        return nil, err
      }
    }
  }

  errr := v.DB.Model(&vid).Where(fmt.Sprintf("%v = ?",field),value).Limit(1).Select()
  if errr!= nil {
    return nil, errr
  }
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
  for i:= len(videos)-1 ; i>0;i--{

    if videos[i].Videoconditionid=="2"{
      if videos[i].Publishtime.Before(time.Now())||videos[i].Publishtime.Equal(time.Now()){
        videos[i].Videoconditionid="1"

        tx, err := v.DB.Begin()
        if err != nil {
          log.Printf("Error update Vid %v", err)
          return nil, errors.New("ERROR TRANSAKSI update Vid")
        }

        defer tx.Rollback()

        if _, err := v.UpdateVideo(tx, videos[i]); err != nil {
          log.Printf("Error update vid %v", err)
          return nil, err
        }

        if err := tx.Commit(); err != nil {
          log.Printf("Error commit update vid %v", err)
          return nil, err
        }
      }
    }
  }
  errr := v.DB.Model(&videos).Where("userid = ?",userid).Select()
  if errr != nil {
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
func (u *VideosRepo) DeleteVideo (tx *pg.Tx, video *model.Video) (*model.Video,error){
  _,err := tx.Model(video).Where("videoid = ?",video.Videoid).Delete()
  return video, err
}
func (u *VideosRepo) UpdateVideo (tx *pg.Tx, video *model.Video) (*model.Video,error){
  _,err := tx.Model(video).Where("videoid = ?",video.Videoid).Update()
  return video, err
}
func (r *VideosRepo) GetAllCategoryVideos(filter *model.VideoFilter) (*model.CategoryQuery, error) {
  var a []*model.Video
  var m []*model.Video
  var w []*model.Video
  var rr []*model.Video

  qa:=r.DB.Model(&a).Where("publishtime < ?", time.Now()).Order("viewcount DESC")
  qm:=r.DB.Model(&m).Where("publishtime < ?", time.Now()).
    Where("publishtime > ?",time.Now().AddDate(0,-1,0)).Order("viewcount DESC")
  qw:=r.DB.Model(&w).Where("publishtime < ?", time.Now()).
    Where("publishtime > ?",time.Now().AddDate(0,0,-7)).Order("viewcount DESC")
  qr:=r.DB.Model(&rr).Where("publishtime < ?", time.Now()).Order("publishtime DESC")

  //ubah kondisi filter
  if filter!= nil  {
    if filter.Categoryid!=nil && *filter.Categoryid!=""{
      qa.Where("categoryid = ?",*filter.Categoryid)
      qm.Where("categoryid = ?",*filter.Categoryid)
      qw.Where("categoryid = ?",*filter.Categoryid)
      qr.Where("categoryid = ?",*filter.Categoryid)
    }
    if filter.Restrictionid!=nil && *filter.Restrictionid=="1"{
      qa.Where("restrictionid = 1")
      qm.Where("restrictionid = 1")
      qw.Where("restrictionid = 1")
      qr.Where("restrictionid = 1")
    }
    if filter.Locationid!=nil && *filter.Locationid!=""{
      qa.Where("locationid = ?",*filter.Locationid)
      qm.Where("locationid = ?",*filter.Locationid)
      qw.Where("locationid = ?",*filter.Locationid)
      qr.Where("locationid = ?",*filter.Locationid)
    }
    if filter.Typeid!=nil && *filter.Typeid=="1"{
      qa.Where("typeid = 1")
      qm.Where("typeid = 1")
      qw.Where("typeid = 1")
      qr.Where("typeid = 1")
    }
  } else {
    return nil, errors.New("No FILTER!")
  }

  err     :=qa.Limit(20).Select()
  errr    :=qm.Limit(20).Select()
  errrr   :=qw.Limit(20).Select()
  errrrr  :=qr.Limit(20).Select()
  if err!= nil{
    return nil, errors.New("Error query 1")
  }
  if errr!= nil {
   return nil, errors.New("Error query 2")
  }
  if errrr!= nil {
    return nil, errors.New("Error query 3")
  }
  if errrrr!= nil {
    return nil, errors.New("Error query 4")
  }
  cat := model.CategoryQuery{
    AllTime: a,
    Month:   m,
    Week:    w,
    Recent:  rr,
  }

  return &cat,nil
}
func (r *VideosRepo) GetChannelVideos(filter *model.VideoFilter) (*model.ChannelHome, error) {
  var re []*model.Video
  var ra []*model.Video
  var p []*model.Playlist

  qe:=r.DB.Model(&re).Where("userid = ? ",filter.Userid).Where("publishtime < ?", time.Now()).Where("privacyid = 1").
    Order("publishtime DESC")
  qa:=r.DB.Model(&ra).Where("publishtime < ?", time.Now()).Where("userid = ? ",filter.Userid).Where("privacyid = 1")
  qp:=r.DB.Model(&p).Where("privacyid = 1").Where("userid = ? ",filter.Userid)

  if filter.Restrictionid!=nil && *filter.Restrictionid=="1"{
    qe.Where("restrictionid = 1")
    qa.Where("restrictionid = 1")
  }

  if filter.Typeid!=nil && *filter.Typeid=="1"{
    qe.Where("typeid = 1")
    qa.Where("typeid = 1")
  }

  err     :=qe.Limit(5).Select()
  errr    :=qa.Select()
  errrr   :=qp.Select()
  if err!= nil{
    return nil, errors.New("Error query 1")
  }
  if errr!= nil {
    return nil, errors.New("Error query 2")
  }
  if errrr!= nil {
    return nil, errors.New("Error query 3")
  }
  random := random(ra)
  randomp := randomPlaylist(p)

  getV := random[:5]
  getP := randomp[:5]

  cat := model.ChannelHome{
    Recent:   re,
    Random:
      getV,
    Playlist:
      getP,
  }

  return &cat,nil
}

func (r *VideosRepo) GetAllHomeVideos(filter *model.VideoFilter) ([]*model.Video, error) {
  var vids []*model.Video
  var vidsP []*model.Video

  q:=r.DB.Model(&vids)

  qp:=r.DB.Model(&vidsP)

  //ubah kondisi filter
  if filter!= nil  {
    //if filter.Categoryid!=nil&&*filter.Categoryid!=""{
    //  //q.Where("name ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Categoryid))
    //  q.Where("categoryid = ?",  *filter.Categoryid)
    //}
    if filter.Sortby!=nil && *filter.Sortby!=""{
      switch *filter.Sortby {
      case "popular":
        break
      case "oldest":
        break
      case "newest":
        break
      }
    }
    if filter.Userid!=nil && *filter.Userid!=""{
      q.Where("userid = ?",*filter.Userid)
      qp.Where("userid = ?",*filter.Userid)
    }
    if filter.Restrictionid!=nil && *filter.Restrictionid=="1"{
      q.Where("restrictionid = 1")
      qp.Where("restrictionid = 1")
    }
    if filter.Locationid!=nil && *filter.Locationid!=""{
      q.Where("locationid = ?",*filter.Locationid)
      qp.Where("locationid != ?",*filter.Locationid)
    }
    if filter.Videoconditionid!=nil && *filter.Videoconditionid=="1"{
     q.Where("videoconditionid = 1")
     qp.Where("videoconditionid = 1")
    }
    if filter.Typeid!=nil && *filter.Typeid=="1"{
    q.Where("typeid = 1")
    qp.Where("typeid = 1")
    }
  }

  err:=q.Select()
  errr :=qp.Select()
  if err!= nil || errr!=nil  {
   return nil, errors.New("Error query home videos")
  }

  v := random(vids)
  vs :=random(vidsP)

  for _,va := range vs{
  v = append(v, va)
  }
  return v,nil
}

func (r *VideosRepo) GetAllCategoryVideosPage(filter *model.VideoFilter) ([]*model.Video, error) {
  var vids []*model.Video

  q:=r.DB.Model(&vids)


  //ubah kondisi filter
  if filter!= nil  {
    //if filter.Categoryid!=nil&&*filter.Categoryid!=""{
    //  //q.Where("name ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Categoryid))
    //  q.Where("categoryid = ?",  *filter.Categoryid)
    //}
    if filter.Sortby!=nil && *filter.Sortby!=""{
      switch *filter.Sortby {
      case "popular":
        q.Order("viewcount DESC")
        break
      case "oldest":
        q.Order("publishtime ASC")
        break
      case "newest":
        q.Order("publishtime DESC")
        break
      }
    }
    if filter.Userid!=nil && *filter.Userid!=""{
      q.Where("userid = ?",*filter.Userid)
    }
    if filter.Restrictionid!=nil && *filter.Restrictionid=="1"{
      q.Where("restrictionid = 1")
    }
    if filter.Locationid!=nil && *filter.Locationid!=""{
      q.Where("locationid = ?",*filter.Locationid)
    }
    if filter.Videoconditionid!=nil && *filter.Videoconditionid=="1"{
      q.Where("videoconditionid = 1")
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
func (u *VideosRepo) GetViewOfUser(id string) (int, error) {
  var user model.Video
  var vcount  int
  err := u.DB.Model(&user).
    ColumnExpr("SUM( viewcount ) AS vcount").
    Where("userid = ?",id).Select(&vcount)
  return vcount,err
}
func random(v []*model.Video) []*model.Video{
  for i:= len(v)-1 ; i>0;i--{
    s1 := rand.NewSource(time.Now().UnixNano())
    r1 := rand.New(s1)
    j := r1.Intn(i+1)
    v[i],v[j] = v[j],v[i]
  }
  return v
}
func randomPlaylist(v []*model.Playlist) []*model.Playlist{
  for i:= len(v)-1 ; i>0;i--{
    s1 := rand.NewSource(time.Now().UnixNano())
    r1 := rand.New(s1)
    j := r1.Intn(i+1)
    v[i],v[j] = v[j],v[i]
  }
  return v
}
