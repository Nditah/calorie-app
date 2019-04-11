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
  minerals: FormArray;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.addForm = this.formBuilder.group({
        'class_name' : [null, Validators.required],
        'minerals' : this.formBuilder.array([])
      });
    }

  ngOnInit() {
  }

  createMineral(): FormGroup {
    return this.formBuilder.group({
      mineral_name: ''
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
    await this.api.postFood(this.addForm.value)
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
