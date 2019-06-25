import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Exercise } from 'src/app/models';
import { Exercises } from 'src/app/providers';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.page.html',
  styleUrls: ['./exercise-edit.page.scss'],
})
export class ExerciseEditPage implements OnInit {

  page = 'Edit Exercise';
  editForm: FormGroup;
  isReadyToSave = false;
  record: Exercise;

  constructor(public exercises: Exercises,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
      const id = this.route.snapshot.paramMap.get('id');
      this.getFoom(id);
    }

  ngOnInit() {
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.exercises.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
    if (res.success) {
      this.record = res.payload[0];
      this.editForm.controls['name'].setValue(this.record.name);
      this.editForm.controls['category'].setValue(this.record.category);
      this.editForm.controls['description'].setValue(this.record.description);
      this.editForm.controls['calorie_rate'].setValue(this.record.calorie_rate);

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
    await this.exercises.recordUpdate(this.record, payload).then((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/exercise-detail', id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }
  cancel() {
    this.location.back();
  }
}
