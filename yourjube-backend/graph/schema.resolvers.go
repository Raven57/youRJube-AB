package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"log"
  "strconv"
  "time"

	"github.com/Raven57/yourjube-back-end/graph/generated"
	"github.com/Raven57/yourjube-back-end/graph/model"
	pg "github.com/go-pg/pg/v10"
)

func (r *categoryResolver) Videos(ctx context.Context, obj *model.Category) ([]*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *commentResolver) User(ctx context.Context, obj *model.Comment) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Userid)
}

func (r *commentResolver) Video(ctx context.Context, obj *model.Comment) (*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *commentResolver) Rootcomment(ctx context.Context, obj *model.Comment) (*model.Comment, error) {
	return r.CommentsRepo.GetCommentByID(obj.Rootcommentid)
}

func (r *commentResolver) Reactions(ctx context.Context, obj *model.Comment) ([]*model.Reaction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *locationResolver) Videos(ctx context.Context, obj *model.Location) ([]*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *locationResolver) Users(ctx context.Context, obj *model.Location) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UserUpdate(ctx context.Context, input model.UpdateUserInput) (bool, error) {
	u, err := r.UsersRepo.GetUserByEmail(input.Useremail)
	if err != nil {
		return false, errors.New("Error getting user")
	}
	if input.Username != nil && *input.Username != "" {
		u.Username = *input.Username
	}
	if input.Channeldetail != nil && *input.Channeldetail != "" {
		u.Channeldetail = *input.Channeldetail
	}
	if input.Channelurl != nil && *input.Channelurl != "" {
		u.Channelurl = *input.Channelurl
	}
	if input.Bgimgaddr != nil && *input.Bgimgaddr != "" {
		u.Bgimgaddr = *input.Bgimgaddr
	}
	if input.Profileimgaddr != nil && *input.Profileimgaddr != "" {
		u.Profileimgaddr = *input.Profileimgaddr
	}
	if input.Locationid != nil && *input.Locationid != "" {
		u.Locationid = *input.Locationid
	}
	if input.Password != nil && *input.Password != "" {
		err = u.HashPassword(*input.Password)
		if err != nil {
			log.Printf("error saat hashing %v", err)
			return false, errors.New("ERROR HASHING")
		}
	}
	if input.Age != nil && *input.Age != 0 {
		u.Age = *input.Age
	}
	if input.Restrictionid != nil && *input.Restrictionid != "" {
		u.Restrictionid = *input.Restrictionid
	}

	tx, err := r.UsersRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi user %v", err)
		return false, errors.New("ERROR TRANSAKSI user")
	}

	defer tx.Rollback()

	if _, err := r.UsersRepo.Update(tx, u); err != nil {
		log.Printf("Error update user %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit update user %v", err)
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) UploadVideo(ctx context.Context, input model.UploadVideoInput) (*model.Video, error) {
	_, err := r.VideosRepo.GetVideoByUserAndTitle(input.Videotitle, input.Userid)
	if err == nil {
		return nil, errors.New("Video Existed On Your Chanel!")
	}

	tx, err := r.VideosRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return nil, errors.New("ERROR TRANSAKSI Vid")
	}

	min := time.Duration(input.PublishAfterMinute)

  order := 1
  pds, err := r.VideosRepo.GetVideosByUser(input.Userid)
  if pds != nil {
    r.DB.Model(&pds).QueryOne(pg.Scan(&order), `
    select max(videoid) from ?TableName`)
    order += 1
  }

	conditionid := "1"
	if input.PublishAfterMinute != 0 {
		conditionid = "2"
	}
	vid := &model.Video{
		Videotitle:       input.Videotitle,
		Videodescription: input.Videodescription,
		Uploadtime:       time.Now(),
		Publishtime:      time.Now().Add(time.Minute * min),
		Userid:           input.Userid,
		Typeid:           input.Typeid,
		Videoconditionid: conditionid,
		Locationid:       input.Locationid,
		Restrictionid:    input.Restrictionid,
		Categoryid:       input.Categoryid,
		Privacyid:        input.Privacyid,
		Viewcount:        0,
	}
	defer tx.Rollback()

	if _, err := r.VideosRepo.CreateVideo(tx, vid); err != nil {
		log.Printf("Error creating vid %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit vid %v", err)
		return nil, err
	}

	vid.Videoid=strconv.Itoa(order)
	return vid, nil
}

func (r *mutationResolver) FinishUpload(ctx context.Context, input model.FinishUplodVideoInput) (*model.Video, error) {
	v, err := r.VideosRepo.GetVideoByUserAndTitle(input.Videoname, input.Userid)
	if err != nil {
		return nil, errors.New("Error getting video")
	}

	v.Videosource = input.Videosource
	v.Thumbnailsource = input.Thumbnailsource
	v.Length = input.Length
	v.Viewcount = 1
	tx, err := r.VideosRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return nil, errors.New("ERROR TRANSAKSI Vid")
	}

	defer tx.Rollback()

	if _, err := r.VideosRepo.FinishUpload(tx, v); err != nil {
		log.Printf("Error finishing upload vid %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit finishing vid %v", err)
		return nil, err
	}

	return v, nil
}

