import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, SelectOptionInterface } from 'src/app/models';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.page.html',
  styleUrls: ['./log-add.page.scss'],
})
export class LogAddPage implements OnInit {

  page = 'Add Log';
  addForm: FormGroup;
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
      this.addForm = this.formBuilder.group({
        day: [null, Validators.required],
        food: [null, Validators.required],
        food_quantity: [null, Validators.required],
        exercise: [null, Validators.required],
        exercise_duration: [null, Validators.required],
        remark: [null, Validators.required],
      });
    }

  ngOnInit() {
    this.getExercises();
    this.getFoods();
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    await this.api.postLog(payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        const id = res['id'];
        this.router.navigate(['/log-detail/' + id]);
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
