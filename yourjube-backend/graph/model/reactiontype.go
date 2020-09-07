package model

type Reactiontype struct {
  Reactiontypeid   string      `json:"reactiontypeid"`
  Reactiontypename string      `json:"reactiontypename"`
  Reactions        []*Reaction `json:"reactions"`
}
