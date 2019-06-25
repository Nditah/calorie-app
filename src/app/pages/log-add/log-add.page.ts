import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, SelectOption, Exercise, Food } from 'src/app/models';
import { Logs, Exercises, Foods } from 'src/app/providers';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.page.html',
  styleUrls: ['./log-add.page.scss'],
})
export class LogAddPage implements OnInit {

  page = 'Add Log';
  addForm: FormGroup;
  foodOptions: SelectOption;
  exerciseOptions: SelectOption;
  selectedFood: '';
  selectedExercise: '';
  yesterday = '2019-05-12';
  today = '2019-05-11';
  isReadyToSave = false;
  
  constructor(public logs: Logs,
    public exercises: Exercises,
    public foods: Foods,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private location: Location,
    public router: Router,
    private formBuilder: FormBuilder) {

    this.getExercises().then(() => {
      this.getFoods().then(() => this.createForm());
    });
    }

  ngOnInit() {
    // this.createForm();
  }

  foodChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('food:', event.value);
  }


  exerciseChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('exercise:', event.value);
  }

  createForm(): void {
    this.addForm = this.formBuilder.group({
      day: [null, Validators.required],
      food: [null, Validators.required],
      food_quantity: [null, Validators.required],
      exercise: [null, Validators.required],
      exercise_duration: [null, Validators.required],
      remark: [null, Validators.required],
    });
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.food = payload.food.id;
    payload.exercise = payload.exercise.id;
    await this.logs.recordCreate(payload).then((res: ApiResponse) => {
      if (res.success) {
        const id = res['id'];
        this.router.navigate(['/log-detail/' + id]);
      } else {
        this.alertService.presentToast(res.message);
      }});
  }

  async getExercises() {
    await this.logs.recordRetrieve('').then((res: ApiResponse) => {
        if (res.success && res.payload.length > 0) {
          this.exercises = res.payload.map(item => ({ id: item.id, name: item.name }));
          console.log(this.exercises);
          return;
        }
      });
  }

  async getFoods() {
    await this.foods.recordRetrieve('').then((res: ApiResponse) => {
        if (res.success && res.payload.length > 0) {
          this.foods = res.payload.map(item => ({ id: item.id, name: item.name }));
          console.log(this.foods);
          return;
        }
      });
  }
  cancel() {
    this.location.back();
  }
}
