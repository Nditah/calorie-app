import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.page.html',
  styleUrls: ['./food-edit.page.scss'],
})
export class FoodEditPage implements OnInit {

  editForm: FormGroup;
  minerals: FormArray;
  vitamins: FormArray;
  // 16 essential minerals
  mineralArr = ['calcium', 'phosphorus', 'potassium', 'sulfur', 'sodium', 'chloride', 'magnesium',
  'iron', 'zinc', 'copper', 'manganese', 'iodine', 'selenium', 'molybdenum', 'chromium', 'fluoride'];

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.getFoom(this.route.snapshot.paramMap.get('id'));
      this.editForm = this.formBuilder.group({
        'name' : [null, Validators.required],
        // 'type': [null, Validators.required], // enum: ["DEFAULT", "CUSTOM"]
        'category': [null, Validators.required], // enum: ["FOOD", "DRINK"]
        'description': [null, Validators.required],
        'quantity': [null, Validators.required],
        'water': [null, Validators.required],
        'calories': [null, Validators.required],
        'carbs': [null, Validators.required],
        'protein': [null, Validators.required],
        'fat': [null, Validators.required],
        'fiber': [null, Validators.required],
        'vitamins' : this.formBuilder.array([]),
        'minerals' : this.formBuilder.array([]),
      });
    }

  ngOnInit() {
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getFood(`?_id=${id}`).subscribe((res: ApiResponse) => {
      console.log(res);
      if (res.success) {
      const record = res.payload[0];
      this.editForm.controls['name'].setValue(record.name);
      this.editForm.controls['category'].setValue(record.name);
      this.editForm.controls['description'].setValue(record.name);
      this.editForm.controls['quantity'].setValue(record.name);
      this.editForm.controls['water'].setValue(record.name);
      this.editForm.controls['calories'].setValue(record.name);
      this.editForm.controls['carbs'].setValue(record.name);
      this.editForm.controls['protein'].setValue(record.name);
      this.editForm.controls['fat'].setValue(record.name);
      this.editForm.controls['fiber'].setValue(record.name);

      const controlArray1 = <FormArray>this.editForm.controls['vitamins'];
      record.vitamins.forEach(item => {
        controlArray1.push(this.formBuilder.group({
          vitamin_name: '',
          vitamin_value: '',
        }));
      });
      for (let i = 0; i < record.vitamins.length; i++) {
        controlArray1.controls[i].get('vitamin_name').setValue(record.vitamins[i].vitamin_name);
        controlArray1.controls[i].get('vitamin_value').setValue(record.vitamins[i].vitamin_value);
      }

      const controlArray = <FormArray>this.editForm.controls['minerals'];
      record.minerals.forEach(item => {
        controlArray.push(this.formBuilder.group({
          mineral_name: '',
          mineral_value: '',
        }));
      });
      for (let i = 0; i < record.minerals.length; i++) {
        controlArray.controls[i].get('mineral_name').setValue(record.minerals[i].mineral_name);
        controlArray.controls[i].get('mineral_value').setValue(record.minerals[i].mineral_value);
      }

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
    await this.api.updateFood(id, payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/food-detail', id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

  createVitamin(): FormGroup {
    return this.formBuilder.group({
      vitamin_name: '',
      vitamin_value: '',
    });
  }

  addBlankVitamin(): void {
    this.vitamins = this.editForm.get('vitamins') as FormArray;
    this.vitamins.push(this.createVitamin());
  }

  createMineral(): FormGroup {
    return this.formBuilder.group({
      mineral_name: '',
      mineral_value: '',
    });
  }

  addBlankMineral(): void {
    this.minerals = this.editForm.get('minerals') as FormArray;
    this.minerals.push(this.createMineral());
  }

  deleteInput(control, index) {
    control.removeAt(index);
  }

}
