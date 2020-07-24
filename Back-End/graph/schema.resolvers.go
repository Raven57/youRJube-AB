package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"GoGraphQL/graph/generated"
	"GoGraphQL/graph/model"
	"context"
	"errors"
	"fmt"
	"time"
)

func (r *mutationResolver) CreateLocation(ctx context.Context, input model.NewLocation) (*model.Location, error) {
  var user model.Location

  err := r.DB.Model(&user).Where("locationname = ?",input.Locationname).Select()

  if err == nil{
    return nil,errors.New("location existed")
  }

  computer := model.Location{
    Locationname: input.Locationname,
  }

  _, err = r.DB.Model(&computer).Insert()

    if err != nil {
      return nil, errors.New("error nil")
    }


  return &computer, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	var user *model.User

	fmt.Println("Error1")
	user, _ = r.UsersRepo.GetUserByEmail(input.Useremail)
	fmt.Println("Error2")

	computer := model.User{
		Useremail:      input.Useremail,
		Username:       input.Username,
		Joindate:       time.Now(),
		Channeldetail:  "This is your channel detail",
		Channelurl:     "google.com",
		Bgimgaddr:      "https://firebasestorage.googleapis.com/v0/b/tpa-webab.appspot.com/o/test%2F1595244440213_website19-1024x512.jpg?alt=media&token=3e1ca34a-d665-4b5c-aa3f-7b32fca186e4",
		Premiumstart:   time.Now(),
		Premiumend:     time.Now().AddDate(1, 0, 0),
		Profileimgaddr: input.Profileimgaddr,
		Premiumid:      "1",
	}

	if user != nil {
		return nil, errors.New("user existed")
	} else {
		_, err := r.DB.Model(&computer).Insert()

		if err != nil {
			return nil, errors.New("error nil")
		}
	}

	return &computer, nil
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

func (r *queryResolver) Tags(ctx context.Context) ([]*model.Tag, error) {
	var tags []*model.Tag

	err := r.DB.Model(&tags).Select()
	fmt.Println(err)
	if err != nil {

		return nil, errors.New("Failed to query")
	}

	return tags, nil
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

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	return r.UsersRepo.GetAllUsers()
}

func (r *queryResolver) Locations(ctx context.Context) ([]*model.Location, error) {
  var premiums []*model.Location
  err := r.DB.Model(&premiums).Select()
  fmt.Println(err)
  if err != nil {

    return nil, errors.New("Failed to query")
  }
  return premiums, nil
}

func (r *queryResolver) User(ctx context.Context, userid string) (*model.User, error) {
  return r.UsersRepo.GetUserByID(userid)
}

func (r *userResolver) Premiumtype(ctx context.Context, obj *model.User) (*model.Premiumtype, error) {
	return r.PremiumtypesRepo.GetPremiumByID(obj.Premiumid)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
