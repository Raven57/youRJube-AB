package model

type Reaction struct {
  Userid         string        `json:"userid"`
  Postid         string        `json:"postid"`
  Commentid      string        `json:"commentid"`
  Videoid        string        `json:"videoid"`
  Reactiontypeid string        `json:"reactiontypeid"`
  //User           *User         `json:"user"`
  //Post           *Post         `json:"post"`
  //Comment        *Comment      `json:"comment"`
  //Video          *Video        `json:"video"`
  //Reactiontype   *Reactiontype `json:"reactiontype"`
}
