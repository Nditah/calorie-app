import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import {ApiResponse, Food} from 'src/app/models';
import {Location} from '@angular/common';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.page.html',
  styleUrls: ['./food-edit.page.scss'],
})
export class FoodEditPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  editForm: FormGroup;
  nutrients: FormArray;
  vitamins: FormArray;
  isReadyToSave = false;
  currentSLide = 1;
  categoryControl: FormControl;
  unitControl: FormControl;
  foodUnit: string = null;
  foodNutrients = [];

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private location: Location,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {
      this.getFoom(this.route.snapshot.paramMap.get('id'));
      this.editForm = this.formBuilder.group({
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
        'nutrients' : this.formBuilder.array([]),
        'ingredients' : this.formBuilder.array([]),
      });

      this.categoryControl = this.editForm.get('category') as FormControl;
      this.unitControl = this.editForm.get('unit') as FormControl;
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

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    this.api.getFood(`?_id=${id}`).subscribe((res: ApiResponse) => {
      console.log(res);
      if (res.success) {
        const record: Food|any = res.payload[0];
        this.editForm.controls['name'].setValue(record.name);
        this.editForm.controls['category'].setValue(record.category);
        this.editForm.controls['description'].setValue(record.description);
        this.editForm.controls['ph'].setValue(record.ph);
        this.editForm.controls['unit'].setValue(record.unit);
        this.editForm.controls['quantity'].setValue(record.quantity);
        this.editForm.controls['water'].setValue(record.water);
        this.editForm.controls['calories'].setValue(record.calories);
        this.editForm.controls['carbohydrate'].setValue(record.carbohydrate);
        this.editForm.controls['protein'].setValue(record.protein);
        this.editForm.controls['fats'].setValue(record.fats);
        this.editForm.controls['fibre'].setValue(record.fibre);

        const controlArray = <FormArray> this.editForm.controls['nutrients'];
        if (record.nutrients) {
          record.nutrients.forEach(item => {
            controlArray.push(this.formBuilder.group({
              nutrient: item.nutrient.id,
              quantity: item.quantity,
            }));
          });
        }

        const ingredientsArray = <FormArray> this.editForm.controls['ingredients'];
        if (record.ingredients) {
          record.ingredients.forEach(item => {
            ingredientsArray.push(this.formBuilder.control(item));
          });
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

  createNutrient(): FormGroup {
    return this.formBuilder.group({
      nutrient: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  addBlankNutrient(): void {
    this.nutrients = this.editForm.get('nutrients') as FormArray;
    this.nutrients.push(this.createNutrient());
  }

  deleteNutrient(control, index) {
    control.removeAt(index);
  }

  createIngredient(): FormControl {
    return this.formBuilder.control(null, Validators.required);
  }

  addBlankIngredient(): void {
    (this.editForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  deleteIngredient(control, index): void {
    control.removeAt(index);
  }

  cancel() {
    this.location.back();
  }

}
