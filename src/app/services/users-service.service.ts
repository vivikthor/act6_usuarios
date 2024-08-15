import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { find, first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  private baseURL: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);

  getAll(page: number = 1): Promise<IUser[]> {
    return firstValueFrom(
      this.http.get<IUser[]>(`${this.baseURL}?page=${page}`)
    );
  }

  getById(_id : string) : Promise<IUser>{
    return firstValueFrom(this.http.get<IUser>(`${this.baseURL}${_id}`))
  }

  delete(_id: string): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseURL}${_id}`));
  }
}
