import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialLoginModule } from 'angularx-social-login';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

const createUser = gql`
mutation createNewUser($email: String!, $name: String!, $profile:String!) {
  createUser(input:{
    useremail:$email,
    username:$name,
    profileimgaddr:$profile})
  {
    userid
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user: SocialUser;
  users = [];
  public loggedIn;
  loading: boolean;
  error: any;
  LoadedUser: any;

  private userSource = new BehaviorSubject<SocialUser>(null);
  currUser = this.userSource.asObservable();

  constructor(private apollo: Apollo, private authService: SocialAuthService, afAuth: AngularFireAuth) { }

  insertUserToDb(data: any) {
    this.apollo.mutate({
      mutation: createUser,
      variables: {
        email:
          data.email
        ,
        name:
          data.firstName
        ,
        profile:
          data.photoUrl
      }
      // refetchQueries: [{
      //   query: gql`
      //   query getUsers{
      //     users {
      //       username
      //     }
      //   }
      //   `,
      //   variables: { repoFullName: 'apollographql/apollo-client' },
      // }],
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
    });
  }

  changeUser(user: SocialUser) {
    this.userSource.next(user);
  }

  checkUser(): boolean {
    if (localStorage.getItem('users') == null){
      this.users = [];
      return false;
    }
    else{
      this.getUserFromStorage();
      return true;
    }
  }
  // signInWithGoogle(): SocialUser {
  //   this.authService.initState.subscribe(() => { }, console.error, () => { console.log('all providers are ready'); });
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.addToLocalStorage(user);
  //     this.insertUserToDb(user);
  //   });
  //   return this.user;

  //   // this.user = new SocialUser();
  //   // this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  //   //   .then((result) => {
  //   //     console.log(result.user);
  //   //     console.log('You have been successfully logged in!');
  //   //     this.user.firstName = result.user.displayName;
  //   //     this.user.email = result.user.email;
  //   //     this.user.photoUrl = result.user.photoURL;
  //   //     this.userService.addToLocalStorage(this.user);
  //   //     this.userService.insertUserToDb(this.user);
  //   //     console.log('Success add to DB!');
  //   //   }).catch((error) => {
  //   //     console.log(error);
  //   //   });
  //   // return this.user;
  // }


  addToLocalStorage(user): void{
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUserFromStorage(): void{
    this.users = JSON.parse(localStorage.getItem('users'));
    this.user = this.users[0];
    this.changeUser(this.user);
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

}
