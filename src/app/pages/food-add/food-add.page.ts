import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';
import { Location } from '@angular/common';
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

  @ViewChild('slides') slides: IonSlides;
  addForm: FormGroup;
  nutrients: FormArray;
  isReadyToSave = false;
  currentSLide = 1;
  categoryControl: FormControl;
  unitControl: FormControl;
  foodUnit: string = null;
  foodNutrients = [];

  constructor(public api: ApiService,
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
        'unit': [null, Validators.required],
        'ph': [null, [Validators.required, Validators.min(0), Validators.max(14)]],
        'water': [null, Validators.required],
        'calories': [null, Validators.required],
        'carbohydrate': [null, Validators.required],
        'protein': [null, Validators.required],
        'fats': [null, Validators.required],
        'fibre': [null, Validators.required],
        'nutrients' : this.formBuilder.array([
          this.formBuilder.group({
            nutrient: [null, Validators.required],
            quantity: [null, Validators.required],
          })
        ]),
        'ingredients' : this.formBuilder.array([
          this.formBuilder.control(null, Validators.required),
        ]),
      });

      this.categoryControl = this.addForm.get('category') as FormControl;
      this.unitControl = this.addForm.get('unit') as FormControl;
      this.foodUnit = this.unitControl.value;
    }

  ngOnInit() {
    this.getNutrients();

    this.slides.lockSwipes(true);

    this.unitControl.valueChanges.subscribe(value => {
      this.foodUnit = value;
    });

    this.categoryControl.valueChanges.subscribe(value => {
      switch (value) {
        case 'FOOD':
          this.unitControl.setValue('mg');
          break;
        case 'DRINK':
          this.unitControl.setValue('ml');
          break;
      }
    });
  }

  getNutrients() {
    this.api.getNutrients('').subscribe((res: ApiResponse) => {
      this.foodNutrients = res.payload.map(item => ({id: item.id, name: item.name}));
    });
  }

  prev() {
    this.slides.lockSwipes(false).then(() => {
      this.slides.slidePrev().then(() => {
        this.slides.lockSwipes(true).then(() => {
          this.currentSLide -= 1;
        });
      });
    });
  }

  next() {
    this.slides.lockSwipes(false).then(() => {
      this.slides.slideNext().then(() => {
        this.slides.lockSwipes(true).then(() => {
          this.currentSLide += 1;
        });
      });
    });
  }

  // * Minivites
  createNutrient(): FormGroup {
    return this.formBuilder.group({
      nutrient: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  createIngredient(): FormControl {
    return this.formBuilder.control(null, Validators.required);
  }

  addBlankIngredient(): void {
    (this.addForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  addBlankNutrient(): void {
    this.nutrients = this.addForm.get('nutrients') as FormArray;
    this.nutrients.push(this.createNutrient());
  }

  deleteIngredient(control, index): void {
    control.removeAt(index);
  }

  deleteNutrient(control, index) {
    control.removeAt(index);
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    console.log(payload);
    await this.api.postFood(payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        const id = res.payload['id'];
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
