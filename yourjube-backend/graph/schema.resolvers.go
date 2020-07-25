package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/Raven57/yourjube-back-end/graph/generated"
	"github.com/Raven57/yourjube-back-end/graph/model"
)

func (r *mutationResolver) CreateLocation(ctx context.Context, input model.NewLocation) (*model.Location, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UserLogin(ctx context.Context, input model.Login) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) RefreshToken(ctx context.Context, input model.RefreshTokenInput) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Restrictions(ctx context.Context) ([]*model.Restriction, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Privacies(ctx context.Context) ([]*model.Privacy, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Videotypes(ctx context.Context) ([]*model.Videotype, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Premiumtypes(ctx context.Context) ([]*model.Premiumtype, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Locations(ctx context.Context) ([]*model.Location, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	return r.UsersRepo.GetAllUsers()
}

func (r *queryResolver) User(ctx context.Context, userid string) (*model.User, error) {
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

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
