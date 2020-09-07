import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})

export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;
  @Input()stops: false;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  @Output() download = new EventEmitter<string>();
  @Input()userid: string;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {

    this.startUpload();
  }

  async startUpload() {

    const path = `${this.userid}/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();

    await this.stop();

    this.snapshot = this.task.snapshotChanges().pipe(

      tap(console.log),
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
        this.download.emit(this.downloadURL);
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  async stop() {
    if (this.stops) {
      this.task.cancel();
      console.log('MASUUKKKKKKK');
    }
  }


}
