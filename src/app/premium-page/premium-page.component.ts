import { query } from '@angular/animations';
import { SocialUser } from 'angularx-social-login';
import { PremiumdetailService } from './../premiumdetail.service';
import { UserServiceService } from './../user-service.service';
import { GetIpAddressService } from './../get-ip-address.service';
import { Apollo } from 'apollo-angular';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { Component, ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.scss']
})

export class PremiumPageComponent implements OnInit {
  user: SocialUser;
  premid: string;
  userid: string;
  check = 0;
  currUserLocID: string;
  premiumStat: boolean;
  constructor(private apollo: Apollo, private userService: UserServiceService,
              private loc: GetIpAddressService, private premium: PremiumdetailService) { }
  isMonthly: boolean;
  isYearly: boolean;
  details: any[];
  ngOnInit(): void {
    this.userService.currUser.subscribe(user => {
      this.user = user;
      this.checkForQuery(this.user, 1);
    });
    this.premium.currPremiumId.subscribe(premid => {
      this.premid = premid;
      this.checkForQuery(this.premid, 2);
    });
    this.userService.currUserID.subscribe(user => {
      this.userid = user;
      this.checkForQuery(this.userid, 3);
    });
    this.premium.currAllPremium.subscribe(user => {
      this.details = user;
      this.checkForQuery(this.details, 4);
    });
    // this.premid = '2';
  }

  getDateDiff(startDate: Date, endDate: Date): number {

    // let currentDate = new Date();

    return Math.floor(
      (Date.UTC(endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate()
      ) -
      Date.UTC(startDate.getFullYear(),
               startDate.getMonth(),
               startDate.getDate())
      ) / (1000 * 60));
  }

  checkForQuery(inp: any, inc: number) {
    if (inp != null) {
      this.check++;
      console.log('cek premium', inc, this.check);
    }
    if (this.check == 4) {
        this.query();
    }
    if (this.check == 5) {
      this.details = this.details.filter(function (value, index, arr) {
        return value.premiumid === '2';
      });
      this.details.forEach(element => {
          let read = new Date(element.startdate);
          element.startdate = read;
          let readd = new Date(element.enddate);
          element.enddate = readd;
          if(this.getDateDiff(element.startdate, element.enddate) > 45900){
            element.price = 'Rp 690.000';
          }
          else {
            element.price = 'Rp 69.000';
          }
      });
    }
  }

  query() {
    //ini get data premium detail, history, dll
    this.premium.getAll(this.user.email);
  }

  clickMonthly() {
    if (this.isYearly) {
      this.isYearly = false;
    }
    this.isMonthly = true;
    console.log('asd');
  }

  clickYearly() {
    if (this.isMonthly) {
      this.isMonthly = false;
    }
    this.isYearly = true;
  }

  clickRegister() {
    if (!this.isMonthly && !this.isYearly) {
      alert('Select monthly or yearly package!');
    }
    else if (this.check <= 3){
      alert('Please Register or Log in First!');
    }
    else {
      if (this.isMonthly) {
        this.premium.register(this.userid, '2', 1, 0);
      }
      else if (this.isYearly) {
        this.premium.register(this.userid, '2', 0, 1);
      }
    }
  }
}
