import { GetIpAddressService } from './../get-ip-address.service';
import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// import { IPinfoWrapper} from 'node-ipinfo';
const IPinfoWrapper = require('node-ipinfo');

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})



export class SidebarComponent implements OnInit {

  users = [];
  user: SocialUser;
  loggedIn: boolean;
  toggleMenu = false;
  toggleSetting = false;
  toggleSearch = false;
  toggleUser = false;
  ipAddress: string;
  asdf = new IPinfoWrapper('33f1075c7dba4c');
  constructor(private authService: SocialAuthService, private ip: GetIpAddressService) { }

  ngOnInit(): void {
    this.getIP();
    if (localStorage.getItem('users') == null){
      this.users = [];
    }
    else{
      this.getUserFromStorage();
    }
  }

  getIP ()
  {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress);
      this.asdf.lookupIp(this.ipAddress).then((response: any) => {

        console.log(response.country); // Mountain View
    });
    });

  }
signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);

    this.addToLocalStorage(user);
  });
}
  addToLocalStorage(user): void{
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
getUserFromStorage(): void{
    this.users = JSON.parse(localStorage.getItem('users'));
    this.user = this.users[0];
    this.loggedIn = true;
  }
  removeUser(): void{
    window.localStorage.clear();
    this.loggedIn = false;
  }
  signOut(): void {
    this.removeUser();
    this.authService.signOut(true);
    sessionStorage.clear();
    window.location.reload();
  }
  toggleFunc(): void {
    this.toggleMenu = !this.toggleMenu;
  }
  toggleSettingFunc(): void {
    if (this.toggleUser) {
      this.toggleUser = !this.toggleUser;
    }
    this.toggleSetting = !this.toggleSetting;
  }
  toggleSearchFunc(): void {
    this.toggleSearch = !this.toggleSearch;
  }
  toggleUserFunc(): void {
    if (this.toggleSetting) {
    this.toggleSetting = !this.toggleSetting;
     }
    this.toggleUser = !this.toggleUser;
  }
}
