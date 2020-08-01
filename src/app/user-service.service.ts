import { TogglePopupService } from './toggle-popup.service';
import { RestrictionServiceService } from './restriction-service.service';
import { GetIpAddressService } from './get-ip-address.service';
import { Moment } from 'moment';
import { PremiumdetailService } from './premiumdetail.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialLoginModule } from 'angularx-social-login';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { analytics, auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

const createUser = gql`
mutation createNewUser(
  $email: String!,
  $name: String!,
  $profile: String!,
  $pwd: String!,
  $age: Int!,
  $locid: String!)
  {
  createUser(input:{
    useremail: $email,
    username: $name,
    profileimgaddr: $profile,
    password: $pwd,
    age: $age,
    locationid: $locid,
  })
  {
    authToken{
      accessToken
    }
  }
}
`;

const checkUser = gql`
query checkUser($userid: ID!) {
  user(userid:$userid){
    username
  }
}`
  ;
const getUserid = gql`
query checkUser($userid: ID!) {
  user(userid:$userid){
    userid
  }
}`;

const login = gql`
mutation login(
  $email: String!,
  $pwd: String!,)
  {
  userLogin(input:{
    useremail: $email,
    password: $pwd,
  })
  {
    authToken{
      accessToken
    }
    user{
      userid,
      username,
      useremail,
      profileimgaddr,
      location{
        locationid,
        locationname
      }
      restriction{
        restrictionid,
      }
      premiumdetail{
        premiumtype{
          premiumid,
        }
      }
    }
  }
}
`;
const currDate = new Date();
const currDatePlusAYear = new Date(currDate.getFullYear() + 1 , currDate.getMonth(), currDate.getDate());
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user: SocialUser;
  users;
  loading: boolean;
  error: any;
  LoadedUser: any;
  userFromDB: any;
  haveUserFromDB = 0;
  currUserid: string;

  private userSource = new BehaviorSubject<SocialUser>(null);
  currUser = this.userSource.asObservable();

  private userFromDBSource = new BehaviorSubject<number>(0);
  currUserInDB = this.userFromDBSource.asObservable();

  private userIDSource = new BehaviorSubject<string>(null);
  currUserID = this.userIDSource.asObservable();

  constructor(private apollo: Apollo, private authService: SocialAuthService, afAuth: AngularFireAuth,
              private premiumDetail: PremiumdetailService, private ip: GetIpAddressService, private restriction: RestrictionServiceService,
              private popup: TogglePopupService
              ) { }

  register(user: SocialUser, pawd: string, aage: number, loc: string) {
    console.log(user);
    console.log(pawd);
    console.log(aage);
    console.log(loc);

    this.apollo.mutate<any>({
      mutation: createUser,
      variables: {
        email: user.email,
        name: user.name,
        profile: user.photoUrl,
        pwd: pawd,
        age: aage,
        locid: loc
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.insertPremiumDetail(user.email);
      // this.addTokenToLocalStorage(data.createUser.authToken.accessToken);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }

  userLogin(user: SocialUser, pawd: string) {
    console.log(user);
    console.log(pawd);

    this.apollo.mutate<any>({
      mutation: login,
      variables: {
        email: user.email,
        pwd: pawd
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.user = new SocialUser();
      this.premiumDetail.changePremiumID(data.userLogin.user.premiumdetail.premiumtype.premiumid);
      this.user.email = data.userLogin.user.useremail;
      this.user.name = data.userLogin.user.username;
      this.user.photoUrl = data.userLogin.user.profileimgaddr;
      this.ip.changeLocID(data.userLogin.user.location.locationid);
      this.ip.changeLoc(data.userLogin.user.location.locationname);
      this.restriction.changeRestriction(data.userLogin.user.restriction.restrictionid);
      this.changeUser(this.user);
      this.changeUserID(data.userLogin.user.userid);
      this.popup.changeVisibility(false);
      this.addToLocalStorage(this.user);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }

  changeUser(user: SocialUser) {
    this.userSource.next(user);
  }
  changeUserID(string: string) {
    this.userIDSource.next(string);
  }
  changeUserStatInDB(int: number) {
    this.userFromDBSource.next(int);
  }

  insertPremiumDetail(inputEmail: string) {
    this.apollo.watchQuery<any>({
      query: getUserid,
      variables: {
        userid: inputEmail
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      this.changeUserID(data.user.userid);
      this.currUserid = data.user.userid;
      console.log(data);
      console.log('INI USERID GET  USERR FROM DB', this.currUserid);
      this.premiumDetail.register(this.currUserid, '1', 0, 10);
      this.addToLocalStorage(this.user);
      this.changeUser(this.user);
      return;
  });
  }


  getUserid(email: string){
    this.apollo.watchQuery<any>({
      query: getUserid,
      variables: {
        userid: email
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      this.changeUserID(data.user.userid);
      this.currUserid = data.user.userid;
      console.log(data);
      console.log('INI USERID GET  USERR FROM DB', this.currUserid);
      this.changeUser(this.user);
      return;
  });

  }

  checkUserFromDB(input: String) {
    this.apollo.watchQuery({
      query: checkUser,
      variables: {
        userid: input
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      //login ntr di sini

      this.changeUserStatInDB(1);
      return;
  });
    this.changeUserStatInDB(2);
  }

  checkUser(): void {
    if (localStorage.getItem('users') == null){
      this.users = [];
    }
    else{
      this.getUserFromStorage();
    }
  }

  signInWithGoogle(): SocialUser {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.checkUserFromDB(user.email);
      this.user = user;
      if (!this.haveUserFromDB) {
        console.log('masuuk');
      }
    });
    return this.user;
  }

  addToLocalStorage(user): void{
    if (user == null) {
      return;
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log(localStorage.getItem('users'));
  }

  addTokenToLocalStorage(token: string): void{
    if (token == null) {
      return;
    }
    localStorage.setItem('token', JSON.stringify(token));
  }

  getUserFromStorage(): void{
    this.users = JSON.parse(localStorage.getItem('users'));
    this.user = this.users[0];
    this.changeUser(this.user);
    this.getUserid(this.user.email);
  }
  removeUser(): void{
    window.localStorage.clear();
  }
  signOut(): void {
    this.user = null;
    this.removeUser();
    this.changeUser(null);
    this.authService.signOut(true);
    sessionStorage.clear();
    window.location.reload();
  }

}
