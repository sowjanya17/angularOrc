import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Posts} from '../interfaces/posts';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  constructor(private http: HttpClient) { }

  getTilesData() {
    return this.http.get(environment.configUrl);
  }

  upVote(item: any) {
    const upvoteUrl = environment.upvoteUrl + item.id;
    return this.http.post<Posts>(upvoteUrl, item);
  }
}
