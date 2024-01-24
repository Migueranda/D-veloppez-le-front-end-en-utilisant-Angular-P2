import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic} from '../models/Olympic';
import { Participation } from '../models/Participation';
import { Observable, } from 'rxjs';
import * as olympicData from '../../../assets/mock/olympic.json'

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  // private olympicData =  olympicData;
  // private olympics$ = new BehaviorSubject<any>(undefined);
  // private olympics$ = new BehaviorSubject<Olympic[]>();
  // public olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() : Observable<Olympic[]> {

    return this.http.get<Olympic[]>( '../../../assets/mock/olympic.json').pipe(
      // tap((value) => this.olympics$.next(value)),
      // tap((value) => {
      //   this.olympics$.next(value);
      //   console.log("load initial data -- service ")
      //   console.log(value)
      // }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        // this.olympics$.next(null);
        // this.olympics$.next([]);
        return caught;
      })
    );
  }

  // getOlympics() : Observable<Olympic[]> {
  //   console.log("-- getOlympics")
  //   console.log(this.olympics$)
  //   return this.olympics$.asObservable();
  // }
}
