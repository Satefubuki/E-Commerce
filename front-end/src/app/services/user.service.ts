import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { RootObj } from '../models/root-obj';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private apiService: ApiService) { }

    login(userName: string, passWord: string): Observable<RootObj<User>> {
        const data = {
            username: userName,
            password: passWord
        };
        return this.apiService.post<RootObj<User>>(this.apiService.apiUrl.users.login, data);
    }

    get(id): Observable<RootObj<User>> {
        return this.apiService.get<RootObj<User>>(`${this.apiService.apiUrl.users.home}/${id}`);
    }
}
