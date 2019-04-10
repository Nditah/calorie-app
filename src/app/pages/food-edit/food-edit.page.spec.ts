import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEditPage } from './food-edit.page';

describe('FoodEditPage', () => {
  let component: FoodEditPage;
  let fixture: ComponentFixture<FoodEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
