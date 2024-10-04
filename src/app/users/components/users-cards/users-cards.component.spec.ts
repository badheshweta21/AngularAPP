import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UsersCardsComponent } from './users-cards.component';
import { UsersService } from '../../services/users.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersMockResults } from '../../data/users-mock';
import { IUserData, User } from '../../models/user';
import { UserFieldsDefault } from '../../models/view';
import { By } from '@angular/platform-browser';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('UsersCardsComponent', () => {
  let component: UsersCardsComponent;
  let fixture: ComponentFixture<UsersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCardsComponent, UserCardComponent ],
      imports: [ MatCardModule, MatIconModule],
      providers: [
        HttpClient,
        HttpHandler,
        UsersService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should render a number of user-card equal to the length of 'users'`, () => {
    const componentDebug = fixture.debugElement;
    component.users = [];
    component.active_fields = UserFieldsDefault;
    UsersMockResults.forEach((result: IUserData) => {
      component.users.push(new User(result));
    });
    fixture.detectChanges();
    let cards = componentDebug.queryAll(By.css('user-card'));
    expect(cards.length).toBe(component.users.length);
    component.users.splice(5, 2);
    fixture.detectChanges();
    cards = componentDebug.queryAll(By.css('user-card'));
    fixture.whenStable().then(() => {
      expect(cards.length).toBe(component.users.length);
    });
  });

});
