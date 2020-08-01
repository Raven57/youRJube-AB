import { GetIpAddressService } from './../get-ip-address.service';
import { VideoService } from './../video.service';
import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit,OnDestroy, ElementRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { BooleanValueNode } from 'graphql';
import gql from 'graphql-tag';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';
import { buffer } from 'rxjs/operators';

const get = gql`
query getVideoSetting {
  privacies{
    privacyid,
    privacyname
  }
  categories{
    categoryid,
    categoryname
  }
  videotypes{
    videotypeid,
    videotype
  }
  restrictions{
    restrictionid,
    restrictioncategory
  }
}
`;

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})

export class UploadPageComponent implements OnInit, OnDestroy {
  private querySubscription: Subscription;

  privacies: any[];
  categories: any[];
  videotypes: any[];
  restrictions: any[];
  loading: boolean;
  error: any;


  imgInput = false;
  inputted = false;
  objectUrl: any;
  isHovering: boolean;
  files: File;
  bufferFile: File;
  bufferPicture: File;
  videosrc: File;
  imgFile: File;

  videoString: string;
  imgString: string;
  videoLink = '';
  hour: number;
  minute: number;
  second: number;
  showQuestion = false;
  showPopUp = false;
  title = '';
  desc: string;
  date: string;
  vid: any;

  selectedPrivacy: string;
  selectedPremium: string;
  selectedCategory: string;
  selectedRestriction: string;
  selectedMoment: Date;
  minutedif: number;

  videourl: string;
  thumbnailurl: string;
  locid: string;
  userid: string;
  user: SocialUser;
  constructor(private apollo: Apollo, private element: ElementRef, private userService: UserServiceService, private video: VideoService,
              private loc: GetIpAddressService) { }

  isVisible = false;

  ngOnInit(): void {
    this.loc.currLocID.subscribe(loc => this.locid = loc);
    this.userService.currUserID.subscribe(user => this.userid = user);
    this.userService.currUser.subscribe(user => this.user = user);


    this.apollo.watchQuery<any>({
      query: get
    }).valueChanges.subscribe(result => {
      this.privacies = result.data && result.data.privacies;
      this.categories = result.data && result.data.categories;
      this.videotypes = result.data && result.data.videotypes;
      this.restrictions = result.data && result.data.restrictions;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }

  finalize() {
    //update videourl dan thumbnail
    this.video.finalize(this.title, this.userid, this.videourl, this.thumbnailurl);
  }

  setVideoURL(string: string) {
    this.videourl = string;
    this.isVisible = true;
  }

  setThumbnailURL(string: string) {
    this.thumbnailurl = string;
  }

  insertTitle(event: any) {
    this.title = event.target.value;
  }

  clickUpload() {
    this.showQuestion = true;
    this.displayLink();
  }

  displayLink(): void {
    console.log('asd');
    this.showPopUp = !this.showPopUp;
    // this.showQuestion = false;
  }

  changeVisible(visible: boolean) {
    this.showPopUp = visible;
  }

  upload(bool: boolean) {
    if (bool == true) {

      console.log(this.locid);
      console.log(this.userid);

      if (this.title != '' &&
        this.desc != '' &&
        this.selectedCategory != '' &&
        this.selectedPremium != '' &&
        this.selectedPrivacy != '' &&
        this.selectedRestriction != '' &&
        this.bufferFile != null &&
        this.bufferPicture != null) {

          this.getDateDiff();
          this.files = this.bufferFile;
          this.imgFile = this.bufferPicture;
          this.bufferFile = null;
          this.bufferPicture = null;

          this.video.upload(this.title, this.desc, this.userid, this.selectedPremium,
            this.locid, this.selectedRestriction, this.selectedCategory,
          this.selectedPrivacy, this.minutedif);
      }
      else {
        alert('Fill everything!');
      }
    }

  }



  getDateDiff() {

    let currentDate = new Date();

    this.minutedif = Math.floor(
      (Date.UTC(this.selectedMoment.getFullYear(),
                this.selectedMoment.getMonth(),
                this.selectedMoment.getDate()
      ) -
      Date.UTC(currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate())
      ) / (1000 * 60));
  }

  uploadPic(event): void {
    if (event != null) {
      this.bufferPicture = event.target.files[0];
      console.log(this.bufferPicture.name);
      this.imgInput = true;
      if (!this.validateImage(this.bufferPicture.name)) {
        alert('Selected file format is not supported');
        this.bufferPicture = null;
        this.imgInput = false;
      }
      else {
        const reader = new FileReader();
        reader.onload = e => this.imgString = reader.result as string;

        reader.readAsDataURL(this.bufferPicture);
      }
    }
  }
  getLength() {

    const reader = new FileReader();
    reader.onload = e => this.videoString = reader.result as string;

    reader.readAsDataURL(this.bufferFile);
  }
  uploadVid(event): void  {
    if (event != null) {
      this.bufferFile = event.target.files[0];
      console.log(this.bufferFile.name);
      this.inputted = true;
      this.getLength();
      if (!this.validateVideo(this.bufferFile.name)) {
        alert('Selected file format is not supported');
        this.bufferFile = null;
        this.inputted = false;
      }
    }
  }
  onMetadata(e, video) {
    console.log('metadata: ', e);
    console.log(video.duration);

    this.hour = Math.floor(video.duration / 3600);
    this.minute = Math.floor((video.duration / 60) % 60);
    this.second = Math.floor(video.duration % 60);
    // console.log('duration: ', this.length = video.duration);
  }
  onDrop(dropped: File): void  {
    if (dropped != null) {
      if (!this.validateVideo(dropped[0].name)) {
        alert('Selected file format is not supported');
      }
      else {
        this.bufferFile = dropped[0];
        this.inputted = true;
        this.getLength();
      }
    }
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  validateVideo(name: string): boolean {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'mp4') {
        return true;
    }
    else if (ext.toLowerCase() == 'flv') {
      return true;
    }
    else if (ext.toLowerCase() == 'm3u8') {
      return true;
    }
    else if (ext.toLowerCase() == 'ts') {
      return true;
    }
    else if (ext.toLowerCase() == '3gp') {
      return true;
    }
    else if (ext.toLowerCase() == 'mov') {
      return true;
    }
    else if (ext.toLowerCase() == 'avi') {
      return true;
    }
    else if (ext.toLowerCase() == 'wmv') {
      return true;
    }
    else if (ext.toLowerCase() == 'mkv') {
      return true;
    }
    else {
        return false;
    }
  }

  validateImage(name: string): boolean {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg') {
        return true;
    }
    else if (ext.toLowerCase() == 'png') {
      return true;
    }
    else {
        return false;
    }
}
}
