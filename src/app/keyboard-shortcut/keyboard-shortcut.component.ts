import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard-shortcut',
  templateUrl: './keyboard-shortcut.component.html',
  styleUrls: ['./keyboard-shortcut.component.scss']
})
export class KeyboardShortcutComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() changeVisible = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.changeVisible.emit(false);
  }

}
