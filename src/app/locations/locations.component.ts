import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { GetIpAddressService } from './../get-ip-address.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() changeVisible = new EventEmitter<boolean>();
  user: SocialUser;
  locations: any[];
  constructor(private loc: GetIpAddressService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.loc.currAllLoc.subscribe(loc => {
      this.locations = loc;
    });
    this.userService.currUser.subscribe(u => this.user = u);
  }
  chgLoc(str: string) {
    this.loc.changeLoc(str);
  }
  chgLocID(str: string) {
    this.loc.changeLocID(str);
    this.userService.update(this.user, '', '', '', '', '', str, '', 0, '');
  }
  close() {
    this.changeVisible.emit(false);
  }

}
