import { LightningElement,api } from 'lwc';

export default class Demand extends LightningElement {
    @api demand;
    constwidth = 5;
    @api get diffMin(){
        //開始時刻
        let startTime = new Date(this.demand.workDay__c);
        startTime.setHours(this.demand.startingTime__c.slice(0,2));
        startTime.setMinutes(this.demand.startingTime__c.slice(3,2));
        startTime.setSeconds(this.demand.startingTime__c.slice(6,2));


        //終了時刻
        let endTime = new Date(this.demand.workDay__c);
        endTime.setHours(this.demand.endingTime__c.slice(0,2));
        endTime.setMinutes(this.demand.endingTime__c.slice(3,2));
        endTime.setSeconds(this.demand.endingTime__c.slice(6,2));
    
        //終了時刻-開始時刻
        let milliDiff = endTime.getTime() - startTime.getTime();
        let minDiff = Math.floor(milliDiff / 1000 / 60);
        
        return minDiff;
    }
    @api get widthbydiffMin(){
        return (this.diffMin / 15) * this.constwidth;
    }
}