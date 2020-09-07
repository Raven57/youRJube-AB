import { UserServiceService } from './../user-service.service';
import { Apollo } from 'apollo-angular';
import { Component, Input, OnInit } from '@angular/core';
import gql from 'graphql-tag';
const insertComment = gql`
mutation com($detail:String!,$userid:ID!,$videoid:ID!,$root:ID) {
  InsertComment(input:{userid:$userid,commentdetail:$detail,videoid:$videoid,rootcommentid:$root}){
    commentdetail, commenttime, rootcommentid,commentid,
    user{
      username,
      profileimgaddr,
      userid
    }
  }
}
`;
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  @Input() comments: any;
  @Input() videoid: string;
  @Input() userid: string;
  count: number;
  det: string;
  constructor(private apollo: Apollo) { }
  newComment: any;
  ngOnInit(): void {
    console.log(this.comments);
    this.count = this.comments.length;

  }
  insertComment() {
    if (this.det === null || this.det === '') {
      alert('comment cannot be empty!');
      return;
    }
    else if (this.userid === null || this.userid === '') {
      alert('please log in to comment!');
      return;
    } else {
      this.comment(this.userid, this.det, this.videoid, '');
    }
  }
  comment(useri: string, det: string, vidid: string, rt: string) {
    this.newComment = null;
    console.log(useri);
    console.log(det);
    console.log(vidid);
    console.log(rt);
    this.apollo.mutate<any>({
      mutation: insertComment,
      variables: {
        userid: useri,
        detail: det,
        videoid: vidid,
        root: rt,
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data!=null) {
        alert('Success Comment!');
        this.newComment = data.InsertComment;
        this.newComment.like = 0;
        this.newComment.dislike = 0;
        this.comments.push(this.newComment);
      } else {
        alert('Failed!');
      }
    });
  }
  sortComment(str: string) {
    switch (str) {
      case 'newest':
        this.sortDatePublishedFunc();
        break;
        case 'like':
        this.sortPopularityFunc();
        break;
    }
  }
  sortPopularityFunc() {
    this.comments = this.comments.sort((b, a) => {
      let d1: number = (a.like);
      let d2: number = (b.like);
      return (d1 - d2);
      }
    );
  }
  sortDatePublishedFunc() {
    let temp = this.comments;
    console.log('temp ',temp);
    this.comments = null;
    this.comments = temp.sort((b, a) => {
      let d1 = new Date(a.commenttime);
      let d2 = new Date(b.commenttime);
      return (d1.getTime() - d2.getTime());
    });
    console.log('cms ',this.comments);
  }
}
