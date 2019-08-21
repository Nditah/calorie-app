import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export enum MassUnits {
  Gram = 'g',
  Kilogram = 'kg',
  Milligram = 'mg',
  Ton = 'ton',
  Pound = 'lbs',
  Ounce = 'oz',
}

export enum VolumeUnits {
  Milliliter = 'ml',
  Liter = 'l',
  Gallon = 'gal',
  Pint = 'pt',
  Cup = 'cup',
}

export enum LengthUnits {
  Centimeter = 'cm',
  Meter = 'm',
  Kilometer = 'km',
  Decimeter = 'dm',
  Millimeter = 'mm',
  Foot = 'ft',
  Inch = 'in',
}

export enum UnitType {
  Mass = 'Mass',
  Volume = 'Volume',
  Length =  'Length',
}

interface UnitSettings {
  Mass: MassUnits;
  Volume: VolumeUnits;
  Length: LengthUnits;
}

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private SETTINGS_KEY = '_unit-settings';

  private _settings = {
    Mass: {
      [MassUnits.Gram]: 1,
      [MassUnits.Kilogram]: 0.001,
      [MassUnits.Milligram]: 1000,
      [MassUnits.Ounce]: 0.0352739619,
      [MassUnits.Pound]: 0.0022046226,
      [MassUnits.Ton]: 0.0000011023,
    },
    Volume: {
      [VolumeUnits.Milliliter]: 1,
      [VolumeUnits.Cup]: 0.0042267528,
      [VolumeUnits.Gallon]: 0.0002641721,
      [VolumeUnits.Liter]: 0.001,
      [VolumeUnits.Pint]: 0.0021133764,
    },
    Length: {
      [LengthUnits.Centimeter]: 1,
      [LengthUnits.Decimeter]: 0.1,
      [LengthUnits.Foot]: 0.032808399,
      [LengthUnits.Inch]: 0.3937007874,
      [LengthUnits.Kilometer]: 0.00001,
      [LengthUnits.Meter]: 0.01,
      [LengthUnits.Millimeter]: 10,
    },
  };

  private _defaults: UnitSettings = {
    Mass: MassUnits.Gram,
    Volume: VolumeUnits.Milliliter,
    Length: LengthUnits.Centimeter,
  };

  private units: UnitSettings = Object.assign({}, this._defaults);

  constructor(private storage: Storage, private numberPipe: DecimalPipe) {
    this.load();
  }

  private load = async () => {
    const value: UnitSettings = await this.storage.get(this.SETTINGS_KEY);
    if (value) {
      this.units = Object.assign({}, this.units, value);
    } else {
      await this.setAll(this.units);
    }
  }

  private setAll = async (value: UnitSettings) => {
    const val = await this.storage.set(this.SETTINGS_KEY, value);
    this.units = val;
  }

  public setValue = async (key: UnitType|any, value: MassUnits|VolumeUnits|LengthUnits|any) => {
    this.units[key] = value;
    await this.setAll(this.units);
  }

  public getValue = (key: UnitType|any) => {
    return this.units[key];
  }

  public mass = (value: number, fromUnit: MassUnits|any = null, toUnit: MassUnits|any = null, showUnit = true) => {
    const inUnit = fromUnit || this.units.Mass;
    const outUnit = toUnit || this.units.Mass;
    const output = this.numberPipe.transform(((value / this._settings.Mass[inUnit]) * this._settings.Mass[outUnit]), '1.1-2');
    return `${output}${showUnit ? ' ' + outUnit : ''}`;
  }

  public volume = (value: number, fromUnit: VolumeUnits|any = null, toUnit: MassUnits|any = null, showUnit = true) => {
    const inUnit = fromUnit || this.units.Volume;
    const outUnit = toUnit || this.units.Volume;
    const output = this.numberPipe.transform(((value / this._settings.Volume[inUnit]) * this._settings.Volume[outUnit]), '1.1-2');
    return `${output}${showUnit ? ' ' + outUnit : ''}`;
  }

  public length = (value: number, fromUnit: LengthUnits|any = null, toUnit: MassUnits|any = null, showUnit = true) => {
    const inUnit = fromUnit || this.units.Length;
    const outUnit = toUnit || this.units.Length;
    const output = this.numberPipe.transform(((value / this._settings.Length[inUnit]) * this._settings.Length[outUnit]), '1.1-2');
    return `${output}${showUnit ? ' ' + outUnit : ''}`;
  }

  public reset = () => {
    this.units = Object.assign({}, this._defaults);
    this.setAll(this._defaults);
    return this._defaults;
  }
}
