import { LightningElement, wire } from 'lwc';

// If we want to communicate across the DOM, we can use the Lightning Message Service
// Note the use of __c here to refer to the custom channel
import myChannel from '@salesforce/messageChannel/myChannel__c';
import {
    subscribe, publish, MessageContext
} from 'lightning/messageService';

export default class MessageService extends LightningElement {

    // Used to set the scope of the subscription
    @wire(MessageContext)
    context;

    // If we want to communicate across the DOM, we use the Lightning Message Service
    // This functions using a pub/sub architecture, where you publish to a channel and those that are subscribed recieve the message
    // These channels are not restricted to page, only to an application and will work between LWC, LAC, VF pages and across namespaces
    // You can't use this in VF pages on an experience site or in VF tabs. For those, you have to use the pubsub module (from GitHub)

    constructor() {
        super();

        // We can subscribe to a channel using the subscribe method imported from the Message Service
        // We pass in the context, what channel we subscribe to, and the callback when a message is posted
        this.subscription = subscribe(
            this.context, myChannel, (message) => this.messagePosted(message)
        );
    }

    messagePosted(message) {
        console.log(`This is the message: ${message.myMessage}`);
    }

    postMessage() {
        const data = { myMessage: 'Hello everybody!' };

        // We can use the publish() method to post a message to the channel
        publish(this.context, myChannel, data);
    }
}