import { BehaviorSubject } from 'rxjs';
import { RestrictionServiceService } from './../restriction-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restrictions',
  templateUrl: './restrictions.component.html',
  styleUrls: ['./restrictions.component.scss']
})
export class RestrictionsComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() changeVisible = new EventEmitter<boolean>();

  constructor(private restriction: RestrictionServiceService
  ) { }

  restrictionID = '';
  rest: boolean;
  ngOnInit(): void {
    this.restriction.currRestriction.subscribe(restrictionID =>
      this.rest = restrictionID);
    // }
    // console.log(this.restrictionID);
  }


  changeRestriction() {
    if (this.rest) {
      this.restriction.changeRestriction('1');
    }
    else {
      this.restriction.changeRestriction('2');
    }
  }

  close() {
    this.changeVisible.emit(false);
  }

}
