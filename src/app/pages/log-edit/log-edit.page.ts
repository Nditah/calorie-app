import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, SelectOptionInterface } from 'src/app/models';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.page.html',
  styleUrls: ['./log-edit.page.scss'],
})
export class LogEditPage implements OnInit {

  page = 'Edit Log';
  editForm: FormGroup;
  foods: SelectOptionInterface;
  exercises: SelectOptionInterface;
  selectedFood: '';
  selectedExercise: '';

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.getFoom(this.route.snapshot.paramMap.get('id'));
      this.editForm = this.formBuilder.group({
        day: [null, Validators.required],
        food: [null, Validators.required],
        food_quantity: [null, Validators.required],
        exercise: [null, Validators.required],
        exercise_duration: [null, Validators.required],
        remark: [null, Validators.required],
      });
    }

  ngOnInit() {
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getLog(`?id=${id}`).subscribe((res: ApiResponse) => {
    if (res.success) {
      const record = res.payload[0];
      this.editForm.controls['day'].setValue(record.day);
      this.editForm.controls['food'].setValue(record.food);
      this.editForm.controls['food_quantity'].setValue(record.food_quantity);
      this.editForm.controls['exercise'].setValue(record.exercise);
      this.editForm.controls['exercise_duration'].setValue(record.exercise_duration);
      this.editForm.controls['remark'].setValue(record.remark);

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
    await this.api.updateLog(id, payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/log-detail', id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }
  
  async getExercises() {
    await this.api.getExercise('').subscribe((res: ApiResponse) => {
        if (res.success && res.payload.length > 0) {
          this.exercises = res.payload.map(item => ({ id: item.id, text: item.name }));
          console.log(this.exercises);
          return;
        }
      });
  }

  async getFoods() {
    await this.api.getFood('').subscribe((res: ApiResponse) => {
        if (res.success && res.payload.length > 0) {
          this.foods = res.payload.map(item => ({ id: item.id, text: item.name }));
          console.log(this.foods);
          return;
        }
      });
  }

}
