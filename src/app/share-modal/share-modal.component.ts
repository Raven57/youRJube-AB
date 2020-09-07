import { Router } from '@angular/router';
import { TogglePopupService } from './../toggle-popup.service';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {
  constructor(private router: Router) { }
  @Input() isVisible: boolean;
  @Output() changeVisible = new EventEmitter<boolean>();
  url: string;
  ngOnInit(): void {
    // this.userService.checkUser();
    this.url = this.router.url;
  }
  close(): void {
    this.changeVisible.emit(false);
  }
  copy() {
    return 'https://tpa-webab.web.app' + this.url;
  }
}
