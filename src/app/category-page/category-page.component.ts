import { PremiumdetailService } from './../premiumdetail.service';
import { RestrictionServiceService } from './../restriction-service.service';
import { GetIpAddressService } from './../get-ip-address.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      allTime{
        videoid,
        videotitle,
        publishtime,
        thumbnailsource,
        viewcount,
        length,
        typeid,
        user{
        userid,
        profileimgaddr,
        username,
      }},
      month{
        videoid,
        videotitle,
        publishtime,
        thumbnailsource,
        viewcount,
        length,
        typeid,
        user{
        userid
        profileimgaddr,
        username,
      }},
      week{
        videoid,
        videotitle,
        publishtime,
        thumbnailsource,
        viewcount,
        length,
        typeid,
        user{
          userid,
        profileimgaddr,
        username,
      }},
      recent{videoid,
        videotitle,
        publishtime,
        thumbnailsource,
        viewcount,
        length,
        typeid,
        user{
          userid
        profileimgaddr,
        username,
      }}
  }
}`;
const cats = ['', 'Music', 'Sport', 'Gaming', 'Entertainment', 'News', 'Travel'];
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  locid: string;
  premid: string;
  restid: string;
  check = 0;


  constructor(private route: ActivatedRoute, private loc: GetIpAddressService, private apollo: Apollo,
              private restrict: RestrictionServiceService, private premium: PremiumdetailService
  ) { }
  // categories: any[];
  // loaded = false;
  alltime: any[];
  month: any[];
  week: any[];
  recent: any[];
  category = '';
  idx = 0;

  toggleAll = true;
  toggleMonth = false;
  toggleWeek = false;
  toggleRecent = false;
  ngOnInit(): void {
    this.loc.currLocID.subscribe(loc => {
      this.locid = loc;
      // this.checkForQuery(this.locid, 1, this.idx);
      this.query(this.idx);
    });
    this.premium.currPremiumId.subscribe(premid => {
      this.premid = premid;
      // this.checkForQuery(this.premid, 2, this.idx);
      // this.query(this.idx);
      this.query(this.idx);
    });
    this.restrict.currRestrictionID.subscribe(r => {
      this.restid = r;
      // this.checkForQuery(this.restid, 3, this.idx);
      this.query(this.idx);
    });
    this.route.paramMap.subscribe(params => {
      this.category = cats[+params.get('categoryid')];
      this.idx = +params.get('categoryid');
      // this.checkForQuery(this.idx, 4, this.idx);
      this.query(this.idx);
    });
  }

  checkForQuery(inp: any, inc: number, idx: number) {
    if (inp != null) {
      this.check++;
      console.log('cek cat ', inc, this.check);
    }
    if (this.check >= 4) {
      this.query(idx);
        // this.homeQuery();
      }
  }
  query(cate: number): void {
    console.log('locCAT ', this.locid);
    console.log('premCAT ', this.premid);
    console.log('RestCAT ', this.restid);
    console.log('CAT ', cate);

    this.apollo.watchQuery<any>({
      query: homeQuery,
      variables: {
        cat: cate,
        loc: this.locid,
        type: this.premid,
        restr: this.restid,
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('dataa ', data);
      this.alltime = data.categoryvideos.allTime;
      this.alltime = this.checkType(this.alltime);
      this.month = data.categoryvideos.month;
      this.month = this.checkType(this.month);
      this.recent = data.categoryvideos.recent;
      this.recent = this.checkType(this.recent);
      this.week = data.categoryvideos.week;
      this.week = this.checkType(this.week);


    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  // toggleAccordian(event, arr: any[]) {
  //   console.log('masuk');
  //   var element = event.target;
  //   element.classList.toggle("active");
  //   // if(arr[index].isActive) {
  //   //   arr[index].isActive = false;
  //   // } else {
  //   //   arr[index].isActive = true;
  //   // }
  //   var panel = element.nextElementSibling;
  //   if (panel.style.maxHeight) {
  //     panel.style.maxHeight = null;
  //   } else {
  //     panel.style.maxHeight = panel.scrollHeight + "px";
  //   }
  toggleAllFunc() {
    this.toggleAll = !this.toggleAll;
    if (this.toggleMonth) {
      this.toggleMonth = false;
    }
    if (this.toggleRecent) {
      this.toggleRecent = false;
    }
    if (this.toggleWeek) {
      this.toggleWeek = false;
    }
  }
  toggleMFunc() {
    this.toggleMonth = !this.toggleMonth;
    if (this.toggleAll) {
      this.toggleAll = false;
    }
    if (this.toggleRecent) {
      this.toggleRecent = false;
    }
    if (this.toggleWeek) {
      this.toggleWeek = false;
    }
  }
  toggleWFunc() {
    this.toggleWeek = !this.toggleWeek;
    if (this.toggleMonth) {
      this.toggleMonth = false;
    }
    if (this.toggleRecent) {
      this.toggleRecent = false;
    }
    if (this.toggleAll) {
      this.toggleAll = false;
    }
  }
  toggleRFunc() {
    this.toggleRecent = !this.toggleRecent;
    if (this.toggleMonth) {
      this.toggleMonth = false;
    }
    if (this.toggleAll) {
      this.toggleAll = false;
    }
    if (this.toggleWeek) {
      this.toggleWeek = false;
    }
  }
  checkType(input: any): any {
    if (this.premid == null || this.premid == '1') {
      input = input.filter(i => i.typeid !== '2');
    }
    return input;
  }

}
