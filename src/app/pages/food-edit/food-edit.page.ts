import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Food } from 'src/app/models';
import { Foods } from 'src/app/providers';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.page.html',
  styleUrls: ['./food-edit.page.scss'],
})
export class FoodEditPage implements OnInit {

  editForm: FormGroup;
  nutrients: FormArray;
  vitamins: FormArray;
  isReadyToSave = false;
  record: Food;

  constructor(public foods: Foods,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      const id = this.route.snapshot.paramMap.get('id');
      this.foods.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
        if (res.success) {
          this.record = res.payload[0];
        }
      });
    }

  ngOnInit() {
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
      this.editForm.controls['name'].setValue(this.record.name);
      this.editForm.controls['category'].setValue(this.record.category);
      this.editForm.controls['description'].setValue(this.record.description);
      this.editForm.controls['water'].setValue(this.record.water);
      this.editForm.controls['calories'].setValue(this.record.calories);
      this.editForm.controls['carbohydrate'].setValue(this.record.carbohydrate);
      this.editForm.controls['protein'].setValue(this.record.protein);
      this.editForm.controls['fats'].setValue(this.record.fats);
      this.editForm.controls['fibre'].setValue(this.record.fibre);

      const controlArray = <FormArray>this.editForm.controls['nutrients'];
      this.record.nutrients.forEach(item => {
        controlArray.push(this.formBuilder.group({
          nutrient_name: '',
          nutrient_value: '',
        }));
      });
      for (let i = 0; i < this.record.nutrients.length; i++) {
        controlArray.controls[i].get('nutrient_name').setValue(this.record.nutrients[i].nutrient_id);
        controlArray.controls[i].get('nutrient_value').setValue(this.record.nutrients[i].nutrient_value);
      }

      console.log(this.editForm);
      loading.dismiss();
  }

  async submitRecord() {
    const payload = this.editForm.value;
    payload.type = 'CUSTOM';
    await this.foods.recordUpdate(this.record, payload).then((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/food-detail', this.record.id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

  createNutrient(): FormGroup {
    return this.formBuilder.group({
      nutrient_name: '',
      nutrient_value: '',
    });
  }

  addBlankNutrient(): void {
    this.nutrients = this.editForm.get('nutrients') as FormArray;
    this.nutrients.push(this.createNutrient());
  }

  deleteInput(control, index) {
    control.removeAt(index);
  }

}
