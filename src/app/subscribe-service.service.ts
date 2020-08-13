import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
const checkSubscribe = gql`
query checkSub($user:ID!,
  $channel:ID!){
  checkSubscribe(input:{userid:$user, channelid:$channel}){
    userid,channelid,notification
  }
}
`;
const subscribe = gql`
mutation subscribe($user:ID!,
  $channel:ID!){
  subscribe(input:{userid:$user,channelid:$channel})
}
`;
const unsubscribe = gql`
mutation subscribe($user:ID!,
  $channel:ID!){
  unsubscribe(input:{userid:$user,channelid:$channel})
}
`;
const updateNotif = gql`
mutation subscribe($user:ID!,
  $channel:ID!,
  $notifid: Boolean){
    UpdateNotification(input:{userid:$user,channelid:$channel,notif:$notifid})
}
`;

@Injectable({
  providedIn: 'root'
})
export class SubscribeServiceService {

  constructor(private apollo: Apollo) { }

  checkSub(userid: string, channelid: string): any {
    this.apollo.watchQuery<any>({
      query: checkSubscribe,
      variables: {
        user: userid,
        channel: channelid
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      console.log(data.checkSubscribe);
      return data.checkSubscribe;
  });
  }
  unsubscribe(userid: string, channelid: string): void {
    this.apollo.mutate<any>({
      mutation: unsubscribe,
      variables: {
        user: userid,
        channel: channelid
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      if (data.unsubscribe) {
        alert('Success Unsubscribe!');
        window.location.reload();
      } else {
        alert('Failed!');
      }
    });
  }
  subscribe(userid: string, channelid: string): void {
    let success: boolean;
    this.apollo.mutate<any>({
      mutation: subscribe,
      variables: {
        user: userid,
        channel: channelid
      }
    }).subscribe(({ data, errors }) => {
      console.log(data);
      success = data.subscribe;
      if (success) {
        alert('Success Subscribe!');
        window.location.reload();
      } else {
        alert('Failed!');
      }
    });
  }
  updateNotif(userid: string, channelid: string, notifi: boolean) {
    this.apollo.mutate<any>({
      mutation: updateNotif,
      variables: {
        user: userid,
        channel: channelid,
        notifid: notifi
      }
    }).subscribe(({ data, errors }) => {
      if (data != null) {
        alert('Success Upate Notification!');
        window.location.reload();
      } else {
        alert('Failed!');
      }
    });
  }
}
