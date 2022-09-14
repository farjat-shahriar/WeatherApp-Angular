import { Component } from '@angular/core';
import { ApiserviceService } from './services/apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  value: any;

  getunitdata(e:any){
     this.value= e;
  }
}
