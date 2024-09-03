import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { first, firstValueFrom } from 'rxjs';

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
  getAll(page: number): Promise<IUser[]> {
    return firstValueFrom(this.http.get<IUser[]>(`${this.baseUrl}?page=${page}`))
  }

  getByID(id: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}${id}`))

  }
}
