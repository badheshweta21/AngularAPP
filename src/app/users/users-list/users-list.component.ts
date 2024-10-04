import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDefaultInfiniteScrollOffset, UsersDefaultPageIndex } from '../models/view';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public loading: boolean = false;
  private page_offset: number = 0;
  showMessage: boolean = true;
  increment: boolean = false;
  showErrorMsg = false
  

  constructor(
    private service: UsersService) { }

  ngOnInit(): void {}

  loadUsers(): boolean  {
    this.showMessage = false;
      if(this.loading) {
        return false;
      }
      this.loading = true;
      this.service.getUsers({page:this.page_offset}, this.increment).subscribe((data) => {
        if(data){  
          this.loading = data === null;
          this.page_offset =this.page_offset+1;
          this.increment = true;
          this.loading = false;
          this.showMessage = false;
        }
      }, err => {
          this.showErrorMsg = true;
          this.showMessage = false;
          this.loading = false
      });
      return true;
    }
  }


