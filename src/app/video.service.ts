import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos = [];
  constructor(
    private http: HttpClient
  ) { }
  getVideos() {
    return this.videos;
  }
}
