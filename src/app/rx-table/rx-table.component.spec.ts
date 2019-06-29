import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RxTableComponent} from './rx-table.component';

describe('RxTableComponent', () => {
  let component: RxTableComponent;
  let fixture: ComponentFixture<RxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RxTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
