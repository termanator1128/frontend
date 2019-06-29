import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {RxFormComponent} from './rx-form.component'

describe('RxFormComponent', () => {
  let component: RxFormComponent;
  let fixture: ComponentFixture<RxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RxFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
