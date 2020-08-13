import { CommentService } from './../comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
const cekLike = gql`
query ceklike($userid: ID, $postid:ID){
  checkLike(input:{userid:$userid,videoid:$postid})
}
`;
const cekDislike = gql`
query cekdislike($userid: ID, $postid:ID){
  checkDisike(input:{userid:$userid,videoid:$postid})
}
`;
@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})

export class VideoDescriptionComponent implements OnInit {
  @Input() ownChannel: boolean;
  @Input() usertype: string;
  @Input() notif: boolean;
  @Input() subscribed: boolean;
  @Input() premium: boolean;
  @Input() title: string;
  @Input() view: string;
  @Input() datePub: string;
  @Input() like: number;
  @Input() dislike: number;
  @Input() channel: string;
  @Input() channelSub: string;
  @Input() channelImg: string;
  @Input() desc: string;
  @Input() category: string;
  @Input() currUserID: string;
  @Input() videoID: string;
  @Input() videoURL: string;
  liked: boolean;
  disliked: boolean;
  constructor(private com: CommentService, private apollo: Apollo) { }
  ngOnInit(): void {
    // this.checkDislike();
    // this.checkLike();
    console.log(this.videoURL);
    if (this.like == null) {
      this.like = 0;
    }
    if (this.dislike == null) {
      this.dislike = 0;
    }
  }
  download() {
    console.log(this.videoURL);

    window.open(this.videoURL);
  }
  clickLike() {
    if (this.liked) {
      this.liked = !this.liked;
      this.com.deletelike(this.currUserID, this.videoID);
      this.like--;
    } else if(this.disliked){
      this.liked = true;
      this.disliked = !this.disliked;
      this.com.deleteDislike(this.currUserID, this.videoID);
      this.com.like(this.currUserID, this.videoID);
      this.like++;
      this.dislike--;
    } else {
      this.com.like(this.currUserID, this.videoID);
      this.like++;
      this.liked = !this.liked;
    }
  }
  clickDislike() {
    if (this.disliked) {
      this.dislike--;
      this.disliked = !this.disliked;
      this.com.deleteDislike(this.currUserID, this.videoID);
    } else if(this.liked){
      this.disliked = true;
      this.liked = !this.liked;
      this.com.deletelike(this.currUserID, this.videoID);
      this.com.dislike(this.currUserID, this.videoID);
      this.dislike++;
      this.like--;
    } else {
      this.com.dislike(this.currUserID, this.videoID);
      this.dislike++;
      this.disliked = !this.disliked;
    }
  }
  checkDislike() {
    this.apollo.watchQuery<any>({
      query: cekDislike,
      variables: {
        userid: this.currUserID,
        postid: this.videoID
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
        userid: this.currUserID,
        postid: this.videoID
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
