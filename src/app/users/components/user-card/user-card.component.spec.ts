import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFields } from '../../models/view';

import { UserCardComponent } from './user-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ],
      imports: [
        MatCardModule,
        MatIconModule
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should not contain any of 'skip_fields' in 'filtered_fields'.`, () => {
    component.ngOnChanges({
      active_fields: new SimpleChange([], UserFields, true)
    });
    fixture.detectChanges();
    let ignores_skip_fields: boolean = true;
    component.skip_fields.forEach((field: string) => {
      if(component.filtered_fields.includes(field)) {
        ignores_skip_fields = false;
      }
    })
    expect(ignores_skip_fields).toBeTrue();
  });
  
});
