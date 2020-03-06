import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { pluck, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BikesService } from '../bikes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { IBikes } from '../bikes.interface';
import { Bike } from '../bike.class';
import { ToastrService } from 'ngx-toastr';
import { WindowService } from 'src/app/shared';
import { SettingsService } from '../../settings/settings.service';
import { IMarcas } from '../../settings/settings.interface';

@Component({
  selector: 'app-detail-bikes',
  templateUrl: './detail-bikes.component.html',
  styles: [],
})
export class DetailBikesComponent implements OnInit, OnDestroy {

  bikeId: string = null;
  bike: IBikes = new Bike();

  form: FormGroup;
  selectedFile: File;
  bikeCreated = false;

  bikeImageUrl: string = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  // Typeahead models
  marcas: IMarcas[] = [];
  categories: string[] = [];
  talla: string[] = [];

  private OnKeyEscapeClose: Subscription;
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
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _location: Location,
    private windowService: WindowService,
    private settingsService: SettingsService,
  ) {
    this.route.params.subscribe(params => {
      this.bikeId = params.bikeId;
    });

    this.getInputsTypesahead();
    this.fetch(this.bikeId);
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

  fetch(id: string) {
    this.bikesService.getById(id)
      .subscribe(
        res => {
          this.bike = res;
          this.bikeImageUrl = this.getImage(this.bike._id, this.bike.image.filename);
        }
      );
  }

  /**
   * Actualizamos los inputs existentes
   */
  async getInputsTypesahead(): Promise<void> {
    this.settingsService.fetch().subscribe(res => {
      this.marcas = res.inputs.marcas;
      this.categories = res.inputs.estilo;
      this.talla = res.inputs.talla;
    });
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

  goBack() {
    if (this.windowService.history.length > 1) {
      // console.log('Hay historial');
      this._location.back();
    } else {
      // console.log('No hay historial');
      this.router.navigate(['/admin/bicicletas']);
    }
  }

  uploadImage(id: string) {
    if (!this.selectedFile) { return; }
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.fileUploadProgress = '0%';

    this.bikesService.editImage(id, uploadData)
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
    return this.bikesService.update(this.bikeId, this.form.value)
      .subscribe(
        res => {
          const { _id } = res;
          this.uploadImage(_id);
          this.toastr.success('Bicicleta actualizada', 'Petición correcta');
        }
      );
  }

  getImage(bikeId: string, filename: string): string {
    return `/api/bikes/${bikeId}/image/${filename}`;
  }
}
