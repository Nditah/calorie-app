import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinivitePage } from './minivite.page';

describe('MinivitePage', () => {
  let component: MinivitePage;
  let fixture: ComponentFixture<MinivitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinivitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinivitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
