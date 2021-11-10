import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ProfileService } from 'src/app/core/services/profile/profile.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private _spinner: LoaderService, private _service: ProfileService,
    private _message: MessageService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const id  = localStorage.getItem('userID')
      if(typeof id == 'string'){
        formData.append('userID', id);
      }
      this._spinner.show();
      this._service.uploadFile(formData)
      .subscribe(res => {
        this._message.add({
          severity: 'success',
          summary: 'Successful',
          detail: res.message,
          life: 3000,
        });
        this._spinner.hide();
      })
    }
  }

}
