import { VideoService } from './../video.service';
import { CommentService } from './../comment.service';
import { Apollo } from 'apollo-angular';
import { UserServiceService } from './../user-service.service';
import { Component, Input, OnInit } from '@angular/core';
import gql from 'graphql-tag';
const cekLike = gql`
query ceklike($userid: ID, $postid:ID){
  checkLike(input:{userid:$userid,commentid:$postid})
}
`;
const cekDislike = gql`
query cekdislike($userid: ID, $postid:ID){
  checkDisike(input:{userid:$userid,commentid:$postid})
}
`;
@Component({
  selector: 'app-comment-bubble',
  templateUrl: './comment-bubble.component.html',
  styleUrls: ['./comment-bubble.component.scss']
})
export class CommentBubbleComponent implements OnInit {
  @Input() comment: any;
  userid: string;
  dislike: number;
  like: number;
  disliked: boolean;
  liked: boolean;
  commentid: string;
  constructor(private user: UserServiceService, private apollo: Apollo, private com: CommentService, private vid: VideoService) { }

  ngOnInit(): void {
    console.log('comentt ', this.comment);
    this.comment.date = this.vid.getDateDiffString(this.comment.commenttime);
    this.like = this.comment.like;
    this.dislike = this.comment.dislike;
    this.commentid = this.comment.commentid;
    if (this.like == null) {
      this.like = 0;
    }
    if (this.dislike == null) {
      this.dislike = 0;
    }
    this.user.currUserID.subscribe(u => {
      this.userid = u;
      this.checkDislike();
      this.checkLike();
    });
  }
  clickLike() {
    if (this.userid !== null) {

      if (this.liked) {
        this.liked = !this.liked;
        this.com.deletelikeComment(this.userid, this.commentid);
        this.like--;
        this.comment.like--;
      } else if(this.disliked){
        this.liked = true;
        this.disliked = !this.disliked;
        this.com.deleteDislikeComment(this.userid, this.commentid);
        this.com.likeComment(this.userid, this.commentid);
        this.like++;
        this.comment.like++;
        this.comment.dislike--;
        this.dislike--;
      } else {
        this.com.likeComment(this.userid, this.commentid);
        this.like++;
        this.comment.like++;
        this.liked = !this.liked;
      }
    } else {
      alert('LOGIN TO LIKE!');
    }
  }
  clickDislike() {
    if (this.userid !== null) {

      if (this.disliked) {
        this.dislike--;
        this.disliked = !this.disliked;
        this.comment.dislike--;
        this.com.deleteDislikeComment(this.userid, this.commentid);
      } else if (this.liked) {
        this.disliked = true;
        this.liked = !this.liked;
        this.com.deletelikeComment(this.userid, this.commentid);
        this.com.dislikeComment(this.userid, this.commentid);
        this.dislike++;
        this.comment.dislike++;
        this.comment.like--;
        this.like--;
      } else {
        this.com.dislikeComment(this.userid, this.commentid);
        this.comment.dislike++;
        this.dislike++;
        this.disliked = !this.disliked;
      }
    } else {
      alert('login to dislike!');
    }
    }
    checkDislike() {
    this.apollo.watchQuery<any>({
      query: cekDislike,
      variables: {
        userid: this.userid,
        postid: this.comment.commentid
      }
    }).valueChanges.subscribe(({ data }) => {
      // this.liked = data
      console.log('Data disliked', data);
      this.disliked = data.checkDisike;
      }, (error) => {
        console.log('error', error);
        // alert(error);
      });
  }
  checkLike() {
    this.apollo.watchQuery<any>({
      query: cekLike,
      variables: {
        userid: this.userid,
        postid: this.comment.commentid
      }
    }).valueChanges.subscribe(({ data }) => {
      // this.liked = data
      console.log('Data liked', data);
      this.liked = data.checkLike;
      }, (error) => {
        console.log('error', error);
        // alert(error);
      });
  }
}
