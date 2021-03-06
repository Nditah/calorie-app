import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, SelectOption } from 'src/app/models';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.page.html',
  styleUrls: ['./log-add.page.scss'],
})
export class LogAddPage implements OnInit {

  page = 'Add Log';
  addForm: FormGroup;
  foods: SelectOption;
  exercises: SelectOption;
  selectedFood: '';
  selectedExercise: '';
  yesterday = new Date(Date.now() - 86400000).toJSON();
  today = new Date().toJSON();
  isReadyToSave = false;
  foodUnit: string = null;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private location: Location,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {

      this.getExercises().then(() => {
        this.getFoods().then(() => this.createForm());
      });
    }

  ngOnInit() {
    this.createForm();
  }

  foodChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    switch (event.value.category) {
      case 'FOOD':
        this.foodUnit = 'kg';
        break;
      case 'DRINK':
        this.foodUnit = 'lt';
        break;
    }
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
      current_mass: [null, Validators.required],
      remark: [null, Validators.required],
    });
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.food = payload.food.id;
    payload.exercise = payload.exercise.id;
    await this.api.postLog(payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        const id = res.payload['id'];
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
          this.exercises = res.payload.map(item => ({ id: item.id, name: item.name }));
          console.log(this.exercises);
          return;
        }
      });
  }

  async getFoods() {
    await this.api.getFood('').subscribe((res: ApiResponse) => {
        if (res.success && res.payload.length > 0) {
          this.foods = res.payload.map(item => ({ id: item.id, name: item.name, category: item.category }));
          console.log(this.foods);
          return;
        }
      });
  }
  cancel() {
    this.location.back();
  }
}
