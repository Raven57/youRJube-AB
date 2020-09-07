// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type AddPlaylistToUser struct {
	Userid     string `json:"userid"`
	Playlistid string `json:"playlistid"`
}

type AddReactionInput struct {
	Userid         string  `json:"userid"`
	Postid         *string `json:"postid"`
	Commentid      *string `json:"commentid"`
	Reactiontypeid string  `json:"reactiontypeid"`
	Videoid        *string `json:"videoid"`
}

type AuthResponse struct {
	AuthToken *AuthToken `json:"authToken"`
	User      *User      `json:"user"`
}

type AuthToken struct {
	AccessToken string    `json:"accessToken"`
	ExpiredAt   time.Time `json:"expiredAt"`
}

type CategoryQuery struct {
	AllTime []*Video `json:"allTime"`
	Month   []*Video `json:"month"`
	Week    []*Video `json:"week"`
	Recent  []*Video `json:"recent"`
}

type ChannelHome struct {
	Recent   []*Video    `json:"recent"`
	Random   []*Video    `json:"random"`
	Playlist []*Playlist `json:"playlist"`
}

type CommentInput struct {
	Commentdetail string  `json:"commentdetail"`
	Userid        string  `json:"userid"`
	Videoid       string  `json:"videoid"`
	Rootcommentid *string `json:"rootcommentid"`
}

type CommentWithCount struct {
	Comment []*Comment `json:"comment"`
	Like    []int      `json:"like"`
	Dislike []int      `json:"dislike"`
	Reply   []int      `json:"reply"`
}

type CountedPost struct {
	Post    []*Post `json:"post"`
	Like    []int   `json:"like"`
	Dislike []int   `json:"dislike"`
}

type CreatePlaylistInput struct {
	Playlisttitle       string `json:"playlisttitle"`
	Playlistdescription string `json:"playlistdescription"`
	Privacyid           string `json:"privacyid"`
	Userid              string `json:"userid"`
}

type FinishUplodVideoInput struct {
	Videoname       string `json:"videoname"`
	Userid          string `json:"userid"`
	Videosource     string `json:"videosource"`
	Thumbnailsource string `json:"thumbnailsource"`
	Length          string `json:"length"`
}

type FullVideoInfo struct {
	Video       *Video            `json:"video"`
	Like        int               `json:"like"`
	Dislike     int               `json:"dislike"`
	FullUser    *UserAndCount     `json:"fullUser"`
	FullComment *CommentWithCount `json:"fullComment"`
}

type LoginInput struct {
	Useremail string `json:"useremail"`
	Password  string `json:"password"`
}

type NewLocationInput struct {
	Locationname string `json:"locationname"`
}

type PlaylistAndCount struct {
	Playlists  *Playlist `json:"playlists"`
	Videocount int       `json:"videocount"`
}

type PlaylistDetailInput struct {
	Playlistid string   `json:"playlistid"`
	Videoid    string   `json:"videoid"`
	Viewcount  *float64 `json:"viewcount"`
	Videoorder *int     `json:"videoorder"`
}

type PlaylistDetailUpdate struct {
	Playlistid string  `json:"playlistid"`
	Videoid    string  `json:"videoid"`
	Move       *string `json:"move"`
	View       *bool   `json:"view"`
}

type PlaylistFilter struct {
	Userid        *string `json:"userid"`
	Typeid        *string `json:"typeid"`
	Restrictionid *string `json:"restrictionid"`
}

type PlaylistFullInfo struct {
	Playlist *PlaylistAndCount `json:"playlist"`
	User     *UserAndCount     `json:"user"`
}

type PlaylistUpdateInput struct {
	Playlistid          string     `json:"playlistid"`
	Playlisttitle       *string    `json:"playlisttitle"`
	Playlistdescription *string    `json:"playlistdescription"`
	Privacyid           *string    `json:"privacyid"`
	Updatedtime         *time.Time `json:"updatedtime"`
	Thumbnailsource     *string    `json:"thumbnailsource"`
	Playlisturl         *string    `json:"playlisturl"`
	Userid              *string    `json:"userid"`
}

