import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

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

  private _settings: {
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

  private units: UnitSettings = this._defaults;

  constructor(private storage: Storage) {
    this.load();
  }

  private load = async () => {
    const value: UnitSettings = await this.storage.get(this.SETTINGS_KEY);
    if (value) {
      this.units = Object.assign(this.units, value);
    } else {
      this.setAll(this.units);
    }
  }

  private setAll = async (value: UnitSettings) => {
    await this.storage.set(this.SETTINGS_KEY, value)
    .then((val: UnitSettings) => {
      this.units = val;
    });
  }

  public async setValue(key: UnitType|any, value: MassUnits|VolumeUnits|LengthUnits|any) {
    this.units[key] = value;
    await this.setAll(this.units);
  }

  public getValue(key: UnitType|any) {
    return this.units[key];
  }

  public mass(value: number, showUnit = true) {
    const unit = this.units.Mass;
    return `${(this._settings.Mass[unit] * value)}${showUnit ? ' ' + this.units.Mass : ''}`;
  }

  public volume(value: number, showUnit = true) {
    const unit = this.units.Volume;
    return `${(this._settings.Volume[unit] * value)}${showUnit ? ' ' + this.units.Volume : ''}`;
  }

  public length(value: number, showUnit = true) {
    const unit = this.units.Length;
    return `${(this._settings.Length[unit] * value)}${showUnit ? ' ' + this.units.Length : ''}`;
  }
}
