import { LightningElement,api } from 'lwc';
import Commonsetting from 'c/commonsetting';

export default class Demand extends LightningElement {
    @api demand;
    timelinestarttime = Commonsetting.startTime;
    constwidth = Commonsetting.constwidthperquoter;
    get starttime(){
        //開始時刻
        let startTime = new Date(this.demand.workDay__c);
        startTime.setHours(this.demand.startingTime__c.slice(0,2));
        startTime.setMinutes(this.demand.startingTime__c.slice(3,2));
        startTime.setSeconds(this.demand.startingTime__c.slice(6,2));
        
        return startTime;
    }

    get endtime(){
        //終了時刻
        let endTime = new Date(this.demand.workDay__c);
        endTime.setHours(this.demand.endingTime__c.slice(0,2));
        endTime.setMinutes(this.demand.endingTime__c.slice(3,2));
        endTime.setSeconds(this.demand.endingTime__c.slice(6,2));

        return endTime;
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