import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TogglePopupService {

  private visibilitySource = new BehaviorSubject<boolean>(false);
  currVisibility = this.visibilitySource.asObservable()

  constructor() { }


  changeVisibility(bool: boolean) {
    this.visibilitySource.next(bool);
  }

}
