import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { first, firstValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "https://peticiones.online/api/users/"
  private http = inject(HttpClient);

  /**
   * GETALL()
   * return Promise<IUser[]>
   */
  getAll(page: number): Promise<IResponse> {
    return firstValueFrom(this.http.get<IResponse>(`${this.baseUrl}?page=${page}`))
  }

  getByID(id: string): Promise<[]> {
    return firstValueFrom(this.http.get<[]>(`${this.baseUrl}${id}`))

  }
}
