package postgres


import (
  "github.com/Raven57/yourjube-back-end/graph/model"
  _"github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
)

type PremiumtypesRepo struct {
  DB *pg.DB
}

func (u *PremiumtypesRepo) GetPremiumByID(id string) (*model.Premiumtype, error) {
	var user model.Premiumtype
	err := u.DB.Model(&user).Where("premiumid = ?", id).Select()
	if err != nil {
		return nil, err
	}
	return &user, nil
}
func (u *PremiumtypesRepo) GetAllPremiums() ([]*model.Premiumtype, error) {
	var users []*model.Premiumtype
	err := u.DB.Model(&users).Select()
	if err != nil {
		return nil, err
	}

	return users, nil
}

