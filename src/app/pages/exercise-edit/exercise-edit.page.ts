import {Component, OnInit, ViewChild} from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.page.html',
  styleUrls: ['./exercise-edit.page.scss'],
})
export class ExerciseEditPage implements OnInit {

  page = 'Edit Exercise';
  editForm: FormGroup;
  isReadyToSave = false;
  @ViewChild('fileInput') fileInput;

  constructor(
    private camera: Camera,
    public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
      this.editForm = this.formBuilder.group({
        name : [null, Validators.required],
        // 'type': [null, Validators.required], // enum: ["DEFAULT", "CUSTOM"]
        category: [null, Validators.required], // enum: ["SPORT", "WORKOUT"]
        description: [null, Validators.required],
        calorie_rate: [null, Validators.required],
        image: [null],
        tasks: [null],
      });
    }

  ngOnInit() {
    this.getFoom(this.route.snapshot.paramMap.get('id'));
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getExercise(`?_id=${id}`).subscribe((res: ApiResponse) => {
    if (res.success) {
      const record = res.payload[0];
      this.editForm.controls['name'].setValue(record.name);
      this.editForm.controls['category'].setValue(record.category);
      this.editForm.controls['description'].setValue(record.description);
      this.editForm.controls['tasks'].setValue(record.tasks.join(','));
      this.editForm.controls['calorie_rate'].setValue(record.calorie_rate);

      console.log(this.editForm);
      loading.dismiss();
    }
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  async submitRecord() {
    const id = this.route.snapshot.paramMap.get('id');
    const payload = this.editForm.value;
    payload.type = 'CUSTOM';
    payload.tasks = payload.tasks.split(',').map((task: string) => task.trim());
    await this.api.updateExercise(id, payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/exercise-detail', id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

  getPicture() {
    if (Camera['installed']()) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        // destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 96,
        targetHeight: 96
      };
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.editForm.patchValue({ 'image': base64Image });

      }, (err) => {
        // Handle error
        alert('Unable to take photo');
      });


    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const imageData = (readerEvent.target as any).result;
      this.editForm.patchValue({ 'image': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getImageStyle() {
    return 'url(' + this.editForm.controls['image'].value + ')';
  }

  cancel() {
    this.location.back();
  }
}
