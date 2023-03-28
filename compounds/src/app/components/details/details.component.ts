import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  details: any;
  editing: boolean = false;
  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.setData(data['id']))
  }

  setData(id) {
    this.editing = false;
    this.id = id;
    this.details = this.http.get(`http://localhost:8000/api/details/${id}`);
  }

  updateDesc(desc) {
   this.http.put(`http://localhost:8000/api/description/${this.id}`, {CompounrDescription: desc}).subscribe( data => this.setData(this.id));
  }
}
