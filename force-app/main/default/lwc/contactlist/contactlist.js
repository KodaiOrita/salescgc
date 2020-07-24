import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRelatedContacts from '@salesforce/apex/CaseLwcController.getRelatedContacts';
import updateContactInCase from '@salesforce/apex/CaseLwcController.updateContactInCase';
import { getRecord } from 'lightning/uiRecordApi';

export default class Contactlist extends LightningElement {
    _title = 'エラー';
    message = '取引先責任者を選択してください';
    variant = 'error';
    @track selectedValue;
    @api recordId;
    @wire(getRecord,{ recordId:'$recordId', fields: ['case.ContactId']})
    currentcontact;
    
    @wire(getRelatedContacts, { searchId: '$recordId' })
    contacts;

    //@api
    get isContactExist(){
        if(this.currentcontact.data.fields.ContactId.value == null){
            return true;
        } 
        else if(this.currentcontact.data.fields.ContactId.value != null){
            return false;
        }
    }
    
    handleChange(event) {
        this.selectedValue = event.target.value;
    };

    handleLinkContact(event) {
        if(typeof this.selectedValue == "undefined"){
            console.log(this.currentcontact.data.fields.ContactId.value);
            this.showNotification();
        } else {
            updateContactInCase({
                caseId: this.recordId,
                conId: this.selectedValue
            })
            .then(() => {
                return refreshApex(this.contactlist);
            })
            .catch((error) => {
                this.message = 'Error received: code' + error.errorCode + ', ' +
                    'message ' + error.body.message;
            });
            location.reload();
        }
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
}