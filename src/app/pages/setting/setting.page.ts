import { LengthUnits } from 'src/app/services/unit.service';
import { UnitService, UnitType, MassUnits, VolumeUnits } from './../../services/unit.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  unitData = [];
  converter = {
    [UnitType.Mass]: {
      units: Object.values(MassUnits),
      labels: Object.keys(MassUnits),
    },
    [UnitType.Volume]: {
      units: Object.values(VolumeUnits),
      labels: Object.keys(VolumeUnits),
    },
    [UnitType.Length]: {
      units: Object.values(LengthUnits),
      labels: Object.keys(LengthUnits),
    },
  };
  currentConverter = UnitType.Mass;
  convertFrom = {
    unit: MassUnits.Gram,
    value: 1,
  };
  convertTo = {
    unit: MassUnits.Gram,
    value: 1,
  };

  constructor(
    private storage: NativeStorage,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    private location: Location,
    private formBuilder: FormBuilder,
    private unit: UnitService,
    ) {
      setTimeout(this.loadUnit, 3000);
    }

  ngOnInit() { }

  private replaceAll($value: string): number {
    const val = $value.split(',').join('');
    return Number(val);
  }

  converterChange($value: any) {
    this.currentConverter = $value;
    this.convertFrom.unit = this.unit.getValue($value);
    this.convertFrom.value = 1;
    this.convertTo.unit = this.unit.getValue($value);
    this.convertTo.value = 1;
  }

  fromValueChange($ev: CustomEvent) {
    const $value = $ev.detail.target.value;
    switch (this.currentConverter) {
      case UnitType.Mass:
        this.convertTo.value = this.replaceAll(this.unit.mass($value, this.convertFrom.unit, this.convertTo.unit, false));
        break;
      case UnitType.Length:
        this.convertTo.value = this.replaceAll(this.unit.length($value, this.convertFrom.unit, this.convertTo.unit, false));
        break;
      case UnitType.Volume:
        this.convertTo.value = this.replaceAll(this.unit.volume($value, this.convertFrom.unit, this.convertTo.unit, false));
        break;
    }
  }

  fromUnitChange($value: any) {
    switch (this.currentConverter) {
      case UnitType.Mass:
        this.convertTo.value = this.replaceAll(this.unit.mass(this.convertFrom.value, $value, this.convertTo.unit, false));
        break;
      case UnitType.Length:
        this.convertTo.value = this.replaceAll(this.unit.length(this.convertFrom.value, $value, this.convertTo.unit, false));
        break;
      case UnitType.Volume:
        this.convertTo.value = this.replaceAll(this.unit.volume(this.convertFrom.value, $value, this.convertTo.unit, false));
        break;
    }
  }

  toUnitChange($value: any) {
    switch (this.currentConverter) {
      case UnitType.Mass:
        this.convertFrom.value = this.replaceAll(this.unit.mass(this.convertTo.value, $value, this.convertFrom.unit, false));
        break;
      case UnitType.Length:
        this.convertFrom.value = this.replaceAll(this.unit.length(this.convertTo.value, $value, this.convertFrom.unit, false));
        break;
      case UnitType.Volume:
        this.convertFrom.value = this.replaceAll(this.unit.volume(this.convertTo.value, $value, this.convertFrom.unit, false));
        break;
    }
  }

  toValueChange($ev: CustomEvent) {
    const $value = $ev.detail.target.value;
    switch (this.currentConverter) {
      case UnitType.Mass:
        this.convertFrom.value = this.replaceAll(this.unit.mass($value, this.convertTo.unit, this.convertFrom.unit, false));
        break;
      case UnitType.Length:
        this.convertFrom.value = this.replaceAll(this.unit.length($value, this.convertTo.unit, this.convertFrom.unit, false));
        break;
      case UnitType.Volume:
        this.convertFrom.value = this.replaceAll(this.unit.volume($value, this.convertTo.unit, this.convertFrom.unit, false));
        break;
    }
  }

  loadUnit = () => {
    this.unitData = [];
    this.createForm();

    this.editForm.valueChanges.subscribe(values => {
      Object.keys(values).forEach(key => {
        this.unit.setValue(key, values[key]);
      });
    });

    this.unitData = [{
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
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      [UnitType.Mass]: [this.unit.getValue(UnitType.Mass), Validators.required],
      [UnitType.Length]: [this.unit.getValue(UnitType.Length), Validators.required],
      [UnitType.Volume]: [this.unit.getValue(UnitType.Volume), Validators.required],
    });
  }

  resetUnits() {
    const units = this.unit.reset();
    this.editForm.controls[UnitType.Mass].setValue(units[UnitType.Mass]);
    this.editForm.controls[UnitType.Length].setValue(units[UnitType.Length]);
    this.editForm.controls[UnitType.Volume].setValue(units[UnitType.Volume]);
  }
}
