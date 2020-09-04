import { TogglePopupService } from './../toggle-popup.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-switch-user-modal',
  templateUrl: './switch-user-modal.component.html',
  styleUrls: ['./switch-user-modal.component.scss']
})
export class SwitchUserModalComponent implements OnInit {

  constructor(private userService: UserServiceService, private popup: TogglePopupService) { }
  isVisible: boolean;

  user: SocialUser;
  email: string;
  pw: string;
  ngOnInit(): void {
    // this.userService.checkUser();
    this.userService.currUser.subscribe(user => this.user = user);
    this.popup.currVisibility.subscribe(isVisible => this.isVisible = isVisible);
  }
  close(): void {
    this.popup.changeVisibility(false);
  }

  signOut(){
    this.userService.signOut();
    window.location.reload();
  }

  reSignin(){
    this.signOut();
    //SIGN IN
    this.userService.userLogin(this.user, this.pw);
  }
  signInWithGoogle(){
    this.signOut();
    //signinwithgoogle
    this.user = this.userService.signInWithGoogle();
  }

  manageAccount(){

  }
}
