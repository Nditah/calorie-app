import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.page.html',
  styleUrls: ['./exercise-edit.page.scss'],
})
export class ExerciseEditPage implements OnInit {

  page = 'Edit Exercise';
  editForm: FormGroup;

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
        'duration': [null, Validators.required],
        'calorie': [null, Validators.required],
      });
    }

  ngOnInit() {
  }

  async getFoom(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getExercise(`?_id=${id}`).subscribe((res: ApiResponse) => {
    if (res.success) {
      const record = res.payload[0];
      this.editForm.controls['name'].setValue(record.name);
      this.editForm.controls['category'].setValue(record.category);
      this.editForm.controls['description'].setValue(record.description);
      this.editForm.controls['duration'].setValue(record.duration);
      this.editForm.controls['calorie'].setValue(record.calorie);

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
    await this.api.updateExercise(id, payload).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.router.navigate(['/exercise-detail', id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

}
