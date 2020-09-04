import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  @Input() comments: any;
  count: number;
  constructor() { }

  ngOnInit(): void {
    this.count = this.comments.length;
    console.log('komen gann ',this.comments);
  }

}
