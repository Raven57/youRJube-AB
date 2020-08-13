package postgres

import (
  "fmt"
  "github.com/Raven57/yourjube-back-end/graph/model"
  "github.com/go-pg/pg/v10"
)

type CategoriesRepo struct{
  DB * pg.DB
}

func (l *CategoriesRepo) GetCategoryByField (field, value string) (*model.Category, error){
  var loc model.Category
  err := l.DB.Model(&loc).Where(fmt.Sprintf("%v = ?",field),value).Select()
  return &loc,err
}

func (l *CategoriesRepo) GetAllCategory() ([]*model.Category, error){
  var loc []*model.Category
  err := l.DB.Model(&loc).Select()
  return loc,err
}

func (l *CategoriesRepo) GetCategoryById(id string) (*model.Category, error) {
  return l.GetCategoryByField("categoryid",id)
}
