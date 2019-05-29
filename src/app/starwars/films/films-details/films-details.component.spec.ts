import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsDetailsComponent } from './films-details.component';

describe('FilmsDetailsComponent', () => {
  let component: FilmsDetailsComponent;
  let fixture: ComponentFixture<FilmsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
