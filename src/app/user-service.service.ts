import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

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

  constructor(private apollo: Apollo, private authService: SocialAuthService) { }

  insertUserToDb(data: any) {
    this.apollo.mutate({
      mutation: createUser,
      variables: {
        email:
          // data.email
        "asd@@aasdsada.com"
        ,
        name:
        "tampan"
          // data.firstName + ' ' + this.user.lastName
        ,
        profile:
        "asdd"
          // data.photoUrl
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

  addToLocalStorage(user): void{
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log(user);
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

}
