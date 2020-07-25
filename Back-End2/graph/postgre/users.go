package postgre

import (
	"github.com/Raven57/yourjube-backend/graph/model"
  "fmt"
  "github.com/go-pg/pg/v10"
)

type UsersRepo struct {
	DB *pg.DB
}

func (u *UsersRepo) GetUserByID(id string) (*model.User, error) {
	var user model.User
	err := u.DB.Model(&user).Where("userid = ?", id).Select()
	if err != nil {
		return nil, err
	}

	return &user, nil
}
func (u *UsersRepo) GetAllUsers() ([]*model.User, error) {
	var users []*model.User
	err := u.DB.Model(&users).Select()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UsersRepo) GetUserByEmail(email string) (*model.User, error) {
  var user model.User
  fmt.Println("Masuk GET USER")
  err := u.DB.Model(&user).Where("useremail= ?", email).Select()
  fmt.Println("Habis search")

  if err != nil {
    fmt.Println(err)
    fmt.Println("ERROR")
    return nil, err
  }
  fmt.Println("lancar jaya")

  return &user, nil
}


