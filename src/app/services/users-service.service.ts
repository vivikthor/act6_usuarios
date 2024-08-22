import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { find, first, firstValueFrom } from 'rxjs';
import { InputSwitch } from 'primeng/inputswitch';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  private baseURL: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);

  insert(body: IUser): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(this.baseURL, body));
  }
  getAll(page: number = 1): Promise<IUser[]> {
    return firstValueFrom(
      this.http.get<IUser[]>(`${this.baseURL}?page=${page}`)
    );
  }

  getById(_id: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseURL}${_id}`));
  }

  update(_id: string, body : IUser): Promise<IUser> {
    return firstValueFrom(this.http.put<IUser>(`${this.baseURL}${_id}`,body));
  }

  delete(_id: string): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseURL}${_id}`));
  }

  // genId(): string {
  //   const letters = [
  //     'a',
  //     'b',
  //     'c',
  //     'd',
  //     'e',
  //     'f',
  //     'g',
  //     'h',
  //     'i',
  //     'j',
  //     'k',
  //     'l',
  //     'm',
  //     'n',
  //     'o',
  //     'p',
  //     'q',
  //     'r',
  //     's',
  //     't',
  //     'u',
  //     'v',
  //     'w',
  //     'x',
  //     'y',
  //     'z',
  //   ];
  //   const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //   const arrChar = letters.concat(numbers);
  //   const randomChar = () => {
  //     const randomIndex = Math.floor(Math.random() * arrChar.length);
  //     return arrChar[randomIndex];
  //   };
  //   let randomString = '';
  //   for (let i = 0; i < length; i++) {
  //     randomString += randomChar();
  //   }
  //   return randomString;
  // }
}
