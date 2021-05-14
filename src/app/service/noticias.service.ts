import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPages = 0;

  actualCategory = '';

  categoryPages = 0;

  constructor( private http: HttpClient ) { }

  getTopHeadLines() {

    this.headlinesPages++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ve&page=${ this.headlinesPages }`);

  }

  getTopHeadLinesCategory( category: string ) {

    if ( this.actualCategory === category ) {

      this.categoryPages++;

    }else{

      this.categoryPages = 1;
      this.actualCategory = category;

    }


    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ve&page=${ this.categoryPages }&category=${category}`);
  }

  private ejecutarQuery<T>( query: string ) {

    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );

  }
}
