import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetIpAddressService {

  constructor(private http: HttpClient) { }
  public getIPAddress ()
  {
    return this.http.get('http://api.ipify.org/?format=json');


    // return this.http.get ('https://ipinfo.io', function(response) {
        //   console.log(response.city, response.country);
        // }, 'jsonp')

    // return this.http.get('https://ipinfo.io', function(response) {
    //   console.log(response.city, response.country);
    // });
  }
}
