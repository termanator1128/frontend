import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {PtTabsComponent} from './pt-tabs.component'

describe('PtTabsComponent', () => {
  let component: PtTabsComponent
  let fixture: ComponentFixture<PtTabsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PtTabsComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PtTabsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
