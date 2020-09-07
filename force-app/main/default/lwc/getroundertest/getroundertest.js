import { LightningElement,wire } from 'lwc';
import getRounders from '@salesforce/apex/LWCWorkShiftController.getRounders';

export default class Getroundertest extends LightningElement {
    @wire(getRounders) rounders;
}