import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CityComponent } from '../city/city.component';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() unitvaluedata: EventEmitter<any> = new EventEmitter();
  isSwith:boolean=false;
  getdata: any;
  unitvalue:any
  constructor( private router:Router) { }

  ngOnInit(): void {

  }
  ChangeToFarenhiet(){
    console.log("click")
    this.isSwith =! this.isSwith
    if(this.isSwith==true){   
      // this.unitvalue = 'imperial';
      this.unitvaluedata.emit(this.isSwith);
    } 
    else if(this.isSwith==false){
      // this.unitvalue = 'metric';
      this.unitvaluedata.emit(this.isSwith);
    }
  }
}
