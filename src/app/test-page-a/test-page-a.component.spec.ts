import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestPageAComponent } from './test-page-a.component';

describe('TestPageAComponent', () => {
  let component: TestPageAComponent;
  let fixture: ComponentFixture<TestPageAComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPageAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPageAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
