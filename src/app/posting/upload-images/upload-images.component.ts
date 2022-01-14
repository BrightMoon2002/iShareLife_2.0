import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  selectedFile: File[];
  ref: AngularFireStorageReference;
  downloadUrl: string;
  checkUpLoadFile = false;
  myMap = new Map();
  @Output()
  giveUrlToCreate = new EventEmitter<string>();
  images: Array<string> = [];
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  onFileChange($event) {
    this.selectedFile = $event.target.files;
    this.onUpload();
  }

  onUpload() {
    this.checkUpLoadFile = true;
    const  id = Math.random().toString(36).substring(2); // tạo ra 1 cái ten random trên firebase
    this.ref = this.afStorage.ref(id);
    // this.ref.put(this.selectedFile)
    for (let i = 0; i < this.selectedFile.length; i++) {
      this.ref.put(this.selectedFile[i]).then(snapshot => { // trả về 1 chuỗi siêu văn bản
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        this.checkUpLoadFile = false;
        this.downloadUrl = downloadURL;
        this.giveUrlToCreate.emit(this.downloadUrl);
        this.images.push(downloadURL);
        console.log(this.images);
      })
        .catch(error => {
          console.log(`Failed to upload avatar! ${error}`);
        });
    }

  }
}
