import { SubscribeServiceService } from './../subscribe-service.service';
import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { Apollo } from 'apollo-angular';
import { Component, Input, OnInit } from '@angular/core';
import gql from 'graphql-tag';
const checkSubscribe = gql`
query checkSub($user:ID!,
  $channel:ID!){
  checkSubscribe(input:{userid:$user, channelid:$channel}){
    userid,channelid,notification
  }
}
`;
@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.scss']
})

export class ChannelItemComponent implements OnInit {
  @Input() icon: string;
  @Input() name: string;
  @Input() subscriber: string;
  @Input() videos: string;
  @Input() description: string;
  @Input() channelid: string;
  notif: boolean;
  subbed: boolean;
  @Input() ownChannel: boolean;
  userid: string;
  user: SocialUser;
  constructor(private apollo: Apollo, private userService: UserServiceService, private sub: SubscribeServiceService) { }

  ngOnInit(): void {
    this.userService.currUser.subscribe(user => {
      this.user = user;
    });
    this.userService.currUserID.subscribe(user => {
      this.userid = user;
      if (this.userid) {
        this.query();
      }
    });
  }
  subscribe() {
    if (this.userid == null) {
      alert('LOG IN TO SUBSCRIBE!');
    }
    this.sub.subscribe(this.userid, this.channelid);
  }
  unsubscribe() {
    this.sub.unsubscribe(this.userid, this.channelid);
  }
  notifOn(){
    this.sub.updateNotif(this.userid, this.channelid, true);
  }
  notifOff() {
    this.sub.updateNotif(this.userid, this.channelid, false);
  }

  query() {
    if (this.channelid === this.userid) {
      this.ownChannel = true;
    }
    else {
      this.ownChannel = false;
      this.apollo.watchQuery<any>({
        query: checkSubscribe,
        variables: {
          user: this.userid,
          channel: this.channelid
        }
      }).valueChanges.subscribe(({ data, loading, errors }) => {
        console.log('SUBSCRIBED', data.checkSubscribe);
        if (data != null) {
          this.subbed = data.checkSubscribe;
          this.notif = data.checkSubscribe.notification;
        }
    });
    }

  }
}
