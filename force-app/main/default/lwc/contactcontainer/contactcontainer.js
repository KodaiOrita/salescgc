import { LightningElement, api, wire, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/CaseLwcController.getRelatedContacts';

export default class Contactcontainer extends LightningElement {
    @api recordId;
    @wire(getRelatedContacts, { searchId: '$recordId' })
    contacts;
}