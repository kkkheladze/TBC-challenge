import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    constructor(private http: HttpClient) {
        this.http
            .get<{ users: User[] }>(environment.api)
            .toPromise()
            .then((res) => {
                this.users$.next(res!.users);
            });
    }

    getUsers() {
        return this.users$;
    }
    addUser(user: User) {
        const currentUsers = this.users$.getValue();
        this.users$.next([user, ...currentUsers]);
    }
    deleteUser(index: number) {
        const currentUsers = this.users$.getValue();
        const updatedUsers = currentUsers.filter((user, i) => index !== i);
        this.users$.next(updatedUsers);
    }
}
