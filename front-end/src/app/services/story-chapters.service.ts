import { Injectable } from '@angular/core';
import { StoriesChapter } from '../models/stories-chapter';
import { RootObj } from '../models/root-obj';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryChaptersService {

  constructor(private apiService: ApiService) { }

  list(): Observable<RootObj<[StoriesChapter]>> {
    return this.apiService.get<RootObj<[StoriesChapter]>>(this.apiService.apiUrl.chapters.home);
  }
  // get(id): Observable<RootObj<Story>> {
  //   return this.apiService.get<RootObj<Story>>(`${this.apiService.apiUrl.stories.home}/${id}`);
  // }
  listByStoryId(id): Observable<RootObj<[StoriesChapter]>> {
    return this.apiService.get<RootObj<[StoriesChapter]>>(`${this.apiService.apiUrl.chapters.listByStoryId}/${id}`);
  }

}
