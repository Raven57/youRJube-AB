import { PremiumdetailService } from './../premiumdetail.service';
import { RestrictionServiceService } from './../restriction-service.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
const homeQuery = gql`
query home(
  $restr: ID,
  $loc:ID,
  $type:ID,
  $cat:ID){
    categoryvideos(filter:{
    restrictionid:$restr,
    locationid:$loc,
    typeid:$type,
    categoryid:$cat,}){
      week{
        videotitle,
        videodescription,
        publishtime,
        thumbnailsource,
        viewcount,
        length,
        user{
        profileimgaddr,
        username,
      }}
  }
}`;
@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.scss']
})
export class TrendingPageComponent implements OnInit {
  premid: string;
  restid: string;
  check = 0;
  week: any[];
  constructor( private apollo: Apollo,
    private restrict: RestrictionServiceService, private premium: PremiumdetailService) { }

  ngOnInit(): void {
    this.premium.currPremiumId.subscribe(premid => {
      this.premid = premid;
      this.checkForQuery(this.premid, 1);
    });
    this.restrict.currRestrictionID.subscribe(r => {
      this.restid = r;
      this.checkForQuery(this.restid, 2);
    });
  }
  checkForQuery(inp: any, inc: number) {
    if (inp != null) {
      this.check++;
      console.log('cek tren ', inc, this.check);
    }
    if (this.check >= 2) {
      this.query();
      }
  }
  query(): void {

    this.apollo.watchQuery<any>({
      query: homeQuery,
      variables: {
        type: this.premid,
        restr: this.restid,
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('dataa ', data);
      this.week = data.categoryvideos.week;

      this.week.forEach(element => {
        let readd = new Date(element.publishtime);
        element.publishtime = this.getDateDiff(readd);
      });
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }

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
      dateDif = 'Will be released in ';
    } else {
      temp = min;
    }

    const y = Math.floor(temp / 31556952);
    if (y <= 0) {
      const mon = Math.floor(temp / 2629746);

      if (mon <= 0) {
        const d = Math.floor(temp / 86400);
        if (d <= 0) {
          const hour = Math.floor(temp / 3600);
          if (hour <= 0) {
            const minute = Math.floor(temp / 60);
            if (minute <= 0) {
              const second = temp;
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
