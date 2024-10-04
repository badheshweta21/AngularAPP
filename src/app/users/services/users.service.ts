import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { IUserData, User } from '../models/user';
import { UsersDefaultPageSize } from '../models/view';
import { UserFieldsDefault } from './../models/view';
import { IUserListResponse, IUserQueryParams } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private page_size: number = UsersDefaultPageSize;
  private seed: string = '1234567890';
  private users_list: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(null);
  private active_fields: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(UserFieldsDefault);

  constructor(
    private http: HttpClient
  ) { }
  serializeObject(obj: any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  public getUsers(params: IUserQueryParams, increment: boolean): Observable<User[]> {
    params.results = params.results || this.page_size;
    params.seed = this.seed;
    let query_string = this.serializeObject(params);
    if (!increment) {
      this.users_list.next(null);
    }
    return this.http.get<IUserListResponse>('https://randomuser.me/api/?' + query_string).pipe(
      map((data: IUserListResponse) => {
        let dataset: IUserData[] = data?.results || [];
        let users: User[] = dataset.map((user: IUserData) => new User(user));
        if (increment && this.users_list.value) {
          this.users_list.next([
            ...this.users_list.value,
            ...users
          ]);
        } else {
          this.users_list.next(users);
        }
        return users || [];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('UsersService:getUsers error', error);
        return throwError(error);
      })
    )
  }
  public usersList(): Observable<User[] | null> {
    return this.users_list.asObservable();
  }

  public activeFields(): Observable<string[]> {
    return this.active_fields.asObservable();
  }

  public setActiveFields(fields: string[]): void {
    this.active_fields.next(fields);
  }

}
