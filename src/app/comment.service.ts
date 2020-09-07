import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
const react = gql`
mutation reactt(
  $userid:ID!,
  $postid: ID,
  $reactiontypeid: ID!,
  ){
    React(input:{
    userid:$userid,
    videoid: $postid,
    reactiontypeid: $reactiontypeid,
  })
}
`;
const deletereaction = gql`
mutation deletereact(
  $userid:ID,
  $postid: ID,
  ){
    deleteReaction(input:{
    userid:$userid,
    videoid: $postid
  })
}
`;
const commentReact = gql`
mutation reactt(
  $userid:ID!,
  $postid: ID,
  $reactiontypeid: ID!,
  ){
    React(input:{
    userid:$userid,
    commentid: $postid,
    reactiontypeid: $reactiontypeid,
  })
}
`;
const commentDeleteReaction = gql`
mutation deletereact(
  $userid:ID,
  $postid: ID,
  ){
    deleteReaction(input:{
    userid:$userid,
    commentid: $postid
  })
}
`;
const postapost = gql`
mutation post(
  $userid:ID!,
  $postpicture: String,
  $posttitle: String!,
  $postdetail: String,
  ){
    PostAPost(input:{
    userid:$userid,
    postpicture: $postpicture,
    posttitle: $posttitle,
    postdetail: $postdetail,
  }){
    posttitle
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  dislike(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: react,
      variables: {
        userid: currUserID,
        postid: posti,
        reactiontypeid: 2
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data!=null) {
        alert('Success Dislike!');
      } else {
        alert('Failed!');
      }
    });
  }
  deleteDislike(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: deletereaction,
      variables: {
        userid: currUserID,
        postid: posti
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
    });
  }
  deletelike(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: deletereaction,
      variables: {
        userid: currUserID,
        postid: posti
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
    });
  }
  like(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: react,
      variables: {
        userid: currUserID,
        postid: posti,
        reactiontypeid: 1
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data!=null) {
        alert('Success Like!');
      } else {
        alert('Failed!');
      }
    });
  }

  dislikeComment(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: commentReact,
      variables: {
        userid: currUserID,
        postid: posti,
        reactiontypeid: 2
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data!=null) {
        alert('Success Dislike!');
      } else {
        alert('Failed!');
      }
    });
  }
  deleteDislikeComment(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: commentDeleteReaction,
      variables: {
        userid: currUserID,
        postid: posti
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
    });
  }
  deletelikeComment(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: commentDeleteReaction,
      variables: {
        userid: currUserID,
        postid: posti
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
    });
  }
  likeComment(currUserID: string, posti: string) {
    this.apollo.mutate<any>({
      mutation: commentReact,
      variables: {
        userid: currUserID,
        postid: posti,
        reactiontypeid: 1
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data!=null) {
        alert('Success Like!');
      } else {
        alert('Failed!');
      }
    });
  }
  postapost(useri: string, posttitl: string, postde: string, PostImgStrin: string) {
    this.apollo.mutate<any>({
      mutation: postapost,
      variables: {
        userid: useri,
        postpicture: PostImgStrin,
        posttitle: posttitl,
        postdetail: postde,
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data!=null) {
        alert('Success Post!');
        window.location.reload();
      } else {
        alert('Failed!');
      }
    });
  }

  constructor(private apollo: Apollo) { }
}
