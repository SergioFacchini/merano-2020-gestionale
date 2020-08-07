import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderComponent } from './elder.component';

describe('ClientComponent', () => {
  let component: ElderComponent;
  let fixture: ComponentFixture<ElderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
