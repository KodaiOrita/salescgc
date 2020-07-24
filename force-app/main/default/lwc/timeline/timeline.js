import { LightningElement,api } from 'lwc';

export default class Timeline extends LightningElement {
    @api timeline;
    get isQuarterHour(){
        let min = this.timeline.key.slice(2,2);
        console.log(min);
        if(min === '15' || min === '45'){
            return "invisible";
        }
        else {
            return "visible";
        }
    }
}