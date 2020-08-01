import { TogglePopupService } from './../toggle-popup.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-register',
  templateUrl: './google-register.component.html',
  styleUrls: ['./google-register.component.scss']
})


export class GoogleRegisterComponent implements OnInit {

  isVisible: boolean;
  user: SocialUser;
  age: number;
  pwd: string;

  constructor(private userService: UserServiceService, private authService: SocialAuthService, public afAuth: AngularFireAuth,
              private popup: TogglePopupService ) { }

  ngOnInit(): void {
    this.userService.currUser.subscribe(user => this.user = user);
    // this.popup.currVisibility.subscribe(isVisible => this.isVisible = isVisible);
  }
  close(): void {
    this.popup.changeVisibility(false);
  }

  signInWithGoogle(): void {
    if (!this.userService.signInWithGoogle()) {
      console.log('Sign in failed');
    }

    this.close();
  }
}
