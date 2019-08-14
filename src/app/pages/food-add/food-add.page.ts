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
  minivites: FormArray;
  isReadyToSave = false;
  currentSLide = 1;

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
        'water': [null, Validators.required],
        'calories': [null, Validators.required],
        'carbohydrate': [null, Validators.required],
        'protein': [null, Validators.required],
        'fats': [null, Validators.required],
        'fibre': [null, Validators.required],
        'minivites' : this.formBuilder.array([
          this.formBuilder.group({
            minivite_name: [null, Validators.required],
            minivite_value: [null, Validators.required],
          })
        ]),
      });
    }

  ngOnInit() {
    this.slides.lockSwipes(true);
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
  createMinivite(): FormGroup {
    return this.formBuilder.group({
      minivite_name: [null, Validators.required],
      minivite_value: [null, Validators.required],
    });
  }

  addBlankMinivite(): void {
    this.minivites = this.addForm.get('minivites') as FormArray;
    this.minivites.push(this.createMinivite());
  }

  deleteMinivite(control, index) {
    control.removeAt(index);
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    await this.api.postFood(payload).subscribe((res: ApiResponse) => {
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
