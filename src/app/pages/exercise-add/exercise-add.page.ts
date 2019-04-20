import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router  } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';


@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.page.html',
  styleUrls: ['./exercise-add.page.scss'],
})
export class ExerciseAddPage implements OnInit {

  addForm: FormGroup;
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  
  constructor(private camera: Camera,
    public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    public router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
      this.addForm = this.formBuilder.group({
        name : [null, Validators.required],
        // 'type': [null, Validators.required], // enum: ["DEFAULT", "CUSTOM"]
        category: [null, Validators.required], // enum: ["SPORT", "WORKOUT"]
        description: [null, Validators.required],
        calorie_rate: [null, Validators.required],
        image: [null],
      });

      // Watch the form for changes, and
      this.addForm.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.addForm.valid;
      });
    }

  ngOnInit() {
  }

  async submitRecord() {
    if (!this.addForm.valid) { return; }
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    await this.api.postExercise(payload)
    .subscribe((res: ApiResponse) => {
      if (res.success) {
        const id = res['id'];
        this.router.navigate(['/exercise-detail/' + id]);
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
      this.addForm.patchValue({ 'image': base64Image });

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
      this.addForm.patchValue({ 'image': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getImageStyle() {
    return 'url(' + this.addForm.controls['image'].value + ')';
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.location.back();
  }

}
