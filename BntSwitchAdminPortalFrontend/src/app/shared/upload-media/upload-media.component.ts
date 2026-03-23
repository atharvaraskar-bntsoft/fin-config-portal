import { ElementRef, Output, ViewChild } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css'],
})
export class UploadMediaComponent implements OnInit {
  public uploader: FileUploader;
  response: string;
  @Output() selectedFile: EventEmitter<any> = new EventEmitter();
  @Input() multiSelectFile: boolean;
  @Input() allowedMimeType;
  @ViewChild('fileID', { static: false })
  myInputVariable: ElementRef;
  constructor(private _subscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: 'https://evening-anchorage-3159.herokuapp.com/api/',
      disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      additionalParameter: { id: 1 },
      formatDataFunctionIsAsync: true,
      allowedMimeType: this.allowedMimeType,
      formatDataFunction: async item => {
        return new Promise((resolve, reject) => {});
      },
    });

    this.response = '';

    this.uploader.response.subscribe(res => (this.response = res));
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // handling once file is uploader
    };

    this.uploader.onAfterAddingFile = (file: FileItem) => {
      // modify data once file is uploaded
    };
    this._subscribeService.getResetFileItems().subscribe(() => {
      this.myInputVariable.nativeElement.value = '';
      this.uploader.cancelAll();
    });
  }

  onFileSelected(e: EventEmitter<File[]>) {
    this.selectedFile.emit(e);
  }

  // This method willl convert file type into Type Blob
  private readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false,
      );

      reader.addEventListener(
        'error',
        function (event) {
          reject(event);
        },
        false,
      );

      reader.readAsDataURL(file);
    });
    return future;
  }
}