func (r *mutationResolver) CreateLocation(ctx context.Context, input model.NewLocationInput) (*model.Location, error) {
	l, err := r.LocationsRepo.GetLocationByName(input.Locationname)
	if err == nil {
		return l, nil
	}

	loc := &model.Location{
		Locationname: input.Locationname,
	}

	tx, err := r.LocationsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Loc %v", err)
		return nil, errors.New("ERROR TRANSAKSI Loc")
	}

	defer tx.Rollback()

	if _, err := r.LocationsRepo.CreateLoc(tx, loc); err != nil {
		log.Printf("Error creating loc %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit Loc %v", err)
		return nil, err
	}

	return loc, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.RegisterUserInput) (*model.AuthResponse, error) {
	_, err := r.UsersRepo.GetUserByEmail(input.Useremail)
	if err == nil {
		return nil, errors.New("Email already in use")
	}

	var restrictionid = ""

	if input.Age < 12 {
		return nil, errors.New("Not old enough")
	}

	if input.Age < 21 {
		restrictionid = "1"
	} else {
		restrictionid = "2"
	}

	user := &model.User{
		Useremail:     input.Useremail,
		Username:      input.Username,
		Joindate:      time.Now(),
		Channeldetail: "This is your channel detail",
		//Channelurl:     "",
		Bgimgaddr:      "",
		Profileimgaddr: input.Profileimgaddr,
		Locationid:     input.Locationid,
		Password:       "",
		Age:            input.Age,
		Restrictionid:  restrictionid,
	}

	err = user.HashPassword(input.Password)
	if err != nil {
		log.Printf("error saat hashing %v", err)
		return nil, errors.New("ERROR HASHING")
	}

	tx, err := r.UsersRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return nil, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.UsersRepo.CreateUser(tx, user); err != nil {
		log.Printf("Error creating user %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return nil, err
	}

	token, err := user.GenToken()
	if err != nil {
		log.Printf("error while generating the token: %v", err)
		return nil, errors.New("something went wrong")
	}

	return &model.AuthResponse{
		AuthToken: token,
		User:      user,
	}, nil
}

func (r *mutationResolver) UserLogin(ctx context.Context, input model.LoginInput) (*model.AuthResponse, error) {
	user, err := r.UsersRepo.GetUserByEmail(input.Useremail)
	if err != nil {
		fmt.Printf(" errror 1 %v", err)
		return nil, errors.New("Email or Password is wrong")
	}
	err = user.ComparePassword(input.Password)
	if err != nil {
		fmt.Printf("err 2 %v", err)
		return nil, errors.New("Email or Password is wrong")
	}
	token, err := user.GenToken()
	if err != nil {
		return nil, errors.New("Error generating token")
	}

	return &model.AuthResponse{
		AuthToken: token,
		User:      user,
	}, nil
}

func (r *mutationResolver) RefreshToken(ctx context.Context, input model.RefreshTokenInput) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreatePremiumDetail(ctx context.Context, input model.PremiumDetailInput) (*model.Premiumdetail, error) {
	p, err := r.PremiumdetailsRepo.GetCurrentPremiumdetailByUser(input.Userid)

	if err == nil {

		if p.Premiumid == "2" {
			return nil, errors.New("You have active subscription!")
		}

		p.Enddate = time.Now()

		tx, err := r.PremiumdetailsRepo.DB.Begin()
		if err != nil {
			log.Printf("Error saat buat trannsaksi PD %v", err)
			return nil, errors.New("ERROR TRANSAKSI PD")
		}

		defer tx.Rollback()

		if _, err := r.PremiumdetailsRepo.Update(tx, p); err != nil {
			log.Printf("Error updating premium detail %v", err)
			return nil, err
		}

		if err := tx.Commit(); err != nil {
			log.Printf("Error commit PD %v", err)
			return nil, err
		}
	}

	pd := &model.Premiumdetail{
		Userid:    input.Userid,
		Premiumid: input.Premiumid,
		Startdate: time.Now(),
		Enddate:   time.Now().AddDate(input.EndInYear, input.EndInMonth, 0),
	}

	txPD, err := r.PremiumdetailsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi PD %v", err)
		return nil, errors.New("ERROR TRANSAKSI PD")
	}

	defer txPD.Rollback()

	if _, err := r.PremiumdetailsRepo.CreateDetail(txPD, pd); err != nil {
		log.Printf("Error creating premium detail %v", err)
		return nil, err
	}

	if err := txPD.Commit(); err != nil {
		log.Printf("Error commit PD %v", err)
		return nil, err
	}

	return pd, nil
}

