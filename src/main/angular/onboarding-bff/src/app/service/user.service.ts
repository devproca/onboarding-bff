import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

const BASE_URI = './api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userList: UserModel[] = [];
  activeUser: BehaviorSubject<UserModel> = new BehaviorSubject({userId:'',username:'',lastName:'',firstName:'',phoneNumbers: []});
  refreshUserList: Subject<UserModel[]> = new Subject();

  constructor(private http: HttpClient) {}

  setActiveUser(user: UserModel): void {
    this.activeUser.next(user);
  }
  get getUsers(): UserModel[] {
    return [...this.userList];
  }

  findAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BASE_URI).pipe(
      map((users: UserModel[]) => {
        this.userList = users;
        return users;
      })
    );
  }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(BASE_URI, user).pipe(
      map((user: UserModel) => {
        this.userList.push(user);
        this.refreshUserList.next(this.userList);
        return user;
      })
    );
  }
  delete(deletedUser: UserModel) {
    return this.http.delete<void>(`${BASE_URI}/${deletedUser.userId}`).pipe(
      map(() => {
        this.userList = this.userList.filter((user) => user.userId !== deletedUser.userId);
        this.refreshUserList.next(this.userList);
      })
    );
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${BASE_URI}/${user.userId}`, user);
  }
}
