import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private PlaylistSource = new BehaviorSubject<any[]>(null);
  currPlaylist = this.PlaylistSource.asObservable();

  constructor(private apollo: Apollo) { }
  changePlaylist(item: any[]) {
    this.PlaylistSource.next(item);
  }
}
