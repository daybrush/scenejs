import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSceneComponent } from './ngx-scene.component';

describe('NgxSceneComponent', () => {
  let component: NgxSceneComponent;
  let fixture: ComponentFixture<NgxSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
