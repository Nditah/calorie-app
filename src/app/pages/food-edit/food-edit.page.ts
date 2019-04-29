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
  minivites: FormArray;
  vitamins: FormArray;
  isReadyToSave = false;

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
        'carbohydrate': [null, Validators.required],
        'protein': [null, Validators.required],
        'fats': [null, Validators.required],
        'fibre': [null, Validators.required],
        'minivites' : this.formBuilder.array([]),
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
      this.editForm.controls['carbohydrate'].setValue(record.name);
      this.editForm.controls['protein'].setValue(record.name);
      this.editForm.controls['fats'].setValue(record.name);
      this.editForm.controls['fibre'].setValue(record.name);

      const controlArray = <FormArray>this.editForm.controls['minivites'];
      record.minivites.forEach(item => {
        controlArray.push(this.formBuilder.group({
          minivite_name: '',
          minivite_value: '',
        }));
      });
      for (let i = 0; i < record.minivites.length; i++) {
        controlArray.controls[i].get('minivite_name').setValue(record.minivites[i].minivite_name);
        controlArray.controls[i].get('minivite_value').setValue(record.minivites[i].minivite_value);
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

  createMinivite(): FormGroup {
    return this.formBuilder.group({
      minivite_name: '',
      minivite_value: '',
    });
  }

  addBlankMinivite(): void {
    this.minivites = this.editForm.get('minivites') as FormArray;
    this.minivites.push(this.createMinivite());
  }

  deleteInput(control, index) {
    control.removeAt(index);
  }

}
