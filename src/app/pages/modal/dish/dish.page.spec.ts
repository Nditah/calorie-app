import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishPage } from './dish.page';

describe('DishPage', () => {
  let component: DishPage;
  let fixture: ComponentFixture<DishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
