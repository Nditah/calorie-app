import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.page.html',
  styleUrls: ['./food-edit.page.scss'],
})
export class FoodEditPage implements OnInit {

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