func (r *mutationResolver) Subscribe(ctx context.Context, input model.SubscribeInput) (bool, error) {
	_, err := r.SubscriptionsRepo.FindOne(input.Userid, input.Channelid)
	if err == nil {
		return false, errors.New("Already subscribed")
	}
	sub := &model.Usersubscription{
		Userid:       *input.Userid,
		Channelid:    input.Channelid,
		Notification: false,
	}

	tx, err := r.SubscriptionsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return false, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.SubscriptionsRepo.Subscribe(tx, sub); err != nil {
		log.Printf("Error Subscribe user %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) Unsubscribe(ctx context.Context, input model.SubscribeInput) (bool, error) {
	s, err := r.SubscriptionsRepo.FindOne(input.Userid, input.Channelid)
	if err != nil {
		return false, errors.New("Not FOUND!")
	}

	tx, err := r.SubscriptionsRepo.DB.Begin()

	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return false, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.SubscriptionsRepo.Unsubscribe(tx, s); err != nil {
		log.Printf("Error Subscribe user %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) UpdateNotification(ctx context.Context, input model.SubscribeInput) (bool, error) {
	s, err := r.SubscriptionsRepo.FindOne(input.Userid, input.Channelid)
	if err != nil {
		return false, errors.New("Not FOUND!")
	}
	s.Notification = *input.Notif

	tx, err := r.SubscriptionsRepo.DB.Begin()

	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return false, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.SubscriptionsRepo.UpdateNotif(tx, s); err != nil {
		log.Printf("Error Subscribe user %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) React(ctx context.Context, input model.AddReactionInput) (bool, error) {
	postid := ""
	if input.Postid != nil && *input.Postid != "" {
		postid = *input.Postid
	}
	commentid := ""
	if input.Commentid != nil && *input.Commentid != "" {
		commentid = *input.Commentid
	}
	videoid := ""
	if input.Videoid != nil && *input.Videoid != "" {
		videoid = *input.Videoid
	}
	reaction := model.Reaction{
		Userid:         input.Userid,
		Postid:         postid,
		Commentid:      commentid,
		Videoid:        videoid,
		Reactiontypeid: input.Reactiontypeid,
	}
	tx, err := r.ReactionsRepo.DB.Begin()

	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return false, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.ReactionsRepo.React(tx, &reaction); err != nil {
		log.Printf("Error Subscribe user %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) DeleteReaction(ctx context.Context, input model.ReactionFilter) (bool, error) {
	reaction, err := r.ReactionsRepo.FindOne(&input, "")
	if err != nil {
		return false, err
	}
	tx, err := r.ReactionsRepo.DB.Begin()

	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return false, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.ReactionsRepo.DeleteReaction(tx, reaction); err != nil {
		log.Printf("Error Subscribe user %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) PostAPost(ctx context.Context, input model.PostInput) (*model.Post, error) {
	var pic string
	if input.Postpicture == nil {
		pic = ""
	} else {
		pic = *input.Postpicture
	}
	var det string
	if input.Postdetail == nil {
		det = ""
	} else {
		det = *input.Postdetail
	}

	p := &model.Post{
		Posttitle:   input.Posttitle,
		Postpicture: pic,
		Posttime:    time.Now(),
		Postdetail:  det,
		Userid:      input.Userid,
	}

	tx, err := r.PostsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return nil, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.PostsRepo.CreatePost(tx, p); err != nil {
		log.Printf("Error Subscribe user %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return nil, err
	}

	return p, nil
}

func (r *mutationResolver) UserAddPlaylist(ctx context.Context, input model.AddPlaylistToUser) (*model.Userplaylist, error) {
	ps, err := r.PlaylistsRepo.GetPlaylistByID(input.Playlistid)
	if err != nil {
		fmt.Printf("error 3")
		return nil, err
	}
	if ps.Privacyid == "2" && input.Userid != ps.Userid {
		return nil, errors.New("PRIVATE PLAYLIST ")
	}

	up := &model.Userplaylist{
		Userid:     input.Userid,
		Playlistid: ps.Playlistid,
	}
	tx, err := r.Userplaylistrepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return nil, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.Userplaylistrepo.Create(tx, up); err != nil {
		log.Printf("Error create userplaylist %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return nil, err
	}
	return up, nil
}

func (r *mutationResolver) UserRemovePlaylist(ctx context.Context, input model.AddPlaylistToUser) (bool, error) {
	up, err := r.Userplaylistrepo.FindOne(input.Userid, input.Playlistid)
	if err != nil {
		return false, err
	}
	tx, err := r.Userplaylistrepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return false, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.Userplaylistrepo.Delete(tx, up); err != nil {
		log.Printf("Error create userplaylist %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) CreatePlaylist(ctx context.Context, input model.CreatePlaylistInput) (*model.Playlist, error) {
	up := &model.Playlist{
		Playlisttitle:       input.Playlisttitle,
		Playlistdescription: input.Playlistdescription,
		Createdtime:         time.Now(),
		Updatedtime:         time.Now(),
		Thumbnailsource:     "",
		Privacyid:           input.Privacyid,
		Userid:              input.Userid,
	}
	tx, err := r.PlaylistsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return nil, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.PlaylistsRepo.Create(tx, up); err != nil {
		log.Printf("Error create playlist %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return nil, err
	}
	p, errrr := r.PlaylistsRepo.GetPlaylistsByUser(input.Userid)
	if errrr != nil {
		fmt.Printf("error 1")
		return nil, errrr
	}
	var pp *model.Playlist
	for _, pchild := range p {
		if pchild.Playlisttitle == input.Playlisttitle {
			pp = pchild
			break
		}
	}
	return pp, nil
}

func (r *mutationResolver) CreatePlaylistDetail(ctx context.Context, input model.PlaylistDetailInput) (*model.Playlistdetail, error) {
	//i,errr := r.playlistdet
	order := 1
	pds, err := r.Playlistdetailsrepo.GetPlaylistDetail(input.Playlistid)
	p,errrr := r.PlaylistsRepo.GetPlaylistByID(input.Playlistid)
	if errrr!=nil{
	  return nil, errrr
  }
	vid, errr := r.VideosRepo.GetVideoByID(input.Videoid)
	if errr!= nil {
	  return nil,errr
  }
	updInput := model.PlaylistUpdateInput{
    Playlistid:          input.Playlistid,
    Thumbnailsource:     &vid.Thumbnailsource,
    Userid: &p.Userid,
  }
	if pds != nil {
		r.DB.Model(&pds).QueryOne(pg.Scan(&order), `
    select max(videoorder) from ?TableName where playlistid = ?
`, input.Playlistid)
		order += 1
	} else {
	  _, errr := r.UpdatePlaylist(ctx, updInput)
	    if errr!=nil{
	      return nil,errr
      }

  }


	up := &model.Playlistdetail{
		Playlistid: input.Playlistid,
		Videoid:    input.Videoid,
		Viewcount:  0,
		Videoorder: order,
		Dateadded:  time.Now(),
	}
	tx, err := r.Playlistdetailsrepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi %v", err)
		return nil, errors.New("ERROR TRANSAKSI")
	}
	defer tx.Rollback()

	if _, err := r.Playlistdetailsrepo.Create(tx, up); err != nil {
		log.Printf("Error create playlistdetail %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit %v", err)
		return nil, err
	}
	return up, nil
}

func (r *mutationResolver) UpdatePlaylistDetail(ctx context.Context, input model.PlaylistDetailUpdate) (*model.Playlistdetail, error) {
	v, err := r.Playlistdetailsrepo.GetOnePlaylistDetail(input.Playlistid, input.Videoid)
	pds, errr := r.Playlistdetailsrepo.GetPlaylistDetail(input.Playlistid)
	p, errr := r.PlaylistsRepo.GetPlaylistByID(input.Playlistid)
	if err != nil {
		return nil, err
	}
	if errr != nil {
		return nil, errr
	}
  var temp string
	if input.View != nil && *input.View != false {
		v.Viewcount += 1
		r.Playlistdetailsrepo.Update(v)
		return v, nil
	}
	currOrder := v.Videoorder
	if input.Move != nil && *input.Move != "" {

		switch *input.Move {
		case "oneUp":
			for i := 0; i < len(pds); i++ {
				if pds[i].Videoorder <= currOrder-1 {
					pds[i].Videoorder = currOrder
					r.Playlistdetailsrepo.Update(pds[i])
					v.Videoorder = currOrder - 1
					r.Playlistdetailsrepo.Update(v)
					if v.Videoorder==1 {
					  vid, err := r.VideosRepo.GetVideoByID(v.Videoid)
					  if err!=nil{
					    return nil,err
            }
            temp = vid.Thumbnailsource
          }
				}
			}
			break
		case "oneDown":
			for i := 0; i < len(pds); i++ {
				if pds[i].Videoorder >= currOrder+1 {
					pds[i].Videoorder = currOrder
					r.Playlistdetailsrepo.Update(pds[i])
          if pds[i].Videoorder==1 {
            vid, err := r.VideosRepo.GetVideoByID(pds[i].Videoid)
            if err!=nil{
              return nil,err
            }
            temp = vid.Thumbnailsource
          }
					v.Videoorder = currOrder + 1
					r.Playlistdetailsrepo.Update(v)
				}
			}
			break
		case "up":

			for i := 0; i < len(pds); i++ {
				if pds[i].Videoorder < currOrder {
					pds[i].Videoorder += 1
					r.Playlistdetailsrepo.Update(pds[i])

				} else {
					continue
				}
			}
			v.Videoorder = 1
			r.Playlistdetailsrepo.Update(v)
      vid, err := r.VideosRepo.GetVideoByID(v.Videoid)
      if err!=nil{
        return nil,err
      }
      temp=vid.Thumbnailsource

			break
		case "down":
			for i := 0; i < len(pds); i++ {
				if pds[i].Videoorder > currOrder {
					pds[i].Videoorder -= 1
          r.Playlistdetailsrepo.Update(pds[i])
          if pds[i].Videoorder==1&&pds[i].Videoid!=v.Videoid {
            log.Printf("masuk pak eko")
           vidd, err := r.VideosRepo.GetVideoByID(pds[i].Videoid)
           if err!=nil{
             return nil,err
           }
           temp = vidd.Thumbnailsource
          }
				} else {
					continue
				}
			}

			v.Videoorder = len(pds)
			r.Playlistdetailsrepo.Update(v)

			break
		}
	}

	p.Updatedtime = time.Now()
	if temp!= ""{
    p.Thumbnailsource = temp
    log.Printf("masuk ifffff")
  }
	tx, err := r.PlaylistsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return nil, errors.New("ERROR TRANSAKSI Vid")
	}

	defer tx.Rollback()

	if _, err := r.PlaylistsRepo.Update(tx, p); err != nil {
		log.Printf("Error finishing upload vid %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit finishing vid %v", err)
		return nil, err
	}

	return v, nil
}

func (r *mutationResolver) UpdatePlaylist(ctx context.Context, input model.PlaylistUpdateInput) (*model.Playlist, error) {
	v, err := r.PlaylistsRepo.GetPlaylistByID(input.Playlistid)
	if err != nil {
		return nil, err
	}

	if input.Userid != nil && v.Userid != *input.Userid {
		return nil, errors.New("Only owner can edit Playlist")
	}
	tit := ""
	if input.Playlisttitle != nil && *input.Playlisttitle != "" {
		tit = *input.Playlisttitle
		v.Playlisttitle = tit
	}
	desc := ""
	if input.Playlistdescription != nil && *input.Playlistdescription != "" {
		desc = *input.Playlistdescription
		v.Playlistdescription = desc
	}
	src := ""
	if input.Thumbnailsource != nil && *input.Thumbnailsource != "" {
		src = *input.Thumbnailsource
		v.Thumbnailsource = src
	}
	priv := ""
	if input.Privacyid != nil && *input.Privacyid != "" {
		priv = *input.Privacyid
		v.Privacyid = priv
	}
	v.Updatedtime = time.Now()
	tx, err := r.PlaylistsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return nil, errors.New("ERROR TRANSAKSI Vid")
	}

	defer tx.Rollback()

	if _, err := r.PlaylistsRepo.Update(tx, v); err != nil {
		log.Printf("Error finishing upload vid %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit finishing vid %v", err)
		return nil, err
	}
	if v.Privacyid == "2" {

		ups, _ := r.Userplaylistrepo.GetForPlaylist(v.Playlistid)
		if ups != nil {
			for _, up := range ups {
				if up.Userid != *input.Userid {
					inp := model.AddPlaylistToUser{
						Userid:     up.Userid,
						Playlistid: up.Playlistid,
					}
					r.UserRemovePlaylist(ctx, inp)
				}
			}
		} else {
			return nil, errors.New("GAGAL HAPUS USER PLAYLIST")
		}
	}

	return v, nil
}

func (r *mutationResolver) UpdateVideo(ctx context.Context, input model.UpdateVideoInput) (bool, error) {
	v, err := r.VideosRepo.GetVideoByID(input.Videoid)
	if err != nil {
		return false, errors.New("Error getting video")
	}
	if v.Userid != input.Userid {
		return false, errors.New("Only owner can edit video")
	}
	tit := ""
	if input.Videotitle != nil && *input.Videotitle != "" {
		tit = *input.Videotitle
		v.Videotitle = tit
	}
	desc := ""
	if input.Videodescription != nil && *input.Videodescription != "" {
		desc = *input.Videodescription
		v.Videodescription = desc
	}
	src := ""
	if input.Thumbnailsource != nil && *input.Thumbnailsource != "" {
		src = *input.Thumbnailsource
		v.Thumbnailsource = src
	}
	priv := ""
	if input.Privacyid != nil && *input.Privacyid != "" {
		priv = *input.Privacyid
		v.Privacyid = priv
	}

	tx, err := r.VideosRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return false, errors.New("ERROR TRANSAKSI Vid")
	}

	defer tx.Rollback()

	if _, err := r.VideosRepo.UpdateVideo(tx, v); err != nil {
		log.Printf("Error finishing upload vid %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit finishing vid %v", err)
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) DeletePlaylistDetail(ctx context.Context, playlistid string, videoid *string) (bool, error) {
	if videoid != nil && *videoid != "" {
		pd, err := r.Playlistdetailsrepo.GetOnePlaylistDetail(playlistid, *videoid)
		if err != nil {
			return false, err
		}
		tx, err := r.Playlistdetailsrepo.DB.Begin()
		if err != nil {
			log.Printf("Error saat buat trannsaksi pds %v", err)
			return false, errors.New("ERROR TRANSAKSI pds")
		}

		defer tx.Rollback()

		if _, err := r.Playlistdetailsrepo.DeleteOne(tx, pd); err != nil {
			log.Printf("Error finishing delete pds %v", err)
			return false, err
		}

		if err := tx.Commit(); err != nil {
			log.Printf("Error commit delete pds %v", err)
			return false, err
		}
	} else {
		pds, err := r.Playlistdetailsrepo.GetPlaylistDetail(playlistid)
		if err != nil {
			return false, err
		}
		tx, err := r.Playlistdetailsrepo.DB.Begin()
		if err != nil {
			log.Printf("Error saat buat trannsaksi pds %v", err)
			return false, errors.New("ERROR TRANSAKSI pds")
		}

		defer tx.Rollback()
		var plid string
		for _, v := range pds {
			plid = v.Playlistid
		}
		if _, err := r.Playlistdetailsrepo.DeleteAll(tx, &pds, plid); err != nil {
			log.Printf("Error finishing delete pds %v", err)
			return false, err
		}

		if err := tx.Commit(); err != nil {
			log.Printf("Error commit delete pds %v", err)
			return false, err
		}
	}
	return true, nil
}

func (r *mutationResolver) DeleteVideo(ctx context.Context, videoid string) (bool, error) {
	v, err := r.VideosRepo.GetVideoByID(videoid)
	if err != nil {
		return false, errors.New("Error getting video")
	}

	tx, err := r.VideosRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return false, errors.New("ERROR TRANSAKSI Vid")
	}

	defer tx.Rollback()

	if _, err := r.VideosRepo.DeleteVideo(tx, v); err != nil {
		log.Printf("Error finishing upload vid %v", err)
		return false, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error commit finishing vid %v", err)
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) DeletePlaylist(ctx context.Context, input model.PlaylistUpdateInput) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) InsertComment(ctx context.Context, input model.CommentInput) (*model.Comment, error) {
	rcommentid := ""
  var comid int
	if input.Rootcommentid != nil && *input.Rootcommentid != "" {
		rcommentid = *input.Rootcommentid
	}

	pd := &model.Comment{
		Commentdetail: input.Commentdetail,
		Commenttime:   time.Now(),
		Userid:        input.Userid,
		Videoid:       input.Videoid,
		Rootcommentid: rcommentid,
	}

	txPD, err := r.CommentsRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Comment %v", err)
		return nil, errors.New("ERROR TRANSAKSI Comment")
	}

	defer txPD.Rollback()

	if _, err := r.CommentsRepo.CreateComment(txPD, pd); err != nil {
		log.Printf("Error creating comment %v", err)
		return nil, err
	}

	if err := txPD.Commit(); err != nil {
		log.Printf("Error commit comment %v", err)
		return nil, err
	}

	if pd!=nil{
    r.DB.Model(&pd).QueryOne(pg.Scan(&comid), `
    select max(commentid) from comments`)
  }

  str :=strconv.Itoa(comid)
  pd.Commentid = str
	return pd, nil
}

func (r *playlistResolver) Privacy(ctx context.Context, obj *model.Playlist) (*model.Privacy, error) {
	return r.PrivaciesRepo.GetPrivacyById(obj.Privacyid)
}

func (r *playlistResolver) Playlistdetails(ctx context.Context, obj *model.Playlist) ([]*model.Playlistdetail, error) {
	var dts []*model.Playlistdetail
	err := r.DB.Model(&dts).Where("playlistid = ?", obj.Playlistid).Select()
	if err != nil {
		return nil, err
	}
	return dts, nil
}

func (r *playlistResolver) User(ctx context.Context, obj *model.Playlist) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Userid)
}

func (r *playlistdetailResolver) Video(ctx context.Context, obj *model.Playlistdetail) (*model.Video, error) {
	return r.VideosRepo.GetVideoByID(obj.Videoid)
}

func (r *postResolver) User(ctx context.Context, obj *model.Post) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Userid)
}

func (r *postResolver) Reactions(ctx context.Context, obj *model.Post) ([]*model.Reaction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *premiumdetailResolver) Premiumtype(ctx context.Context, obj *model.Premiumdetail) (*model.Premiumtype, error) {
	return r.PremiumtypesRepo.GetPremiumByID(obj.Premiumid)
}

func (r *queryResolver) Relatedvideos(ctx context.Context, categoryid string, locationid string) ([]*model.Video, error) {
	var vids []*model.Video

	err := r.DB.Model(&vids).Where("categoryid = ?",categoryid).WhereOr("locationid = ?",locationid).Select()
	if err != nil {
	  return nil,err
  }
	return vids, nil
}

func (r *queryResolver) Playlistdetails(ctx context.Context, playlistid string) ([]*model.Playlistdetail, error) {
	var dts []*model.Playlistdetail
	err := r.DB.Model(&dts).Where("playlistid = ?", playlistid).Select()
	if err != nil {
		return nil, err
	}
	return dts, nil
}

func (r *queryResolver) Search(ctx context.Context, input model.SearchInput) (*model.SearchResult, error) {
	var vids []*model.Video
	var user []*model.User
	var users []*model.UserAndCount
	var ps []*model.Playlist
	var playlists []*model.PlaylistAndCount

	qvids := r.DB.Model(&vids)
	qplays := r.DB.Model(&ps)
	quser := r.DB.Model(&user)
	//  //q.Where("name ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Categoryid))
	//  q.Where("categoryid = ?",  *filter.Categoryid)
	if input.Premiumid == nil || *input.Premiumid == "1" {
		qvids.Where("typeid = 1")
	}
	if input.Date != nil && *input.Date != "" {
		switch *input.Date {
		case "week":
			qvids.Where("publishtime < ?", time.Now()).
				Where("publishtime > ?", time.Now().
					AddDate(0, 0, -7))
			qplays.Where("createdtime < ?", time.Now()).
				Where("createdtime > ?", time.Now().AddDate(0, 0, -7))
			quser.Where("joindate < ?", time.Now()).
				Where("joindate > ?", time.Now().AddDate(0, 0, -7))
			break
		case "month":
			qvids.Where("publishtime < ?", time.Now()).
				Where("publishtime > ?", time.Now().AddDate(0, -1, 0))
			qplays.Where("createdtime < ?", time.Now()).
				Where("createdtime > ?", time.Now().AddDate(0, -1, 0))
			quser.Where("joindate < ?", time.Now()).
				Where("joindate > ?", time.Now().AddDate(0, -1, 0))
			break
		case "year":
			qvids.Where("publishtime < ?", time.Now()).
				Where("publishtime > ?", time.Now().AddDate(-1, 0, 0))
			qplays.Where("createdtime < ?", time.Now()).
				Where("createdtime > ?", time.Now().AddDate(-1, 0, 0))
			quser.Where("joindate < ?", time.Now()).
				Where("joindate > ?", time.Now().AddDate(-1, 0, 0))
			break
		}
	}

	qvids.Where("videotitle ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword)).
		WhereOr("videodescription ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword))
	qplays.Where("playlisttitle ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword)).
		WhereOr("playlistdescription ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword))
	quser.Where("username ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword)).
		WhereOr("useremail ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword)).
		WhereOr("channeldetail ILIKE ?", fmt.Sprintf("%%%s%%", input.Keyword))
	if input.Premiumid == nil || *input.Premiumid == "1" {
		qvids.Where("typeid = 1")
	}
	if input.Item == nil || *input.Item == "" {
		err := qvids.Select()
		errr := qplays.Select()
		errrr := quser.Select()
		if err != nil {
			return nil, err
		}
		if errr != nil {
			return nil, err
		}
		if errrr != nil {
			return nil, errrr
		}
		for _, pp := range ps {
			var ppp model.Playlistdetail
			i, _ := r.DB.Model(&ppp).Where("playlistid = ?", pp.Playlistid).Count()
			p := &model.PlaylistAndCount{
				Playlists:  pp,
				Videocount: i,
			}
			playlists = append(playlists, p)
		}
		for _, u := range user {
			us, err := r.GetUserAndSubscriber(ctx, u.Userid)
			if err != nil {
				return nil, err
			}
			users = append(users, us)
		}
	}
	if input.Item != nil && *input.Item != "" {
		switch *input.Item {
		case "channel":
			err := quser.Select()
			if err != nil {
				return nil, err
			}
			for _, u := range user {
				us, err := r.GetUserAndSubscriber(ctx, u.Userid)
				if err != nil {
					return nil, err
				}
				users = append(users, us)
			}
			break
		case "playlist":
			err := qplays.Select()
			if err != nil {
				return nil, err
			}
			for _, pp := range ps {
				var ppp model.Playlistdetail
				i, _ := r.DB.Model(&ppp).Where("playlistid = ?", pp.Playlistid).Count()
				p := &model.PlaylistAndCount{
					Playlists:  pp,
					Videocount: i,
				}
				playlists = append(playlists, p)
			}
			break
		case "video":
			err := qvids.Select()
			if err != nil {
				return nil, err
			}
			break
		}
	}

	return &model.SearchResult{
		Videos:    vids,
		Channels:  users,
		Playlists: playlists,
	}, nil
}

func (r *queryResolver) Restrictions(ctx context.Context) ([]*model.Restriction, error) {
	var restrictions []*model.Restriction

	err := r.DB.Model(&restrictions).Select()
	fmt.Println(err)
	if err != nil {

		return nil, errors.New("Failed to query")
	}

	return restrictions, nil
}

func (r *queryResolver) Privacies(ctx context.Context) ([]*model.Privacy, error) {
	var privacies []*model.Privacy

	err := r.DB.Model(&privacies).Select()
	fmt.Println(err)
	if err != nil {

		return nil, errors.New("Failed to query")
	}

	return privacies, nil
}

func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	var categories []*model.Category

	err := r.DB.Model(&categories).Select()
	fmt.Println(err)
	if err != nil {

		return nil, errors.New("Failed to query")
	}

	return categories, nil
}

func (r *queryResolver) Videotypes(ctx context.Context) ([]*model.Videotype, error) {
	var types []*model.Videotype

	err := r.DB.Model(&types).Select()
	fmt.Println(err)
	if err != nil {

		return nil, errors.New("Failed to query")
	}

	return types, nil
}

func (r *queryResolver) Premiumtypes(ctx context.Context) ([]*model.Premiumtype, error) {
	var premiums []*model.Premiumtype
	err := r.DB.Model(&premiums).Select()
	fmt.Println(err)
	if err != nil {

		return nil, errors.New("Failed to query")
	}
	return premiums, nil
}

func (r *queryResolver) Locations(ctx context.Context) ([]*model.Location, error) {
	return r.LocationsRepo.GetAllLocation()
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	return r.UsersRepo.GetAllUsers()
}

func (r *queryResolver) User(ctx context.Context, userid string) (*model.User, error) {
	u, err := r.UsersRepo.GetUserByEmail(userid)
	if err != nil {
		return nil, errors.New("User doesn't exist")
	}

	return u, nil
}

func (r *queryResolver) Location(ctx context.Context, name string) (*model.Location, error) {
	return r.LocationsRepo.GetLocationByName(name)
}

func (r *queryResolver) Homevideos(ctx context.Context, filter *model.VideoFilter) ([]*model.Video, error) {
	return r.VideosRepo.GetAllHomeVideos(filter)
}

func (r *queryResolver) Categoryvideos(ctx context.Context, filter *model.VideoFilter) (*model.CategoryQuery, error) {
	return r.VideosRepo.GetAllCategoryVideos(filter)
}

func (r *queryResolver) Showvideo(ctx context.Context, input model.ShowVideoInput) (*model.Video, error) {
	v, err := r.VideosRepo.GetVideoByID(input.Videoid)
	if err != nil {
		return nil, errors.New("Error getting video!")
	}
	typ, err := r.PremiumdetailsRepo.GetCurrentPremiumdetailByUser(input.Userid)
	if v.Typeid == "2" {
		if typ.Premiumid != "2" {
			return nil, errors.New("Only Premium Member can access this video!")
		}
	}

	return v, nil
}

func (r *queryResolver) GetUserAndSubscriber(ctx context.Context, userid string) (*model.UserAndCount, error) {
	u, err := r.UsersRepo.GetUserByID(userid)
	if err != nil {
		return nil, err
	}
	count, counterr := r.SubscriptionsRepo.CountSubs(userid)
	vc, vcerr := r.VideosRepo.GetViewOfUser(userid)
	i, viderr := r.VideosRepo.CountVideosOfUser(userid)
	if vcerr != nil {
		return nil, vcerr
	}
	if counterr != nil {
		return nil, counterr
	}
	if viderr != nil {
		return nil, viderr
	}

	return &model.UserAndCount{
		User:       u,
		Count:      count,
		Vcount:     vc,
		VideoCount: &i,
	}, nil
}

func (r *queryResolver) CheckSubscribe(ctx context.Context, input model.SubscribeInput) (*model.Usersubscription, error) {
	return r.SubscriptionsRepo.FindOne(input.Userid, input.Channelid)
}

func (r *queryResolver) Video(ctx context.Context, userid string) ([]*model.Video, error) {
	return r.VideosRepo.GetVideosByUser(userid)
}

func (r *queryResolver) OneVideo(ctx context.Context, videoid string) (*model.Video, error) {
	return r.VideosRepo.GetVideoByID(videoid)
}

func (r *queryResolver) ChannelHomeQuery(ctx context.Context, filter *model.VideoFilter) (*model.ChannelHome, error) {
	return r.VideosRepo.GetChannelVideos(filter)
}

func (r *queryResolver) ChannelVideoQuery(ctx context.Context, filter *model.VideoFilter) ([]*model.Video, error) {
	return r.VideosRepo.GetAllCategoryVideosPage(filter)
}

func (r *queryResolver) ChannelPlaylistQuery(ctx context.Context, filter *model.PlaylistFilter) ([]*model.Playlist, error) {
	return r.PlaylistsRepo.GetAllPlaylistChannel(filter)
}

func (r *queryResolver) Posts(ctx context.Context, filter model.ReactionFilter) (*model.CountedPost, error) {
	posts, err := r.PostsRepo.GetPostsByUser(*filter.Userid)
	if err != nil {
		return nil, err
	}

	var like []int
	var dislike []int

	for i := 0; i < len(posts); i++ {

		l, errr := r.ReactionsRepo.CountLike(nil, nil, &posts[i].Postid)
		if errr != nil {
			return nil, errors.New("ERROR 1")
		}
		like = append(like, l)

		d, errrr := r.ReactionsRepo.CountDislike(nil, nil, &posts[i].Postid)
		if errrr != nil {
			return nil, errors.New("ERROR 2")
		}
		dislike = append(dislike, d)
	}

	return &model.CountedPost{
		Post:    posts,
		Like:    like,
		Dislike: dislike,
	}, nil
}

func (r *queryResolver) CheckLike(ctx context.Context, input model.ReactionFilter) (bool, error) {
	_, err := r.ReactionsRepo.FindOne(&input, "1")
	if err != nil {
		return false, nil
	}
	return true, nil
}

func (r *queryResolver) CheckDisike(ctx context.Context, input model.ReactionFilter) (bool, error) {
	_, err := r.ReactionsRepo.FindOne(&input, "2")
	if err != nil {
		return false, nil
	}
	return true, nil
}

func (r *queryResolver) GetUserSubscribedto(ctx context.Context, userid string) ([]*model.Usersubscription, error) {
	return r.SubscriptionsRepo.GetForUser(userid)
}

func (r *queryResolver) GetUserSubscribedtoID(ctx context.Context, userid string) ([]string, error) {
	var usersid []string
	s, err := r.SubscriptionsRepo.GetForUser(userid)
	if err != nil {
		return nil, err
	}
	for _, ss := range s {
		usersid = append(usersid, ss.Channelid)
	}

	return usersid, nil
}

func (r *queryResolver) GetUserPlaylist(ctx context.Context, userid string) ([]*model.Playlist, error) {
	return r.PlaylistsRepo.GetPlaylistsByUser(userid)
}

func (r *queryResolver) GetFullVideoInfo(ctx context.Context, videoid string, userid *string) (*model.FullVideoInfo, error) {
	//if(userid)
	//var p *model.Premiumdetail
	if userid != nil && *userid != "" {
		var errr error
		_, errr = r.PremiumdetailsRepo.GetCurrentPremiumdetailByUser(*userid)
		if errr != nil {
			return nil, errr
		}
	}
	v, err := r.VideosRepo.GetVideoByID(videoid)
	if err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}
	//if v.Typeid == "2" {
	//	if p == nil || p.Premiumid == "1" {
	//		return nil, errors.New("Please become a premium member to see this video")
	//	}
	//}

	fullU, err := r.GetUserAndSubscriber(ctx, v.Userid)

	c, err := r.CommentsRepo.GetCommentsByVideo(videoid)
	var like []int
	var dislike []int
	var reps []int
	for i := 0; i < len(c); i++ {

		l, errr := r.ReactionsRepo.CountLike(nil, &c[i].Commentid, nil)
		if errr != nil {
			return nil, errors.New("ERROR 1")
		}
		like = append(like, l)

		d, errrr := r.ReactionsRepo.CountDislike(nil, &c[i].Commentid, nil)
		if errrr != nil {
			return nil, errors.New("ERROR 2")
		}
		dislike = append(dislike, d)

		r, errrrr := r.CommentsRepo.CountReply(c[i].Commentid)
		if errrrr != nil {
			return nil, errors.New("ERROR 2")
		}
		reps = append(reps, r)
	}

	l, err := r.ReactionsRepo.CountLike(&videoid, nil, nil)
	d, err := r.ReactionsRepo.CountDislike(&videoid, nil, nil)

	fullC := &model.CommentWithCount{
		Comment: c,
		Like:    like,
		Dislike: dislike,
		Reply:   reps,
	}

	return &model.FullVideoInfo{
		Video:       v,
		Like:        l,
		Dislike:     d,
		FullUser:    fullU,
		FullComment: fullC,
	}, nil
}

func (r *queryResolver) GetSubscribedVideo(ctx context.Context, channelid []string) (*model.SubscribedVideo, error) {
	return r.VideosRepo.GetAllSubscribedVideos(channelid)
}

func (r *queryResolver) GetQueueInfo(ctx context.Context, videoid []string) ([]*model.Video, error) {
	var vids []*model.Video

	for _, vid := range videoid {
		v, err := r.VideosRepo.GetVideoByID(vid)
		if err != nil {
			return nil, err
		}
		vids = append(vids, v)
	}
	return vids, nil
}

func (r *queryResolver) Playlist(ctx context.Context, playlistid string) (*model.PlaylistFullInfo, error) {
	ps, err := r.PlaylistsRepo.GetPlaylistByID(playlistid)
	if err != nil {
		return nil, err
	}
	var dts []*model.Playlistdetail
	i, _ := r.DB.Model(&dts).Where("playlistid = ? ", playlistid).Count()

	pc := &model.PlaylistAndCount{
		Playlists:  ps,
		Videocount: i,
	}

	u, errr := r.GetUserAndSubscriber(ctx, ps.Userid)
	if errr != nil {
		return nil, errr
	}
	return &model.PlaylistFullInfo{
		Playlist: pc,
		User:     u,
	}, nil
}

func (r *queryResolver) GetUserSavedPlaylist(ctx context.Context, userid string, playlistid *string) ([]*model.Userplaylist, error) {
	if playlistid == nil || *playlistid == "" {
		return r.Userplaylistrepo.GetForUser(userid)
	} else if playlistid != nil && *playlistid != "" {
		return r.Userplaylistrepo.GetForPlaylist(*playlistid)
	} else {
		return nil, nil
	}
}

func (r *reactionResolver) User(ctx context.Context, obj *model.Reaction) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *reactionResolver) Post(ctx context.Context, obj *model.Reaction) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *reactionResolver) Comment(ctx context.Context, obj *model.Reaction) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *reactionResolver) Video(ctx context.Context, obj *model.Reaction) (*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *reactionResolver) Reactiontype(ctx context.Context, obj *model.Reaction) (*model.Reactiontype, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *reactiontypeResolver) Reactions(ctx context.Context, obj *model.Reactiontype) ([]*model.Reaction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *restrictionResolver) Videos(ctx context.Context, obj *model.Restriction) ([]*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) Restriction(ctx context.Context, obj *model.User) (*model.Restriction, error) {
	return r.RestrictionsRepo.GetRestrictionById(obj.Restrictionid)
}

func (r *userResolver) Location(ctx context.Context, obj *model.User) (*model.Location, error) {
	return r.LocationsRepo.GetLocationById(obj.Locationid)
}

func (r *userResolver) Videos(ctx context.Context, obj *model.User) ([]*model.Video, error) {
	return r.VideosRepo.GetVideosByUser(obj.Userid)
}

func (r *userResolver) Premiumdetails(ctx context.Context, obj *model.User) ([]*model.Premiumdetail, error) {
	return r.PremiumdetailsRepo.GetPremiumdetailsByUser(obj.Userid)
}

func (r *userResolver) Playlists(ctx context.Context, obj *model.User) ([]*model.Playlist, error) {
	return r.PlaylistsRepo.GetPlaylistsByUser(obj.Userid)
}

func (r *userResolver) Posts(ctx context.Context, obj *model.User) ([]*model.Post, error) {
	return r.PostsRepo.GetPostsByUser(obj.Userid)
}

func (r *userResolver) Comments(ctx context.Context, obj *model.User) ([]*model.Comment, error) {
	return r.CommentsRepo.GetCommentsByUser(obj.Userid)
}

func (r *userResolver) Premiumdetail(ctx context.Context, obj *model.User) (*model.Premiumdetail, error) {
	p, err := r.PremiumdetailsRepo.GetCurrentPremiumdetailByUser(obj.Userid)

	if err == nil {
		return p, nil
	} else {

		pd := &model.Premiumdetail{
			Userid:    obj.Userid,
			Premiumid: "1",
			Startdate: time.Now(),
			Enddate:   time.Now().AddDate(10, 0, 0),
		}

		txPD, err := r.PremiumdetailsRepo.DB.Begin()
		if err != nil {
			log.Printf("Error saat buat trannsaksi PD %v", err)
			return nil, errors.New("ERROR TRANSAKSI PD")
		}

		defer txPD.Rollback()

		if _, err := r.PremiumdetailsRepo.CreateDetail(txPD, pd); err != nil {
			log.Printf("Error creating premium detail %v", err)
			return nil, err
		}

		if err := txPD.Commit(); err != nil {
			log.Printf("Error commit PD %v", err)
			return nil, err
		}

		return pd, nil
	}
}

func (r *userplaylistResolver) User(ctx context.Context, obj *model.Userplaylist) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Userid)
}

func (r *userplaylistResolver) Playlist(ctx context.Context, obj *model.Userplaylist) (*model.Playlist, error) {
	return r.PlaylistsRepo.GetPlaylistByID(obj.Playlistid)
}

func (r *usersubscriptionResolver) User(ctx context.Context, obj *model.Usersubscription) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Userid)
}

func (r *usersubscriptionResolver) Channel(ctx context.Context, obj *model.Usersubscription) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Channelid)
}

func (r *videoResolver) User(ctx context.Context, obj *model.Video) (*model.User, error) {
	return r.UsersRepo.GetUserByID(obj.Userid)
}

func (r *videoResolver) Videotype(ctx context.Context, obj *model.Video) (*model.Videotype, error) {
	return r.VideotypesRepo.GetTypeById(obj.Typeid)
}

func (r *videoResolver) Videocondition(ctx context.Context, obj *model.Video) (*model.Videocondition, error) {
	return r.VideoconditionsRepo.GetConditionById(obj.Videoconditionid)
}

func (r *videoResolver) Location(ctx context.Context, obj *model.Video) (*model.Location, error) {
	return r.LocationsRepo.GetLocationById(obj.Locationid)
}

func (r *videoResolver) Restriction(ctx context.Context, obj *model.Video) (*model.Restriction, error) {
	return r.RestrictionsRepo.GetRestrictionById(obj.Restrictionid)
}

func (r *videoResolver) Category(ctx context.Context, obj *model.Video) (*model.Category, error) {
	return r.CategoriesRepo.GetCategoryById(obj.Categoryid)
}

func (r *videoResolver) Privacy(ctx context.Context, obj *model.Video) (*model.Privacy, error) {
	return r.PrivaciesRepo.GetPrivacyById(obj.Privacyid)
}

func (r *videoResolver) Comments(ctx context.Context, obj *model.Video) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Reactions(ctx context.Context, obj *model.Video) ([]*model.Reaction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Playlistdetails(ctx context.Context, obj *model.Video) ([]*model.Playlistdetail, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoconditionResolver) Videos(ctx context.Context, obj *model.Videocondition) ([]*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videotypeResolver) Videos(ctx context.Context, obj *model.Videotype) ([]*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

// Category returns generated.CategoryResolver implementation.
func (r *Resolver) Category() generated.CategoryResolver { return &categoryResolver{r} }

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// Location returns generated.LocationResolver implementation.
func (r *Resolver) Location() generated.LocationResolver { return &locationResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Playlist returns generated.PlaylistResolver implementation.
func (r *Resolver) Playlist() generated.PlaylistResolver { return &playlistResolver{r} }

// Playlistdetail returns generated.PlaylistdetailResolver implementation.
func (r *Resolver) Playlistdetail() generated.PlaylistdetailResolver {
	return &playlistdetailResolver{r}
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

// Premiumdetail returns generated.PremiumdetailResolver implementation.
func (r *Resolver) Premiumdetail() generated.PremiumdetailResolver { return &premiumdetailResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Reaction returns generated.ReactionResolver implementation.
func (r *Resolver) Reaction() generated.ReactionResolver { return &reactionResolver{r} }

// Reactiontype returns generated.ReactiontypeResolver implementation.
func (r *Resolver) Reactiontype() generated.ReactiontypeResolver { return &reactiontypeResolver{r} }

// Restriction returns generated.RestrictionResolver implementation.
func (r *Resolver) Restriction() generated.RestrictionResolver { return &restrictionResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

// Userplaylist returns generated.UserplaylistResolver implementation.
func (r *Resolver) Userplaylist() generated.UserplaylistResolver { return &userplaylistResolver{r} }

// Usersubscription returns generated.UsersubscriptionResolver implementation.
func (r *Resolver) Usersubscription() generated.UsersubscriptionResolver {
	return &usersubscriptionResolver{r}
}

// Video returns generated.VideoResolver implementation.
func (r *Resolver) Video() generated.VideoResolver { return &videoResolver{r} }

// Videocondition returns generated.VideoconditionResolver implementation.
func (r *Resolver) Videocondition() generated.VideoconditionResolver {
	return &videoconditionResolver{r}
}

// Videotype returns generated.VideotypeResolver implementation.
func (r *Resolver) Videotype() generated.VideotypeResolver { return &videotypeResolver{r} }

type categoryResolver struct{ *Resolver }
type commentResolver struct{ *Resolver }
type locationResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type playlistResolver struct{ *Resolver }
type playlistdetailResolver struct{ *Resolver }
type postResolver struct{ *Resolver }
type premiumdetailResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type reactionResolver struct{ *Resolver }
type reactiontypeResolver struct{ *Resolver }
type restrictionResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type userplaylistResolver struct{ *Resolver }
type usersubscriptionResolver struct{ *Resolver }
type videoResolver struct{ *Resolver }
type videoconditionResolver struct{ *Resolver }
type videotypeResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) Comment(ctx context.Context, input model.CommentInput) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *postResolver) Posttitle(ctx context.Context, obj *model.Post) (string, error) {
	panic(fmt.Errorf("not implemented"))
}
