import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../../models/user';
import { UserFieldsDict } from './../../models/view';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent implements OnChanges {

  @Input() user: User;
  @Input() active_fields: string[] = [];
  @Output() removeUserFromList: EventEmitter<User> = new EventEmitter<User>();
  @Input() removingUser = false;

  public filtered_fields: string[] = [];
  public field_names: any = UserFieldsDict;
  public skip_fields: string[] = ['name', 'picture'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['active_fields']) {
      this.filtered_fields = changes['active_fields'].currentValue.filter((col: string) => !this.skip_fields.includes(col));
    }
  }

  removeUser(userData: any): void {
    this.removingUser = true;
    this.removeUserFromList.emit(userData)

  }

}
