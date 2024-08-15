import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PagesServiceService {
  private baseURL: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);

  getAll() : Promise<number>{
    return firstValueFrom(this.http.get<number>(this.baseURL));
  }
}
