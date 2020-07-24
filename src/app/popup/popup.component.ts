import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() isVisible = true;
  @Input() isQuestion = false;
  @Output() setVisible = new EventEmitter<boolean>();
  @Output() setConfirmed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.setConfirmed.emit(true);
    close();
  }
  close(): void {
    this.isVisible = !this.isVisible;
    this.isQuestion = !this.isQuestion;
    this.setVisible.emit(this.isVisible);
  }
}
