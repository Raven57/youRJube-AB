import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit {

  isHovering: boolean;
  files: File;
  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(dropped: File): void  {

    if (dropped != null) {
      console.log('asdsadasda');
      if (!this.validateFile(dropped[0].name)) {
        console.log('Selected file format is not supported');
      }
      else {
        console.log('masuk else');
        // this.files
        this.files = dropped[0];
        // return true;
      }
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  validateFile(name: string): boolean {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'mp4') {
        return true;
    }
    else if (ext.toLowerCase() == 'flv') {
      return true;
    }
    else if (ext.toLowerCase() == 'm3u8') {
      return true;
    }
    else if (ext.toLowerCase() == 'ts') {
      return true;
    }
    else if (ext.toLowerCase() == '3gp') {
      return true;
    }
    else if (ext.toLowerCase() == 'mov') {
      return true;
    }
    else if (ext.toLowerCase() == 'avi') {
      return true;
    }
    else if (ext.toLowerCase() == 'wmv') {
      return true;
    }
    else if (ext.toLowerCase() == 'mkv') {
      return true;
    }
    else {
        return false;
    }
}
}
