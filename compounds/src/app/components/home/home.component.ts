import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public compounds: Observable<any> = of(null);
  public pageNum: number = 1;
  public array: null[] = [];

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.compounds = this.http.get('http://localhost:8000/api/compounds?limit=10&offset=0').pipe(tap(data => this.array.length = Math.ceil(data.count[0].COUNT/10)));
  }

  getData(pageNum) {
    this.pageNum = pageNum;
    let offset = (this.pageNum - 1)*10;
    this.compounds = this.http.get(`http://localhost:8000/api/compounds?limit=10&offset=${offset}`);
  }

  addComp(data) {
    this.http.post(`http://localhost:8000/api/compounds`, data).subscribe( data => this.ngOnInit())
  }

  deleteComp(id) {
    this.http.delete(`http://localhost:8000/api/compound/${id}`).subscribe(()=>this.ngOnInit())
  }
}
