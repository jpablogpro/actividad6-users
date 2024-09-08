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


  getAll(page: number): Promise<IResponse> {
    return firstValueFrom(this.http.get<IResponse>(`${this.baseUrl}?page=${page}`))
  }

  getByID(id: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}${id}`))
  }

  deleteByID(id: string | undefined): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseUrl}${id}`))
  }

  insert(body: IUser): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(`${this.baseUrl}`, body))
  }

  update(user: IUser): Promise<IUser> {
    const body = {first_name: user.first_name, last_name: user.last_name}
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}${user._id}`, body))
  }
}
