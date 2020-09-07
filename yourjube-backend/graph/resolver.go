package graph

import (
  "github.com/Raven57/yourjube-back-end/graph/postgres"
  "github.com/go-pg/pg/v10"
  "github.com/go-redis/redis/v8"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
  DB *pg.DB
  RDB *redis.Client
  UsersRepo   postgres.UsersRepo
  PremiumtypesRepo postgres.PremiumtypesRepo
  VideosRepo postgres.VideosRepo
  RestrictionsRepo postgres.RestrictionsRepo
  PremiumdetailsRepo postgres.PremiumdetailsRepo
  PostsRepo postgres.PostsRepo
  PlaylistsRepo postgres.PlaylistsRepo
  LocationsRepo postgres.LocationsRepo
  CommentsRepo postgres.CommentsRepo
  PrivaciesRepo postgres.PrivaciesRepo
  CategoriesRepo postgres.CategoriesRepo
  VideoconditionsRepo postgres.VideoconditionsRepo
  VideotypesRepo postgres.VideotypesRepo
  SubscriptionsRepo postgres.SubscriptionsRepo
  ReactionsRepo postgres.ReactionsRepo
  ReactiontypesRepo postgres.ReactiontypesRepo
  Userplaylistrepo postgres.Userplaylistrepo
  Playlistdetailsrepo postgres.Playlistdetailsrepo
}
