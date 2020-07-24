import { UserServiceService } from './../user-service.service';
import { Subscription } from 'rxjs';
import { GetIpAddressService } from './../get-ip-address.service';
import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  private querySubscription: Subscription;

  user: SocialUser;
  users = [];

  toggleMenu = false;

  constructor( private ip: GetIpAddressService) { }

  ngOnInit(): void {
    this.ip.getCountry();


  }



  toggleFunc(bool: boolean): void {
    this.toggleMenu = bool;
  }

}
