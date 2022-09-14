import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Weather } from '../models/data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Forecast } from '../Forecast';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() getItem = '';
  ApiData: any;
  location: any;
  Data: Array<any> = [];
  element: Forecast[] = [];
  today: number = Date.now();
  date: any;
  time: any;
  dateconvertion: any;
  listItem: any;
  newlist: any;
  weeklyforecast: boolean = false;
  firstweekForecast: Forecast[] = [];;
  secondweekForecast: Forecast[] = [];;
  mesuresunrise: any;
  mesuresunset: any;
  temp: any;
  regvalue: any
  FarenheitTemp: any
  tempDayConvertion: any;
  tempNightConvertion: any;
  presuremesure: any

  register = new FormGroup({
    name: new FormControl(''),
  })
  value: any;
  forecastDays !: number;

  constructor(private get: ApiserviceService , private ngxloader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxloader.start();
    setTimeout(() => {
      this.ngxloader.stop(); 
    },100);
    this.apiCaller('jamalpur', 'metric')
  }
  collectionregdata() {
    // console.log(this.register.value);
    this.regvalue = this.register.value.name;
    this.apiCaller(this.register.value.name, 'metric');
  }

  // ngOnChanges() {
  //   this.apiCaller(this.regvalue, this.getItem);
  // }


  apiCaller(location: any, unit: any) {
    //for current
    this.get.weather(location, unit).subscribe((res) => {
      this.ApiData = res;
      console.log(this.ApiData);
     
      this.mesuresunrise = (this.ApiData.sys.sunrise * 1000);
      this.date = new Date(parseInt(this.mesuresunrise));
      // this.time = this.date.toLocaleTimeString();
      this.presuremesure = Math.round(this.ApiData.main.pressure / 1.333)
      this.mesuresunset = (this.ApiData.sys.sunset * 1000);
      this.dateconvertion = new Date(parseInt(this.mesuresunset));
      // this.time = this.dateconvertion.toLocaleTimeString();

      this.temp = Math.round(this.ApiData.main.temp);
      this.FarenheitTemp = Math.round(this.temp * 1.8) + 32;
    })
   
    // for forecast
    this.get.forecast(location, unit).subscribe((result) => {
      this.Data = result;
      // console.log(this.Data);

      for (let i = 1; i < result.list.length; i++) {
        const temporary = new Forecast(
          this.listItem = result.list[i].dt,
          this.newlist = (this.listItem * 1000),
          result.list[i].weather[0].icon,
          result.list[i].temp.day,
          this.tempDayConvertion = Math.round((result.list[i].temp.day * 1.8) + 32),
          result.list[i].temp.night,
          this.tempNightConvertion = Math.round((result.list[i].temp.night * 1.8) + 32),
          result.list[i].weather[0].description,
        )
        this.element.push(temporary)
      }
      this.firstweekForecast = this.element.slice(0, 7);
      this.secondweekForecast = this.element.slice(7, 14);
      this.recalculateForecastDays();
  
      // console.log(this.element);
    })
    this.element = [];
    this.register.reset({});
  }

  secondWeek() {
    this.weeklyforecast = !this.weeklyforecast;
    this.recalculateForecastDays();
  }

  recalculateForecastDays() {
    const firstWeekForecastLength = this.firstweekForecast.length;
    const secondWeekForecastLength = this.secondweekForecast.length;
    this.forecastDays = !this.weeklyforecast ?
      firstWeekForecastLength : firstWeekForecastLength + secondWeekForecastLength;
  }

}
