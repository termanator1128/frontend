import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PtSummaryComponent} from './pt-summary.component';

describe('PtSummaryComponent', () => {
  let component: PtSummaryComponent;
  let fixture: ComponentFixture<PtSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PtSummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
