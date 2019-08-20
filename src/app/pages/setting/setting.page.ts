import { LengthUnits } from 'src/app/services/unit.service';
import { UnitService, UnitType, MassUnits, VolumeUnits } from './../../services/unit.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Location } from '@angular/common';
import { ApiService, AlertService } from 'src/app/services';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  editForm: FormGroup = new FormGroup({});
  isReadyToSave = false;
  unitData = [];

  constructor(
    private storage: NativeStorage,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    private location: Location,
    private formBuilder: FormBuilder,
    private unit: UnitService) {
      setTimeout(() => {
        this.createForm();

        this.editForm.valueChanges.subscribe(values => {
          Object.keys(values).forEach(key => {
            this.unit.setValue(key, values[key]);
          });
        });

        this. unitData = [{
          type: UnitType.Mass,
          labels: Object.keys(MassUnits),
          values: Object.values(MassUnits),
        },
        {
          type: UnitType.Length,
          labels: Object.keys(LengthUnits),
          values: Object.values(LengthUnits),
        },
        {
          type: UnitType.Volume,
          labels: Object.keys(VolumeUnits),
          values: Object.values(VolumeUnits),
        }];
      }, 3000);
    }

  ngOnInit() { }

  createForm() {
    this.editForm = this.formBuilder.group({
      [UnitType.Mass]: [this.unit.getValue(UnitType.Mass), Validators.required],
      [UnitType.Length]: [this.unit.getValue(UnitType.Length), Validators.required],
      [UnitType.Volume]: [this.unit.getValue(UnitType.Volume), Validators.required],
    });
  }
}
