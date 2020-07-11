import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

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

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('users') == null){
      this.users = [];
    }
    else{
      this.getUserFromStorage();
    }
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
