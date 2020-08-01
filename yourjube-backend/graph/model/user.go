package model

import (
  "github.com/dgrijalva/jwt-go"
  "golang.org/x/crypto/bcrypt"
  "os"
  "time"
)

type User struct {
  Userid          string    `json:"userid"`
  Useremail       string    `json:"useremail"`
  Username        string    `json:"username"`
  Joindate        time.Time `json:"joindate"`
  Channeldetail   string    `json:"channeldetail"`
  Channelurl      string    `json:"channelurl"`
  Bgimgaddr       string    `json:"bgimgaddr"`
  Profileimgaddr  string    `json:"profileimgaddr"`
  Locationid      string    `json:"locationid"`
  Password        string    `json:"password"`
  Age             int       `json:"age"`
  Restrictionid   string    `json:"restrictionid"`
  //Restriction    *Restriction     `json:"restriction"`
  //Location       *Location        `json:"location"`
  //Videos         []*Video         `json:"videos"`
  //Premiumdetails []*Premiumdetail `json:"premiumdetails"`
  //Playlists      []*Playlist      `json:"playlists"`
  //Posts          []*Post          `json:"posts"`
  //Comments       []*Comment       `json:"comments"`
}

func (u *User) HashPassword(password string) error {
  bytePassword := []byte(password)
  passwordHash, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
  if err != nil {
    return err
  }

  u.Password = string(passwordHash)

  return nil
}

func(u *User) ComparePassword (password string) error{
  bytepass := []byte(password)
  byteHashed := []byte(u.Password)
  return bcrypt.CompareHashAndPassword(byteHashed,bytepass)
}

func (u *User) GenToken() (*AuthToken, error) {
  expiredAt := time.Now().Add(time.Hour * 24 * 7) // a week

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
    ExpiresAt: expiredAt.Unix(),
    Id:        u.Userid,
    IssuedAt:  time.Now().Unix(),
    Issuer:    "yourjube",
  })

  accessToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
  if err != nil {
    return nil, err
  }

  return &AuthToken{
    AccessToken: accessToken,
    ExpiredAt:   expiredAt,
  }, nil
}
