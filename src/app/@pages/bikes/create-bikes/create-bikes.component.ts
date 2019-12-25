import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PnotifyService } from '../../../shared/services/pnotify.service';
import { BikesService } from '../bikes.service';

@Component({
  selector: 'app-create-bikes',
  templateUrl: './create-bikes.component.html',
  styles: []
})
export class CreateBikesComponent implements OnInit, OnDestroy {

  private OnKeyEscapeClose: Subscription;

  form: FormGroup;
  PNotify;
  selectedFile: File;
  bikeCreated = false;

  keyup$ = (keyCode: string) => {
    return fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        pluck('key'),
        filter(val => val === keyCode)
      );
  }

  constructor(
    private readonly router: Router,
    private readonly pnotifyService: PnotifyService,
    private readonly bikesService: BikesService
  ) {
    this.PNotify = this.pnotifyService.getPNotify();

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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(id: string) {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    this.bikesService.uploadImage(id, uploadData)
      .subscribe(event => console.log(event));
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    return this.bikesService.create(this.form.value)
      .subscribe(
        res => {
          this.PNotify.success('¡Bicicleta agregada!');
          const { _id } = res;
          this.uploadImage(_id);
          this.formReset();
        },
        error => console.log('HTTP error', error)
      );
  }

  formReset() {
    this.form.reset();
    this.form.patchValue({
      state: 'usado',
      category: '',
      size: '',
    });
    console.log(this.form.value);
  }


}
