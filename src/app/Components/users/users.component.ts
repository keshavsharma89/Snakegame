import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  name:string;
  age:number;
  
  constructor() { 
  }

  ngOnInit() {
	this.name='keshav';
	this.age=28;
  }

}
