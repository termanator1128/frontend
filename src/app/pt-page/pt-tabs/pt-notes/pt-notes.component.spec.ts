import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {PtNotesComponent} from './pt-notes.component'

describe('PtNotesComponent', () => {
  let component: PtNotesComponent;
  let fixture: ComponentFixture<PtNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PtNotesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
