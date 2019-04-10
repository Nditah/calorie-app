import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePage } from './exercise.page';

describe('ExercisePage', () => {
  let component: ExercisePage;
  let fixture: ComponentFixture<ExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
