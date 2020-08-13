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
const update = gql`
mutation updVid(
  $userid: ID!,
  $videoid: ID!,
  $videotitle: String,
  $videodescription: String,
  $thumbnailsource: String,
  $viewcount: Float,
  $privacyid: ID,
){
  updateVideo(input:{
    userid: $userid,
    videoid: $videoid,
    videotitle: $videotitle,
    videodescription: $videodescription,
    thumbnailsource: $thumbnailsource,
    viewcount: $viewcount,
    privacyid: $privacyid,
  })
}
`;
const del = gql`
mutation delVid(
  $id:ID!
){
  deleteVideo(videoid:$id)
}
`;
const finalize = gql`
mutation finishUpload(
  $title: String!,
  $userid: ID!,
  $vid: String!,
  $th: String!,
  $l: String!)
  {
    finishUpload(input:{
    videoname:$title,
    userid:$userid,
    videosource:$vid,
    thumbnailsource:$th,
    length:$l,
  }){
    videotitle
  }
}
`;
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos = [];
  userVids = [];
  valid = true;
  constructor(private apollo: Apollo) { }


  upload(titl: string, des: string, useri: string,  typei: string,
         locationi: string, restrictioni: string, categoryi: string,
         privacyi: string,
         Minut: number): boolean {

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
      this.valid = true;
    }, (error) => {
      console.log('error', error);
      alert(error);
      this.valid = false;
    });
    return this.valid;
  }

  finalize(titl: string, user: string, vidurl: string, thurl: string, len: string) {
    console.log(titl);
    console.log(user);
    console.log(vidurl);
    console.log(thurl);
    console.log(len);

    this.apollo.mutate<any>({
      mutation: finalize,
      variables: {
        title: titl,
        vid: vidurl,
        userid: user,
        th: thurl,
        l: len,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  del(vidid: string) {
    this.apollo.mutate<any>({
      mutation: del,
      variables: {
        id: vidid,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      window.location.reload();
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  update(us: string, vid: string, tit: string, des: string, thu: string, vc: string, priv: string) {
    this.apollo.mutate<any>({
      mutation: update,
      variables: {
        userid: us,
        videoid: vid,
        videotitle: tit,
        videodescription: des,
        thumbnailsource: thu,
        viewcount: vc,
        privacyid: priv,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      window.location.reload();
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  // getVidOfUser(id: string) {
  //   this.apollo.watchQuery<any>({
  //     query: getByUser,
  //     variables: {
  //       userid: id,
  //     }
  //   }).valueChanges.subscribe(({ data }) => {
  //     this.userVids = data.video;
  //     this.userVids.forEach(element => {
  //       let readd = new Date(element.publishtime);
  //       element.publishtime = this.getDateDiff(readd);
  //     });
  //   }, (error) => {
  //     console.log('error', error);
  //     // alert(error);
  //   });
  // }
  getDateDiff(publish: Date): string {
    let dateDif = '';
    const currentDate = new Date();

    const min = Math.floor(
      (Date.UTC(currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
      ) -
      Date.UTC(publish.getFullYear(),
      publish.getMonth(),
      publish.getDate(),
      publish.getHours(),
      publish.getMinutes(),
      publish.getSeconds(),
      publish.getMilliseconds())
      ) / (1000));
    let temp = 0;
    //ini 1000 ms berarti 1 detik

    if (min <= 0){
      temp = -1 * min;
      console.log('temp ', temp);
      dateDif = 'Will be released in ';
    } else {
      temp = min;
    }

    const y = Math.floor(temp / 31556952);
    console.log('YEar ', y);
    if (y <= 0) {
      const mon = Math.floor(temp / 2629746);
      console.log('mon ', mon);

      if (mon <= 0) {
        const d = Math.floor(temp / 86400);
        console.log('d ', d);
        if (d <= 0) {
          const hour = Math.floor(temp / 3600);
          console.log('hour ', hour);
          if (hour <= 0) {
            const minute = Math.floor(temp / 60);
            console.log('minute ', minute);
            if (minute <= 0) {
              const second = temp;
              console.log('second ', second);
              if (min < 0) {
                dateDif += second.toString() + ' Second(s)';
              } else {
                dateDif = second.toString() + ' S Ago';
              }
            } else {
              if (min < 0) {
                dateDif += minute.toString() + ' Minute(s)';
              } else {
                dateDif = minute.toString() + ' M Ago';
              }
            }
          } else {
            if (min < 0) {
              dateDif += hour.toString() + ' Hour(s)';
            } else {
              dateDif = hour.toString() + ' H Ago';
            }
          }
        } else {
          if (min < 0) {
            dateDif += d.toString() + ' Day(s)';
          } else {
            dateDif = d.toString() + ' Day(s) Ago';
          }
        }
      } else {
        if (min < 0) {
          dateDif += mon.toString() + ' Month';
        } else {
          dateDif = mon.toString() + ' Mon Ago';
        }
      }
    } else {
      if (min < 0) {
        dateDif += y.toString() + ' Year';
      } else {
        dateDif = y.toString() + ' Y Ago';
      }
    }

    return dateDif;
  }
  getDateDiffString(str: string): string {
    let dateDif = '';
    const currentDate = new Date();
    const publish = new Date(str);
    const min = Math.floor(
      (Date.UTC(currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
      ) -
      Date.UTC(publish.getFullYear(),
      publish.getMonth(),
      publish.getDate(),
      publish.getHours(),
      publish.getMinutes(),
      publish.getSeconds(),
      publish.getMilliseconds())
      ) / (1000));
    let temp = 0;
    //ini 1000 ms berarti 1 detik

    if (min <= 0){
      temp = -1 * min;
      console.log('temp ', temp);
      dateDif = 'Will be released in ';
    } else {
      temp = min;
    }

    const y = Math.floor(temp / 31556952);
    console.log('YEar ', y);
    if (y <= 0) {
      const mon = Math.floor(temp / 2629746);
      console.log('mon ', mon);

      if (mon <= 0) {
        const d = Math.floor(temp / 86400);
        console.log('d ', d);
        if (d <= 0) {
          const hour = Math.floor(temp / 3600);
          console.log('hour ', hour);
          if (hour <= 0) {
            const minute = Math.floor(temp / 60);
            console.log('minute ', minute);
            if (minute <= 0) {
              const second = temp;
              console.log('second ', second);
              if (min < 0) {
                dateDif += second.toString() + ' Second(s)';
              } else {
                dateDif = second.toString() + ' S Ago';
              }
            } else {
              if (min < 0) {
                dateDif += minute.toString() + ' Minute(s)';
              } else {
                dateDif = minute.toString() + ' M Ago';
              }
            }
          } else {
            if (min < 0) {
              dateDif += hour.toString() + ' Hour(s)';
            } else {
              dateDif = hour.toString() + ' H Ago';
            }
          }
        } else {
          if (min < 0) {
            dateDif += d.toString() + ' Day(s)';
          } else {
            dateDif = d.toString() + ' Day(s) Ago';
          }
        }
      } else {
        if (min < 0) {
          dateDif += mon.toString() + ' Month';
        } else {
          dateDif = mon.toString() + ' Mon Ago';
        }
      }
    } else {
      if (min < 0) {
        dateDif += y.toString() + ' Year';
      } else {
        dateDif = y.toString() + ' Y Ago';
      }
    }

    return dateDif;
  }
}
