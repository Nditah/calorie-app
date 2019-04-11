import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.page.html',
  styleUrls: ['./food-add.page.scss'],
})
export class FoodAddPage implements OnInit {

  addForm: FormGroup;
  vitamins: FormArray;
  minerals: FormArray;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
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

  // * Vitamins
  createVitamin(): FormGroup {
    return this.formBuilder.group({
      vitamin_name: [null, Validators.required],
      vitamin_value: [null, Validators.required],
    });
  }

  addBlankVitamin(): void {
    this.minerals = this.addForm.get('vitamins') as FormArray;
    this.minerals.push(this.createMineral());
  }

  deleteVitamin(control, index) {
    control.removeAt(index);
  }

  // * Minerals
  createMineral(): FormGroup {
    return this.formBuilder.group({
      mineral_name: [null, Validators.required],
      mineral_value: [null, Validators.required],
    });
  }

  addBlankMineral(): void {
    this.minerals = this.addForm.get('minerals') as FormArray;
    this.minerals.push(this.createMineral());
  }

  deleteMineral(control, index) {
    control.removeAt(index);
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    await this.api.postFood(payload)
    .subscribe((res: ApiResponse) => {
      if (res.success) {
        const id = res['id'];
        this.router.navigate(['/food-detail/' + id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

}
