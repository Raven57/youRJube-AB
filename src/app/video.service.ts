import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const upload = gql`
mutation createNewUser(
  $title: String!,
  $desc: String!,
  $userid: ID!,
  $typeid: ID!,
  $locationid: ID!,
  $restrictionid: ID!,
  $categoryid: ID!,
  $privacyid: ID!,
  $Minute:Int!,)
  {
   uploadVideo(input:{
    videotitle:$title,
    videodescription: $desc,
    userid:$userid,
    typeid:$typeid,
  	locationid:$locationid,
    restrictionid:$restrictionid,
    categoryid:$categoryid,
    privacyid:$privacyid,
    publishAfterMinute:$Minute,
  }){
    videotitle
  }
}
`;

const finalize = gql`
mutation finishUpload(
  $title: String!,
  $userid: ID!,
  $vid: String!,
  $th: String!,)
  {
    finishUpload(input:{
    videoname:$title,
    userid:$userid,
    videosource:$vid,
  	thumbnailsource:$th,
  }){
    videotitle
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos = [];

  constructor(private apollo: Apollo) { }


  upload(titl: string, des: string, useri: string,  typei: string,
         locationi: string, restrictioni: string, categoryi: string,
         privacyi: string,
         Minut: number) {

    this.apollo.mutate<any>({
      mutation: upload,
      variables: {
        title: titl,
        desc: des,
        userid: useri,
        typeid: typei,
        locationid: locationi,
        restrictionid: restrictioni,
        categoryid: categoryi,
        privacyid: privacyi,
        Minute: Minut,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }

  finalize(titl: string, user: string, vidurl: string, thurl: string) {
    console.log(titl);
    console.log(user);
    console.log(vidurl);
    console.log(thurl);

    this.apollo.mutate<any>({
      mutation: finalize,
      variables: {
        title: titl,
        vid: vidurl,
        userid: user,
        th: thurl,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }

}
