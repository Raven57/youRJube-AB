import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestrictionServiceService {

  restrictioncategory = '';
  private restrictionIDSource = new BehaviorSubject<string>(null);
  currRestrictionID = this.restrictionIDSource.asObservable();

  private restrictionSource = new BehaviorSubject<boolean>(null);
  currRestriction = this.restrictionSource.asObservable();

  constructor() { }
  changeRestriction(input: string) {
    this.restrictionIDSource.next(input);
    if (input === '2') {
      this.changeRestrictionName(true);
    }
    else {
      this.changeRestrictionName(false);
    }
  }

  changeRestrictionName(bool: boolean) {
    this.restrictionSource.next(bool);
  }

}
