import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { StringValueNode } from 'graphql';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { query } from '@angular/animations';
const IPinfoWrapper = require('node-ipinfo');

const createLoc = gql`
mutation createNewLocation($location: String!) {
  createLocation(input:{
    locationname:$location})
  { locationid,
    locationname
  }
}`;

const getLoc = gql`
query getAllCountry{
  locations{
    locationid,
    locationname
  }
}`;

const getCurrLoc = gql`
query getCurrLoc($name: String!){
  location(name:$name){
    locationid,
    locationname
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class GetIpAddressService {
  wrapper = new IPinfoWrapper('33f1075c7dba4c');

  currCountry: string;
  ip: string;
  country: string;
  info: any;
  loading: any;
  countries: any[];
  locstatus = 0;

  constructor(private http: HttpClient, private apollo: Apollo) { }

  private locIDSource = new BehaviorSubject<string>(null);
  currLocID = this.locIDSource.asObservable();

  private locSource = new BehaviorSubject<string>(null);
  currLoc = this.locSource.asObservable();

  public getIPAddress () {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  changeLocID(input: string) {
    this.locIDSource.next(input);
  }

  changeLoc(input: string) {
    this.locSource.next(input);
  }
  getCurrLoc(input: string) {
    this.apollo.watchQuery<any>({
      query: getCurrLoc,
      variables: {
        name: input
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      this.changeLocID(data.location.locationid);
    });
    if (this.currLocID != null) {
      this.locstatus = 1;
    } else {
      this.locstatus = 0;
    }
  }

  public getCountry()
  {
    this.checkCountry().subscribe((res: any) => {
      console.log(res.ip);
      console.log(res.country);
      this.country = res.country;
      this.insertLocToDb(res.country);
    });
    if (this.locstatus == 0) {
    }
    this.getAllLocation();
  }


  public checkCountry() {
    return this.http.get('https://ipinfo.io/?token=33f1075c7dba4c');
  }

  getAllLocation(){
    this.apollo.watchQuery<any>({ query: getLoc }).valueChanges.
      subscribe(({data, loading}) => {
      this.countries = data.locations;
      this.loading = loading;
    });
  }

  insertLocToDb(country : String) {
    this.apollo.mutate<any>({
      mutation: createLoc,
      variables: {
        location: country}
    }).subscribe(({ data }) => {
      console.log('got data', data);
      if (data.createLocation.locationid == "") {
        this.getCurrLoc(this.country);
        console.log('masuk    if');
      }
      else {
        this.changeLocID(data.createLocation.locationid);

        console.log(data.createLocation.locationid);
      }
    }, (error) => {
      console.log(error);
    });
  }

}
