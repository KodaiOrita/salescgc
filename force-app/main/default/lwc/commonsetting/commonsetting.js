import { LightningElement } from 'lwc';

export default class Commonsetting extends LightningElement {
    //timeline.cssの.timeaxisにて時間軸のwidthを定義(30分単位)
    static constwidthperquoter = 20;
    static test = 'test';
    
    //時間軸の配列をfor文で作るよ
    static get startTime(){
        let Time = new Date();
        Time.setHours(7);
        Time.setMinutes(0);
        Time.setSeconds(0); 
        return Time;
    }
    /*
    static get endTime(){
        let EndTime = new Date();
        EndTime.setHours(20);
        EndTime.setMinutes(0);
        EndTime.setSeconds(0); 
        return EndTime
    }
    static get timeline(){
        let timelines = [];
        //何分おきにタイムテーブルを作成するか決定。
        const TimeSpliter = 30;

        let TimeDiff = endTime.getTime() - startTime.getTime();
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
            timelines.push(obj);
        }
        return timelines;
    }
    */
}