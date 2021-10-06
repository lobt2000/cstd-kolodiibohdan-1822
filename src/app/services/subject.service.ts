import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  resetGame: Subject<any> = new Subject();
  resetMenu: Subject<any> = new Subject();
  constructor() { }
}
