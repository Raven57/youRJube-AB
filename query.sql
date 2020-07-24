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

