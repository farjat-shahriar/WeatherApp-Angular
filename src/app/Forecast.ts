export class Forecast{
    constructor(public day:string,
        public date : number,
        public icon:string,
        public tempDay:string,
        public tempDayConvertion:number,
        public tempNight:string,
        public tempNightConvertion:number,
        public description:string,
        ){}
}