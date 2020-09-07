import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

const createDetail = gql`
mutation create(
  $user: ID!,
  $prem: ID!,
  $endM: Int!,
  $endY: Int!,
  )
  {
    createPremiumDetail(input:{
    userid: $user,
    premiumid: $prem,
    endInMonth: $endM,
    endInYear: $endY,
  })
  {
    startdate, enddate
  }
}
`;
const getUserPremiumDetails = gql`
query checkUser($userid: ID!) {
  user(userid:$userid){
    premiumdetails{
      startdate,
      enddate,
      premiumid
    }
  }
}`;
@Injectable({
  providedIn: 'root'
})
export class PremiumdetailService {
  private premiumIdSource = new BehaviorSubject<string>(null);
  currPremiumId = this.premiumIdSource.asObservable();

  private allPremiumSource = new BehaviorSubject<any[]>(null);
  currAllPremium = this.allPremiumSource.asObservable();

  constructor(private apollo: Apollo) { }

  getAll(inputEmail: string) {
    console.log('asda');
    this.apollo.watchQuery<any>({
      query: getUserPremiumDetails,
      variables: {
        userid: inputEmail
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      this.changeAllPremium(data.user.premiumdetails);
  });
  }

  register(userid: string, premiumid: string, endm: number, endy: number) {
    console.log('ini userid', userid);
    console.log(premiumid);
    console.log(endm);
    console.log(endy);

    this.apollo.mutate({
      mutation: createDetail,
      variables: {
        user: userid,
        prem: premiumid,
        endM: endm,
        endY: endy,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      window.location.reload();
    }, (error) => {
        alert(error);
    });
  }

  changePremiumID(num: string) {
    this.premiumIdSource.next(num);
  }
  changeAllPremium(num: any[]) {
    this.allPremiumSource.next(num);
  }
}
