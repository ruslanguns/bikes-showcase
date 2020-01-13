import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BikesService } from '../bikes.service';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-bikes',
  templateUrl: './create-bikes.component.html',
  styles: []
})
export class CreateBikesComponent implements OnInit, OnDestroy {

  private OnKeyEscapeClose: Subscription;

  form: FormGroup;
  selectedFile: File;
  bikeCreated = false;

  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  keyup$ = (keyCode: string) => {
    return fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        pluck('key'),
        filter(val => val === keyCode)
      );
  }

  constructor(
    private readonly router: Router,
    private readonly bikesService: BikesService,
    private toastr: ToastrService
  ) {

    this.form = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      brand: new FormControl(''),
      details: new FormControl(''),
      category: new FormControl(''),
      size: new FormControl(''),
      price: new FormControl(null),
      state: new FormControl('usado'),
    });
  }

  ngOnInit() {
    this.OnKeyEscapeClose = this.keyup$('Escape')
      .subscribe(res => this.router.navigate(['/admin/bicicletas']));
  }

  ngOnDestroy() {
    this.OnKeyEscapeClose.unsubscribe();
  }

  fileProgress(fileInput: any) {
    this.selectedFile = fileInput.target.files[0] as File;
    this.preview();
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.preview();
  }

  uploadImage(id: string) {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.fileUploadProgress = '0%';

    this.bikesService.uploadImage(id, uploadData)
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          // console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          // console.log(events.body);
        }
      });
  }

  preview() {
    // Show preview
    const mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    return this.bikesService.create(this.form.value)
      .subscribe(
        res => {
          const { _id } = res;
          this.uploadImage(_id);
          this.formReset();
          this.toastr.success('Bicicleta creada', 'Petición correcta');
          this.router.navigate(['/admin/bicicletas']);
        },
      );
  }

  formReset() {
    this.form.reset();
    this.form.patchValue({
      state: 'usado',
      category: '',
      size: '',
    });
    this.selectedFile = null;
    this.previewUrl = null;
  }


}
