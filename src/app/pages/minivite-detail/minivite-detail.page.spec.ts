import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniviteDetailPage } from './minivite-detail.page';

describe('MiniviteDetailPage', () => {
  let component: MiniviteDetailPage;
  let fixture: ComponentFixture<MiniviteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniviteDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniviteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
