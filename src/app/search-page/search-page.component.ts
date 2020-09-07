import { PremiumdetailService } from './../premiumdetail.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const q = gql`
query search($keyword:String!,$item: String, $date:String,$prem:String) {
  search(input:{keyword:$keyword,date:$date,item:$item,premiumid:$prem}){
    videos{
      videoid, videodescription,thumbnailsource,length,userid,typeid,restrictionid,viewcount,
      videotitle,publishtime, user{
        username
      }
    },
    channels{
      user{username, userid,profileimgaddr,channeldetail},
      count,
      videoCount
    },
    playlists{
      playlists{
        playlistid, playlisttitle, thumbnailsource,user{
          username
        }, playlistdescription
      }
      videocount
    }
  }
}
`;
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  premid: string;

  constructor(private route: ActivatedRoute, private apollo: Apollo, private premium: PremiumdetailService) { }
  playlists: any[];
  videos: any[];
  channels: any[];
  filterweek = false;
  filtermonth = false;
  filteryear = false;
  filtervideo = false;
  filterplaylist = false;
  filterchannel = false;
  filterdate = '';
  filteritem = '';
  key = '';
  ngOnInit(): void {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }

    this.route.paramMap.subscribe(params => {
      this.key = params.get('keyword');
      // if (this.key != null) {
      // }
      this.premium.currPremiumId.subscribe(p => {
        this.premid = p;
        this.query();
      });
    });
  }

  query() {
    console.log(this.key);
    console.log(this.filteritem);
    console.log(this.filterdate);
    this.apollo.query<any>({
      query: q,
      variables: {
        keyword: this.key,
        item:this.filteritem,
        prem: this.premid          ,
        date:this.filterdate ,
      }
    }).subscribe(({ data }) => {
      console.log('got data ', data);
      this.videos = data.search.videos;
      this.playlists = data.search.playlists;
      this.channels = data.search.channels;
    }, (error) => {
      console.log(error);
    });
  }
  filterDate(str: string) {
    this.filterdate = str;
    switch (str){
      case 'week':
        if (this.filterweek) {
          this.filterdate = '';
        }
        this.filterweek = !this.filterweek;
        if (this.filtermonth) {
          this.filtermonth = !this.filtermonth;
        }
        if (this.filteryear) {
          this.filteryear = !this.filteryear;
        }
        this.query();
        break;
      case 'month':
        if (this.filtermonth) {
          this.filterdate = '';
        }
        this.filtermonth = !this.filtermonth;
        if (this.filterweek) {
          this.filterweek = !this.filterweek;
        }
        if (this.filteryear) {
          this.filteryear = !this.filteryear;
        }
        this.query();
        break;
      case 'year':
        if (this.filteryear) {
          this.filterdate = '';
        }
        this.filteryear = !this.filteryear;
        if (this.filterweek) {
              this.filterweek = !this.filterweek;
            }
        if (this.filtermonth) {
              this.filtermonth = !this.filtermonth;
        }
        this.query();
        break;
    }
  }
  filterType(str: string) {
    this.filteritem = str;
    switch (str){
      case 'channel':
        if (this.filterchannel) {
          this.filteritem = '';
        }
        this.filterchannel = !this.filterchannel;
        if (this.filtervideo) {
            this.filtervideo = !this.filtervideo;
          }
        if (this.filterplaylist) {
            this.filterplaylist = !this.filtermonth;
        }
        this.query();
        break;
      case 'video':
        if (this.filtervideo) {
          this.filteritem = '';
        }
        this.filtervideo = !this.filtervideo;
        if (this.filterplaylist) {
            this.filterplaylist = !this.filterplaylist;
          }
        if (this.filterchannel) {
            this.filterchannel = !this.filterchannel;
        }
        this.query();
        break;
      case 'playlist':
        if (this.filterplaylist) {
          this.filteritem = '';
        }
        this.filterplaylist = !this.filterplaylist;
        if (this.filtervideo) {
            this.filtervideo = !this.filtervideo;
          }
        if (this.filterchannel) {
            this.filterchannel = !this.filterchannel;
        }
        this.query();
        break;
    }
  }
}
