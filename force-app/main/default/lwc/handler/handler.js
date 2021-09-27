import { LightningElement, api } from 'lwc';

export default class Handler extends LightningElement {
    @api message;
    toDisplay;

    handleEvent(event) {

        // We can accept parameters from the event via the detail
        this.toDisplay = event.detail;
    }
}