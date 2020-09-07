import { LightningElement , wire, api, track } from 'lwc';
import getWorkShifts from '@salesforce/apex/LWCWorkShiftController.getWorkShifts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Workshiftwrapper extends LightningElement {
    YYMM = '2020-08';
    date = '';
    valueDateorMonth = '';
    @track workshifts;
    error;
    isSeleted = false;
    timelines = [];
    isOnlyShift = false;
    _title = 'エラー';
    message = '月か日付を指定してください。';
    variant = 'error';

    handledateorMonthChange(event) {
        this.valueDateorMonth = event.target.value;
    }

    /*get today() {
        let today = new Date();
        let y = today.getFullYear();
        let m = today.getMonth() + 1;
        let d = today.getDate();

        let getStringDate = (year,month,date)=>{
            let StrMM = month;
            let StrDD = date;
            if(month < 10){
                StrMM = "0" + month;
            }
            if(date < 10){
                StrDD = "0" + date;
            }
            
            return year + "-" + StrMM +"-" + StrDD;
        }
        
        let dateString = getStringDate(y,m,d);
        return dateString;
    }
    */

    handleDateChange(event) {
        this.date = event.detail.value;
    }


    //月の条件を作るよ。
    get monthoptions() {
        //リスト作成
        let months = [];

        //オブジェクト作成
        let thisMonth = new Date();

        let getStringMonth = (year,month)=>{
            let StrMM = month;
            if(month < 10){
                StrMM = "0" + month;
            }
            return year + '-' + StrMM;
        }

        for(let i = 0; i < 3; i++){
            let targetMonth = new Date();
            targetMonth.setMonth(thisMonth.getMonth() + i);

            let y = targetMonth.getFullYear();
            let m = targetMonth.getMonth() + 1;
            let strMonth = getStringMonth(y,m);
            let month = { label : strMonth,value : strMonth};
            months.push(month);        
        }
        return months;
    }

    handleMonthChange(event) {
        this.YYMM = event.detail.value;
    }


    get monthSelect(){
        if( this.valueDateorMonth !== "月指定"){
            return "displayNone";
        }
    }
    
    get dateSelect(){
        if( this.valueDateorMonth !== "日付指定"){
            return "displayNone";
        }
    }

    handleonlyShiftExist(event){
        console.log(event.target.checked);
        if( event.target.checked === true ){
            this.isOnlyShift = true;
        }
        if( event.target.checked === false ){
            this.isOnlyShift = false;
        }
    }
    handleSearchShift() {
        if( this.valueDateorMonth === '' ){
            this.showNotification();
        } else {
            getWorkShifts({ YYMM: this.YYMM })
                .then((result) => {
                    this.error = undefined;
                    this.workshifts = result;
                    this.isSeleted = true;
                    let d1 = new Date();
                    console.log(d1 + 'check1 will be object returned by APEX'+ this.workshifts);                   
                })
                .catch((error) => {
                    console.log('wakewakame' + error);
                    this.workshifts = undefined;
                    this.error = error;
                });
            }
                    let d2 = new Date();
                    console.log(d2 + 'check2 will be undefined'+ this.workshifts);   
    }
    //取引先責任者が選択されていない場合エラーをトーストで表示
    showNotification() {
        const evt = new ShowToastEvent({
            title: this._title,
            message: this.message,
            variant: this.variant
        });
        this.dispatchEvent(evt);
    };

    //時間軸の配列をfor文で作るよ
    constructor(){
        super();
        //何分おきにタイムテーブルを作成するか決定。
        const TimeSpliter = 30;
        
        let Time = new Date();
        Time.setHours(7);
        Time.setMinutes(0);
        Time.setSeconds(0); 
        this.starttime = Time;

        let EndTime = new Date();
        EndTime.setHours(20);
        EndTime.setMinutes(0);
        EndTime.setSeconds(0); 

        let TimeDiff = EndTime.getTime() - Time.getTime();
        let TimeDiffMin = TimeDiff / 1000 / 60;
        let NumIterate = TimeDiffMin / TimeSpliter;
        
        let getStringhour = (hour,min)=>{
            let hh = hour;
            let mm = min;
            if(hour < 10){
                hh = "0" + hour;
            }
            if(min < 10){
                mm = "0" + min
            }
            return hh + ':' + mm
        }

        for(let i=0;i<NumIterate; i++){
            //let m = new Map();
            let obj ={};
            let addSeconds = Time.getTime() + ((60 * 1000) * TimeSpliter * i);
            let day = new Date(addSeconds);
            let hour =day.getHours();
            let min =day.getMinutes();

            let StrTime = getStringhour(hour,min);
            //mapだとうまくいかない。
            //m.set('key',StrTime);
            
            obj.key=StrTime;
            this.timelines.push(obj);
        }
    }
}