import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatVideoComponent } from 'mat-video/lib/video.component';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const getVideo = gql`
query getvid($videoid:ID!){
  oneVideo(videoid:$videoid){
    typeid,
    videoid,
    videotitle,
    videodescription,
    thumbnailsource,
    privacyid,
    user {
      userid,
      username
    },
    publishtime,
    viewcount,
    length
  }
}
`;
@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  // @ViewChild('video') matVideo: MatVideoComponent;
  // video: HTMLVideoElement;
  // videos: any[];
  // last = 10;
  id = '';
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // this.category = cats[+params.get('categoryid')];
      console.log(+params.get('videoid'));
      this.id = params.get('videoid');
      this.query();
    });
  }
  query() {

      this.apollo.watchQuery<any>({
        query: getVideo,
        variables: {
          videoid: this.id,
        }
      }).valueChanges.subscribe(({ data }) => {
        console.log('VIDEOOO ', data);
      }, (error) => {
        console.log('error', error);
        // alert(error);
      });
  }
}
