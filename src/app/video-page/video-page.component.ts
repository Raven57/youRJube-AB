import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatVideoComponent } from 'mat-video/lib/video.component';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  // @ViewChild('video') matVideo: MatVideoComponent;
  // video: HTMLVideoElement;
  videos: any[];
  last = 10;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // this.category = cats[+params.get('categoryid')];
      console.log(+params.get('videoid'));
    });
  }

}
