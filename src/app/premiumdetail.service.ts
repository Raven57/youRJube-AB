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

@Injectable({
  providedIn: 'root'
})
export class PremiumdetailService {
  private premiumIdSource = new BehaviorSubject<string>(null);
  currPremiumId = this.premiumIdSource.asObservable();

  constructor(private apollo: Apollo) { }
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
      alert('Now you can log in!');
      window.location.reload();
    }, (error) => {
        console.log('error', error);
    });
  }

  changePremiumID(num: string) {
    this.premiumIdSource.next(num);
  }
}
