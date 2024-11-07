import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sidenav } from './sidenav.interface';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(private http: HttpClient) { }

  getSidenavData(path: string) {
    return this.http.get<Sidenav>(path);
  }
}
