import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.page.html',
  styleUrls: ['./exercise-add.page.scss'],
})
export class ExerciseAddPage implements OnInit {

  page = 'Add Exercise';
  addForm: FormGroup;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.addForm = this.formBuilder.group({
        name : [null, Validators.required],
        // 'type': [null, Validators.required], // enum: ["DEFAULT", "CUSTOM"]
        category: [null, Validators.required], // enum: ["SPORT", "WORKOUT"]
        description: [null, Validators.required],
        calorie: [null, Validators.required],
        duration: [null, Validators.required],
      });
    }

  ngOnInit() {
  }

  async submitRecord() {
    const payload = this.addForm.value;
    payload.type = 'CUSTOM';
    await this.api.postExercise(payload)
    .subscribe((res: ApiResponse) => {
      if (res.success) {
        const id = res['id'];
        this.router.navigate(['/exercise-detail/' + id]);
      } else {
        this.alertService.presentToast(res.message);
      }}, (err) => {
        console.log(err);
      });
  }

}
