import { PlaylistService } from './../playlist.service';
import { SubscribeServiceService } from './../subscribe-service.service';
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
const getSubscribed = gql`
query subbed($userid: ID!){
  getUserSubscribedto(userid:$userid){
    channel{
      userid,
      profileimgaddr,
      username
    }
  }
}
`;
const getPlaylist = gql`
query playlists($userid: ID!){
  getUserPlaylist(userid:$userid){
    playlisttitle
  }
}
`;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  categories: any[];
  subscribed: any[];
  playlists: any[];
  modalVisible = false;
  user: SocialUser;
  toggleMenu = false;
  userid: string;

  constructor(private ip: GetIpAddressService, private userService: UserServiceService, private playlist: PlaylistService,
              private apollo: Apollo, private sub: SubscribeServiceService) { }

  ngOnInit(): void {
    this.userService.currUserID.subscribe(user => {
      this.userid = user;
      if (this.userid != null) {
        console.log('masuk query');
        this.getPlaylists();
        this.getSubscribed();
      }
    });
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
  getSubscribed() {
    this.apollo.watchQuery<any>({
      query: getSubscribed,
      variables: {
        userid: this.userid
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('got data ', data);
      this.sub.changeSubscribedTo(data.getUserSubscribedto);
      this.sub.currSubscribedTo.subscribe(subbed => this.subscribed = subbed);
      console.log('asdsaasd', this.subscribed);
    }, (error) => {
      console.log(error);
    });
  }
  getPlaylists() {
    this.apollo.watchQuery<any>({
      query: getPlaylist,
      variables: {
        userid: this.userid
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('got data  ', data);
      this.playlist.changePlaylist(data.getUserPlaylist);
      this.playlist.currPlaylist.subscribe(p => this.playlists = p);
      console.log('asdsaasd', this.playlists);
    }, (error) => {
      console.log(error);
    });
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
