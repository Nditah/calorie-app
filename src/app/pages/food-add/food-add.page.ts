import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';
import { Foods } from 'src/app/providers';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.page.html',
  styleUrls: ['./food-add.page.scss'],
})
export class FoodAddPage implements OnInit {

  addForm: FormGroup;
  nutrients: FormArray;
  isReadyToSave = false;

  constructor(public foods: Foods,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private location: Location,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.addForm = this.formBuilder.group({
        'name' : [null, Validators.required],
        // 'type': [null, Validators.required], // enum: ["DEFAULT", "CUSTOM"]
        'category': [null, Validators.required], // enum: ["FOOD", "DRINK"]
        'description': [null, Validators.required],
        'quantity': [null, Validators.required],
        'water': [null, Validators.required],
        'calories': [null, Validators.required],
        'carbohydrate': [null, Validators.required],
        'protein': [null, Validators.required],
        'fats': [null, Validators.required],
        'fibre': [null, Validators.required],
        'nutrients' : this.formBuilder.array([]),
      });
    }

  ngOnInit() {
  }

  // * Minivites
  createMinivite(): FormGroup {
    return this.formBuilder.group({
      nutrient_name: [null, Validators.required],
      nutrient_value: [null, Validators.required],
    });
  }

  addBlankMinivite(): void {
    this.nutrients = this.addForm.get('nutrients') as FormArray;
    this.nutrients.push(this.createMinivite());
  }

  deleteMinivite(control, index) {
    control.removeAt(index);
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    await this.foods.recordCreate(payload).then((res: ApiResponse) => {
      if (res.success) {
        const id = res['id'];
        this.router.navigate(['/food-detail/' + id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
        this.alertService.presentToast(err.message);
      });
  }
  cancel() {
    this.location.back();
  }
}
