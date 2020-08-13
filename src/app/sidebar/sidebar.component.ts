import gql from 'graphql-tag';
import { UserServiceService } from './../user-service.service';
import { Subscription } from 'rxjs';
import { GetIpAddressService } from './../get-ip-address.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Apollo } from 'apollo-angular';

const getAll = gql`
query categories{
  categories{
    categoryid,
    categoryname
  }
}`;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  categories: any[];

  modalVisible = false;
  user: SocialUser;
  toggleMenu = false;

  constructor(private ip: GetIpAddressService, private userService: UserServiceService,
              private apollo: Apollo) { }

  ngOnInit(): void {
    // this.getCategories();
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

  getCategories() {
    this.apollo.watchQuery<any>({
      query: getAll
    }).valueChanges.subscribe(({ data }) => {
      this.categories = data.categories;
      console.log('got data', this.categories);
    }, (error) => {
      console.log(error);
    });
  }

}
