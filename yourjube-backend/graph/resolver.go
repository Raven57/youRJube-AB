package graph

import (
  "github.com/Raven57/yourjube-back-end/graph/postgres"
  "github.com/go-pg/pg/v10"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
  DB *pg.DB
  UsersRepo   postgres.UsersRepo
  PremiumtypesRepo postgres.PremiumtypesRepo
}
