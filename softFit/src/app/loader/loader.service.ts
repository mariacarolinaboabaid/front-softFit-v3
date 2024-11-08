import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new BehaviorSubject<boolean>(false);
  isLoaderVisible$ = this.loaderSubject.asObservable();

  showLoader() {
    this.loaderSubject.next(true);
  };

  hideLoader() {
    this.loaderSubject.next(false);
  };
  
  getLoaderState() {
    this.loaderSubject.value;
  };
}
