import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

let headlinesPage = 0;
let categoriaActual = '';
let categoriaPage = 0;
const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {

    query = apiUrl + query
    return this.http.get<T>(query, { headers: headers })
  }

  getTopHeadLines() {
    headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${headlinesPage}`);
  }
  getTopHeadLinesCategoria(categoria: string) {

    if (categoria == categoriaActual) {
      categoriaPage++
    } else {
      categoriaPage = 1;
      categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${categoriaPage}`);
  }

}
