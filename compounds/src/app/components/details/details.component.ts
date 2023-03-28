import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  details: any;
  editing: boolean = false;
  constructor(public activatedRoute: ActivatedRoute, private service: HttpService) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.setData(data['id']))
  }

  setData(id) {
    this.editing = false;
    this.id = id;
    this.details = this.service.getDetails(id);
  }

  updateDesc(desc) {
    this.service.updateDescription(this.id, {CompounrDescription: desc}).subscribe( data => this.setData(this.id));
  }
}
