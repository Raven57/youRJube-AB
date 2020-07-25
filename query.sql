create table users (
	userid bigserial primary key,
	username varchar(255),
	useremail varchar(255),
	channelurl varchar(255),
	channeldetail varchar(255),
	profileimgaddr varchar(255),
	bgimgaddr varchar(255),
	premiumstart timestamp,
	premiumend timestamp,
	premiumid bigserial,
	password varchar(255),
	constraint fkuser_premium
		foreign key(premiumid)
	references premiumtypes(premiumid)
	on delete cascade
	on update cascade
)

create table premiumtypes (
	premiumid bigserial primary key,
	premiumname varchar(255)
)

create table locations (
	locationid bigserial primary key,
	locationname varchar(255)
)

create table categories (
	categoryid bigserial primary key,
	categoryname varchar(255)
)

create table videotypes (
	videotypeid bigserial primary key,
	videotype varchar(255)
)

create table restrictions (
	restrictionid bigserial primary key,
	restrictioncategory varchar(255)
)

create table privacies (
	privacyid bigserial primary key,
	privacyname varchar(255)
)

create table status (
	statusid bigserial primary key,
	statusname varchar(255)
)

create table reactiontypes (
	reactiontypeid bigserial primary key,
	reactiontypename varchar(255)
)

create table playlists (
	playlistid bigserial primary key,
	playlisttitle varchar(255),
	playlistdescription varchar(255),
	createdtime timestamp,
	updatetime timestamp,
	playlisturl varchar(255),
	thumbnailsource varchar(255),
	privacyid bigint,
	userid bigint,

	constraint fkpl_user
	foreign key (userid)
	references users(userid),
	constraint fkpl_privacy
	foreign key (privacyid)
	references privacies(privacyid)
)

create table posts (
	postid bigserial primary key,
	postpicture varchar(255),
	posttime timestamp,
	postdetail varchar(255),
	userid bigint,

	constraint fkuser_post
	foreign key (userid)
	references users(userid)
)
create table comments (
	commentid bigserial primary key,
	commentdetail varchar(255),
	commenttime timestamp,
	userid bigint,
	rootcommentid bigint,

	constraint fkuser_comment
	foreign key (userid)
	references users(userid),
	constraint fkrootcomment
	foreign key (rootcommentid)
	references comments(commentid)
)

create table subscriptions (
	userid bigserial,
	channelid bigserial,
	notification boolean,

	constraint fkuser_user
	foreign key (userid)
	references users(userid),
	constraint fkuser_channel
	foreign key (channelid)
	references users(userid)
)

create table videos (
	videoid bigserial primary key,
	videotitle varchar(255),
	videodescription varchar(255),
	videosource varchar(255),
	uploadtime timestamp,
	publishtime timestamp,
	thumbnailsource varchar(255),
	viewcount float,
	userid bigint,
	typeid bigint,
	statusid bigint,
	locationid bigint,
	restrictionid bigint,
	categoryid bigint,
	privacyid bigint,

	constraint fkuploader
	foreign key (userid)
	references users(userid),
	constraint fkvideotype
	foreign key (typeid)
	references videotypes(videotypeid),
	constraint fkvideostatus
	foreign key (statusid)
	references status(statusid),
	constraint fkvideolocation
	foreign key (locationid)
	references locations(locationid),
	constraint fkvideorestriction
	foreign key (restrictionid)
	references restrictions(restrictionid),
	constraint fkvideocategory
	foreign key (categoryid)
	references categories(categoryid),
	constraint fkvideoprivacy
	foreign key (privacyid)
	references privacies(privacyid)
)

create table playlistdetails (
	playlistid bigint,
	videoid bigint,
	viewcount float,
	videoorder int,

	constraint fkplaylistid
	foreign key (playlistid)
	references playlists(playlistid),
	constraint fkpvideoid
	foreign key (videoid)
	references videos(videoid)

)

create table reactions (
	userid bigint not null,
	postid bigint default null,
	commentid bigint default null,
	reactiontypeid bigint default null,

	constraint fkuserreaction
	foreign key (userid)
	references users(userid),

	constraint flpostreaction
	foreign key (postid)
	references posts(postid),

	constraint fkreactiontypes
	foreign key (reactiontypeid)
	references reactiontypes(reactiontypeid),

	constraint fkcomments
	foreign key (commentid)
	references comments(commentid)

  create table premiumdetails (
	startdate timestamp primary key,
	userid bigint,
	premiumid bigint,
	enddate timestamp,

	constraint fkuser
	foreign key (userid)
	references users(userid),

	constraint fkpremium
	foreign key (premiumid)
	references premiumtypes(premiumid)

)

alter table users
	add column age int,
	add column locationid bigint,

	add constraint fkuser_loc
	foreign key (locationid)
	references locations(locationid)
