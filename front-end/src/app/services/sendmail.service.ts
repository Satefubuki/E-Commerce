import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private apiService: ApiService) { }

  // get all
//   list(): Observable<> {
//     return this.apiService.get<>(`${this.apiService.apiUrl.stories.home}?${queryString}`);
//   }
  
}