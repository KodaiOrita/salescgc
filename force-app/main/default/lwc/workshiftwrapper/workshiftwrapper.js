import { LightningElement } from 'lwc';
import { workshifts } from 'c/workshiftdata';
export default class Workshiftwrapper extends LightningElement {
    workshifts = workshifts;
    timelines = [];
    static starttime;
    static test = 'test';
    

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
        console.log(NumIterate);
        
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