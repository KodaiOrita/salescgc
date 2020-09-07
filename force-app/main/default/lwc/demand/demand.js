import { LightningElement,api } from 'lwc';
import Commonsetting from 'c/commonsetting';

export default class Demand extends LightningElement {
    @api demand;
    timelinestarttime = Commonsetting.startTime;
    constwidth = Commonsetting.constwidthperquoter;
    get starttime(){
        //開始時刻
        //項目変更時はこちらも直す
        console.log(this.demand.Id + 'start' + this.demand.startingHour__c);
        console.log(this.demand.Id +  'end' + this.demand.endingTime__c);
        
        let startTime = new Date(this.demand.workDay__c);
        console.log(startTime);

        let h = String(Math.floor(this.demand.startingHour__c / 3600000) + 100).substring(1);
        let m = String(Math.floor((this.demand.startingHour__c - h * 3600000)/60000)+ 100).substring(1);
        let s = String(Math.round((this.demand.startingHour__c - h * 3600000 - m * 60000)/1000)+ 100).substring(1);

        console.log(h + ":" + m +":" + s);
        startTime.setHours(h);
        startTime.setMinutes(m);
        startTime.setSeconds(s);
        
        return startTime;
    }

    get endtime(){
        //終了時刻
        let endTime = new Date(this.demand.workDay__c);
        let h = String(Math.floor(this.demand.endingTime__c / 3600000) + 100).substring(1);
        let m = String(Math.floor((this.demand.endingTime__c - h * 3600000)/60000)+ 100).substring(1);
        let s = String(Math.round((this.demand.endingTime__c - h * 3600000 - m * 60000)/1000)+ 100).substring(1);

        endTime.setHours(h);
        endTime.setMinutes(m);
        endTime.setSeconds(s);

        return endTime;
    }
    @api get StartTimeForRender(){
        let h = String(Math.floor(this.demand.startingHour__c / 3600000) + 100).substring(1);
        let m = String(Math.floor((this.demand.startingHour__c - h * 3600000)/60000)+ 100).substring(1);

        return h + ":" + m;
    }

    @api get EndTimeForRender(){
        let h = String(Math.floor(this.demand.endingTime__c / 3600000) + 100).substring(1);
        let m = String(Math.floor((this.demand.endingTime__c - h * 3600000)/60000)+ 100).substring(1);

        return h + ":" + m;
    }

    diffMin(end,start){
        //終了時刻-開始時刻
        let milliDiff = end.getTime() - start.getTime();
        let minDiff = Math.floor(milliDiff / 1000 / 60);
        
        return minDiff;
    }
    @api get widthbydiffMin(){
        return "width : "+ (this.diffMin(this.endtime,this.starttime) / 15) * this.constwidth + "px";
    }

    @api get startPosition(){

        let TLstartDateTime = new Date(this.demand.workDay__c);
        TLstartDateTime.setHours(this.timelinestarttime.getHours());
        TLstartDateTime.setMinutes(this.timelinestarttime.getMinutes());
        TLstartDateTime.setSeconds(0);

        let milliDiff = this.starttime.getTime() - TLstartDateTime.getTime();
        let minDiff = Math.floor(milliDiff / 1000 / 60);

        return "left :" + (minDiff / 15) * this.constwidth + "px";        
    }
    @api get eachComponentStyle(){
        if (this.starttime.getHours() < this.timelinestarttime.getHours()){
            return this.widthbydiffMin +";" + "left : 0 px"
        }
        return this.widthbydiffMin +";" + this.startPosition;
    }
}