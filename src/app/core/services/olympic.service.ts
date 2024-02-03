import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { Olympic} from '../models/Olympic';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class OlympicService {
  
  constructor(private http: HttpClient) {}
  loadInitialData() : Observable<Olympic[]> {
    return this.http.get<Olympic[]>( '../../../assets/mock/olympic.json').pipe(
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        return caught;
      })
    );
  }

}
