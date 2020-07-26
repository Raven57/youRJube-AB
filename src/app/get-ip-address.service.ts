import { Observable } from 'rxjs';
import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { StringValueNode } from 'graphql';
import { AnonymousSubject } from 'rxjs/internal/Subject';
const IPinfoWrapper = require('node-ipinfo');

const createLoc = gql`
mutation createNewLocation($location: String!) {
  createLocation(input:{
    locationname:$location})
  {
    locationname
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GetIpAddressService {
  wrapper = new IPinfoWrapper('33f1075c7dba4c');

  ip: String;
  country: String;
  info: any;

  constructor(private http: HttpClient, private apollo: Apollo) { }
  public getIPAddress () {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  public getCountry()
  {
    // this.getIPAddress().subscribe((res: any) => {
    //   // this.ipAddress = res.ip;
    //   console.log(res.country);

    //   this.wrapper.lookupIp(res.ip).then((response: any) => {
    //     console.log(response.country);
    //     this.insertLocToDb(response.country);
    //     console.log('asdsadsada');
    //     // this.country = response.country;
    // });
    // });
    this.checkCountry().subscribe((res: any) => {
      console.log(res.ip);
      console.log(res.country);
      this.insertLocToDb(res.country);
    });

  }


  public checkCountry() {
    return this.http.get('https://ipinfo.io/?token=33f1075c7dba4c');
  }

  insertLocToDb(country : String) {
    this.apollo.mutate({
      mutation: createLoc,
      variables: {
        location: country}
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
}
