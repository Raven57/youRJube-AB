import { PostServiceService } from './../post-service.service';
import { VideoService } from './../video.service';
import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
const cekLike = gql`
query ceklike($userid: ID, $postid:ID){
  checkLike(input:{userid:$userid,postid:$postid})
}
`;
const cekDislike = gql`
query cekdislike($userid: ID, $postid:ID){
  checkDisike(input:{userid:$userid,postid:$postid})
}
`;
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() postid: string;
  @Input() posttitle: string;
  @Input() postpicture: string;
  @Input() posttime: string;
  @Input() postdetail: string;
  @Input() like: number;
  @Input() dislike: number;
  @Input() username: string;
  @Input() currUserID: string;
  liked = false;
  disliked = false;
  constructor(private video: VideoService, private apollo: Apollo, private post: PostServiceService) { }

  ngOnInit(): void {
    this.posttime = this.video.getDateDiffString(this.posttime);
    this.checkDislike();
    this.checkLike();
    if (this.like == null) {
      this.like = 0;
    }
    if (this.dislike == null) {
      this.dislike = 0;
    }
  }

  clickLike() {
    if (this.liked) {
      this.liked = !this.liked;
      this.post.deletelike(this.currUserID, this.postid);
      this.like--;
    } else if(this.disliked){
      this.liked = true;
      this.disliked = !this.disliked;
      this.post.deleteDislike(this.currUserID, this.postid);
      this.post.like(this.currUserID, this.postid);
      this.like++;
      this.dislike--;
    } else {
      this.post.like(this.currUserID, this.postid);
      this.like++;
      this.liked = !this.liked;
    }
  }
  clickDislike() {
    if (this.disliked) {
      this.dislike--;
      this.disliked = !this.disliked;
      this.post.deleteDislike(this.currUserID, this.postid);
    } else if(this.liked){
      this.disliked = true;
      this.liked = !this.liked;
      this.post.deletelike(this.currUserID, this.postid);
      this.post.dislike(this.currUserID, this.postid);
      this.dislike++;
      this.like--;
    } else {
      this.post.dislike(this.currUserID, this.postid);
      this.dislike++;
      this.disliked = !this.disliked;
    }
  }
  checkDislike() {
    this.apollo.watchQuery<any>({
      query: cekDislike,
      variables: {
        userid: this.currUserID,
        postid: this.postid
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
        postid: this.postid
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
