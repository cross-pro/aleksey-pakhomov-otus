import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedWordComponent } from './repeated-word.component';

describe('RepeatedWordComponent', () => {
  let component: RepeatedWordComponent;
  let fixture: ComponentFixture<RepeatedWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatedWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatedWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
