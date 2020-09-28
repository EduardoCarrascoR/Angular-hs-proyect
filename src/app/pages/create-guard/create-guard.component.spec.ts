import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuardComponent } from './create-guard.component';

describe('CreateGuardComponent', () => {
  let component: CreateGuardComponent;
  let fixture: ComponentFixture<CreateGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
