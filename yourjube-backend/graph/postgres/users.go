package postgres

import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  "fmt"
  "github.com/go-pg/pg/v10"
)

type UsersRepo struct {
  DB *pg.DB
}

func (u *UsersRepo) GetUserByField (field, value string) (*model.User, error){
  var user model.User
  err := u.DB.Model(&user).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return &user,err
}

func (u *UsersRepo) GetUserByID(id string) (*model.User, error) {
  return u.GetUserByField("userid",id)
}
//func (u *UsersRepo) GetUserByIDAndCount(id string) (*model.UserAndCount, error) {
//  var user model.User
//
//  err := u.DB.Model(&user).Where("userid = ?",id).Select()
//
//  //var subs []*model.Subs
//  //count, err := u.DB.Model()
//  uac:=model.UserAndCount{
//    User:  &user,
//    Count: 123,
//  }
//  return &uac,err
//}

func (u *UsersRepo) GetAllUsers() ([]*model.User, error) {
  var users []*model.User
  err := u.DB.Model(&users).Select()
  if err != nil {
    return nil, err
  }

  return users, nil
}

func (u *UsersRepo) GetUserByEmail(email string) (*model.User, error) {
  return u.GetUserByField("Useremail",email)
}

func (u *UsersRepo) CreateUser (tx *pg.Tx, user *model.User) (*model.User,error){
  _,err := tx.Model(user).Returning("NULL").Insert()
  return user, err
}

func (u *UsersRepo) Update (tx *pg.Tx, user *model.User) (*model.User,error){
  _,err := tx.Model(user).Where("useremail = ?",user.Useremail).Update()
  return user, err
}


