import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStageComponent } from './my-stage.component';

describe('MyStageComponent', () => {
  let component: MyStageComponent;
  let fixture: ComponentFixture<MyStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStageComponent]
    });
    fixture = TestBed.createComponent(MyStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