type PostInput struct {
	Posttime    *time.Time `json:"posttime"`
	Postpicture *string    `json:"postpicture"`
	Posttitle   string     `json:"posttitle"`
	Postdetail  *string    `json:"postdetail"`
	Userid      string     `json:"userid"`
}

type PremiumDetailInput struct {
	Userid     string `json:"userid"`
	Premiumid  string `json:"premiumid"`
	EndInMonth int    `json:"endInMonth"`
	EndInYear  int    `json:"endInYear"`
}

type Premiumtype struct {
	Premiumid   string `json:"premiumid"`
	Premiumname string `json:"premiumname"`
}

type Privacy struct {
	Privacyid   string `json:"privacyid"`
	Privacyname string `json:"privacyname"`
}

type ReactionFilter struct {
	Commentid *string `json:"commentid"`
	Videoid   *string `json:"videoid"`
	Postid    *string `json:"postid"`
	Userid    *string `json:"userid"`
}

type RefreshTokenInput struct {
	Token string `json:"token"`
}

type RegisterUserInput struct {
	Useremail      string `json:"useremail"`
	Username       string `json:"username"`
	Profileimgaddr string `json:"profileimgaddr"`
	Password       string `json:"password"`
	Age            int    `json:"age"`
	Locationid     string `json:"locationid"`
}

type SearchInput struct {
	Item      *string `json:"item"`
	Date      *string `json:"date"`
	Keyword   string  `json:"keyword"`
	Premiumid *string `json:"premiumid"`
}

type SearchResult struct {
	Videos    []*Video            `json:"videos"`
	Channels  []*UserAndCount     `json:"channels"`
	Playlists []*PlaylistAndCount `json:"playlists"`
}

type ShowVideoInput struct {
	Videoid string `json:"videoid"`
	Userid  string `json:"userid"`
}

type SubscribeInput struct {
	Userid    *string `json:"userid"`
	Channelid string  `json:"channelid"`
	Notif     *bool   `json:"notif"`
}

type SubscribedVideo struct {
	Today []*Video `json:"today"`
	Week  []*Video `json:"week"`
	Month []*Video `json:"month"`
}

type UpdateUserInput struct {
	Useremail      string  `json:"useremail"`
	Username       *string `json:"username"`
	Channeldetail  *string `json:"channeldetail"`
	Channelurl     *string `json:"channelurl"`
	Bgimgaddr      *string `json:"bgimgaddr"`
	Profileimgaddr *string `json:"profileimgaddr"`
	Locationid     *string `json:"locationid"`
	Password       *string `json:"password"`
	Age            *int    `json:"age"`
	Restrictionid  *string `json:"restrictionid"`
}

type UpdateVideoInput struct {
	Userid           string   `json:"userid"`
	Videoid          string   `json:"videoid"`
	Videotitle       *string  `json:"videotitle"`
	Videodescription *string  `json:"videodescription"`
	Thumbnailsource  *string  `json:"thumbnailsource"`
	Viewcount        *float64 `json:"viewcount"`
	Privacyid        *string  `json:"privacyid"`
}

type UploadVideoInput struct {
	Videotitle         string `json:"videotitle"`
	Videodescription   string `json:"videodescription"`
	Userid             string `json:"userid"`
	Typeid             string `json:"typeid"`
	Locationid         string `json:"locationid"`
	Restrictionid      string `json:"restrictionid"`
	Categoryid         string `json:"categoryid"`
	Privacyid          string `json:"privacyid"`
	PublishAfterMinute int    `json:"publishAfterMinute"`
}

type UserAndCount struct {
	User       *User `json:"user"`
	Count      int   `json:"count"`
	Vcount     int   `json:"vcount"`
	VideoCount *int  `json:"videoCount"`
}

type VideoFilter struct {
	Locationid       *string  `json:"locationid"`
	Restrictionid    *string  `json:"restrictionid"`
	Categoryid       *string  `json:"categoryid"`
	Videotitle       *string  `json:"videotitle"`
	Videodescription *string  `json:"videodescription"`
	Viewcount        *float64 `json:"viewcount"`
	Userid           *string  `json:"userid"`
	Typeid           *string  `json:"typeid"`
	Videoconditionid *string  `json:"videoconditionid"`
	Sortby           *string  `json:"sortby"`
}
