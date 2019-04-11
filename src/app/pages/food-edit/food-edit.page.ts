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
        'minerals' : this.formBuilder.array([])
      });
    }

  ngOnInit() {
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getFood('?id=' + id).subscribe((res: ApiResponse) => {
    if (res.success) {
      this.editForm.controls['name'].setValue(res.payload.name);

      const controlArray = <FormArray>this.editForm.controls['minerals'];
      res.payload.minerals.forEach(std => {
        controlArray.push(this.formBuilder.group({
           mineral_name: ''
        }));
      });
      for (let i = 0; i < res.payload.minerals.length; i++) {
        controlArray.controls[i].get('mineral_name').setValue(res.payload.minerals[i].mineral_name);
      }

      console.log(this.editForm);
      loading.dismiss();
    }
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  async updateRecord() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.api.updateFood(id, this.editForm.value).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/food-detail', id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

  createMineral(): FormGroup {
    return this.formBuilder.group({
      mineral_name: ''
    });
  }

  addBlankMineral(): void {
    this.minerals = this.editForm.get('minerals') as FormArray;
    this.minerals.push(this.createMineral());
  }

  deleteMineral(control, index) {
    control.removeAt(index);
  }

}
