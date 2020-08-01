import { UserServiceService } from './../user-service.service';
import { Subscription } from 'rxjs';
import { GetIpAddressService } from './../get-ip-address.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  private querySubscription: Subscription;

  modalVisible = false;
  user: SocialUser;
  toggleMenu = false;

  constructor( private ip: GetIpAddressService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.ip.getCountry();
    // this.userService.checkUser();
    this.userService.currUser.subscribe(user => this.user = user);
  }
  toggleModal(bool: boolean) {
    this.modalVisible = bool;
  }
  toggleFunc(bool: boolean): void {
    this.toggleMenu = bool;
  }

}
