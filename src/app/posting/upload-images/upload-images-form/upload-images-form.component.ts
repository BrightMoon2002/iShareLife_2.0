import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-images-form',
  templateUrl: './upload-images-form.component.html',
  styleUrls: ['./upload-images-form.component.scss']
})
export class UploadImagesFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadImages($event: string) {
    console.log('hekl');
  }
}
