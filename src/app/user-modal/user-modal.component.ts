import { auth } from 'firebase/app';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() setVisible = new EventEmitter<boolean>();
  user: SocialUser;
  users = [];


  constructor(private userService: UserServiceService,private authService: SocialAuthService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.userService.currUser.subscribe(user => this.user = user);
  }
  close(): void {
    this.isVisible = !this.isVisible;
    this.setVisible.emit(this.isVisible);
  }

  signInWithGoogle(): SocialUser {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userService.addToLocalStorage(user);
      this.userService.insertUserToDb(user);
      this.userService.changeUser(user);
      console.log(user);
    });
    this.close();
    return this.user;
  }


  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
  }
}
