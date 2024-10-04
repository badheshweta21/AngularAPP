import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.scss']
})
export class UsersCardsComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public active_fields: string[] = [];
  private subs_users: Subscription | undefined;
  private subs_fields: Subscription | undefined;
  removeUser = false;
  showMessageRemovedAll = false;

  constructor(
    private users_service: UsersService
  ) { }

  ngOnInit(): void {
    this.subs_users = this.users_service.usersList().subscribe((data: User[]|null) => {
      this.users = data?.length ? data : [];
    });

    this.subs_fields = this.users_service.activeFields().subscribe((data: string[]) => {
      this.active_fields = data;
    });
  }

  removeUserEvent(event: User) : void{
    this.removeUser = true;
    setTimeout(() => {
      this.users = this.users.filter(data => data.userId !== event.userId);
      this.removeUser = false;
      if(!this.users.length){
        this.showMessageRemovedAll = true
      }
    }, 1000)
    
  }

  ngOnDestroy(): void {
    if(this.subs_users) {
      this.subs_users.unsubscribe();
    }
    if(this.subs_fields) {
      this.subs_fields.unsubscribe();
    }
  }

}
