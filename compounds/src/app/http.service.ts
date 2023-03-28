import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  getCompounds(limit, offset) {
    return this.http.get(`http://localhost:8000/api/compounds?limit=${limit}&offset=${offset}`)
  }
  
  addComponent(data){
    return this.http.post(`http://localhost:8000/api/compounds`, data);
  }

  delete(id) {
    return this.http.delete(`http://localhost:8000/api/compound/${id}`);
  }

  getDetails(id) {
    return this.http.get(`http://localhost:8000/api/details/${id}`);
  }

  updateDescription(id, data) {
    return this.http.post(`http://localhost:8000/api/description/${id}`, data);
  }
}
