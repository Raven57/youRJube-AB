package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/Raven57/yourjube-back-end/graph/generated"
	"github.com/Raven57/yourjube-back-end/graph/model"
)

func (r *categoryResolver) Videos(ctx context.Context, obj *model.Category) ([]*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *commentResolver) User(ctx context.Context, obj *model.Comment) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *commentResolver) Video(ctx context.Context, obj *model.Comment) (*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
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

func (r *mutationResolver) UploadVideo(ctx context.Context, input model.UploadVideoInput) (*model.Video, error) {
	tx, err := r.VideosRepo.DB.Begin()
	if err != nil {
		log.Printf("Error saat buat trannsaksi Vid %v", err)
		return nil, errors.New("ERROR TRANSAKSI Vid")
	}

	min := time.Duration(input.PublishAfterMinute)

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

	return vid, nil
}

func (r *mutationResolver) FinishUpload(ctx context.Context, input model.FinishUplodVideoInput) (*model.Video, error) {
	v, err := r.VideosRepo.GetVideoByUserAndTitle(input.Videoname, input.Userid)
	if err != nil {
		return nil, errors.New("Error getting video")
	}
	v.Videosource = input.Videosource
	v.Thumbnailsource = input.Thumbnailsource
	v.Viewcount = 0
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

func (r *mutationResolver) UserGoogleLogin(ctx context.Context, useremail string) (*model.AuthResponse, error) {
	panic(fmt.Errorf("not implemented"))
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

func (r *playlistResolver) Privacy(ctx context.Context, obj *model.Playlist) (*model.Privacy, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *playlistResolver) Playlistdetails(ctx context.Context, obj *model.Playlist) ([]*model.Playlistdetail, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *playlistResolver) User(ctx context.Context, obj *model.Playlist) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *playlistdetailResolver) Video(ctx context.Context, obj *model.Playlistdetail) (*model.Video, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *postResolver) User(ctx context.Context, obj *model.Post) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *postResolver) Reactions(ctx context.Context, obj *model.Post) ([]*model.Reaction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *premiumdetailResolver) Premiumtype(ctx context.Context, obj *model.Premiumdetail) (*model.Premiumtype, error) {
	return r.PremiumtypesRepo.GetPremiumByID(obj.Premiumid)
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

func (r *subscriptionResolver) Userid(ctx context.Context) (<-chan string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) Channelid(ctx context.Context) (<-chan string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) Notification(ctx context.Context) (<-chan bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) User(ctx context.Context) (<-chan *model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) Channel(ctx context.Context) (<-chan *model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) Restriction(ctx context.Context, obj *model.User) (*model.Restriction, error) {
	return r.RestrictionsRepo.GetRestrictionById(obj.Restrictionid)
}

func (r *userResolver) Location(ctx context.Context, obj *model.User) (*model.Location, error) {
	return r.LocationsRepo.GetLocationById(obj.Locationid)
}

func (r *userResolver) Videos(ctx context.Context, obj *model.User) ([]*model.Video, error) {
	//panic(fmt.Errorf("not implemented"))
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
	return r.PremiumdetailsRepo.GetCurrentPremiumdetailByUser(obj.Userid)
}

func (r *videoResolver) Videotype(ctx context.Context, obj *model.Video) (*model.Videotype, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Videocondition(ctx context.Context, obj *model.Video) (*model.Videocondition, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Location(ctx context.Context, obj *model.Video) (*model.Location, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Restriction(ctx context.Context, obj *model.Video) (*model.Restriction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Category(ctx context.Context, obj *model.Video) (*model.Category, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *videoResolver) Privacy(ctx context.Context, obj *model.Video) (*model.Privacy, error) {
	panic(fmt.Errorf("not implemented"))
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

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

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
type subscriptionResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type videoResolver struct{ *Resolver }
type videoconditionResolver struct{ *Resolver }
type videotypeResolver struct{ *Resolver }
