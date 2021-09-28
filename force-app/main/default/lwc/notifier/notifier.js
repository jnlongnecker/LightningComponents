import { LightningElement, api, wire } from 'lwc';



export default class Notifier extends LightningElement {

    fireEvent() {

        // We can create an event by creating a new CustomEvent
        let myEvent = new CustomEvent('customevent', { detail: 'But I don\'t wanna eat broccoli!', bubbles: false, composed: false });
        // If we want to pass a parameter, we pass it via detail
        // NOTE: The parameter should be a primitive. If you need to send something else, copy it and then send it
        // JS will pass non-primitives by reference, meaning that your handler can modify data in your component!

        // This is the default configuration for an event. Events do not ever capture in LWC
        myEvent.bubbles; // false
        myEvent.composed; // false
        // bubbles: true allows the event to bubble
        // composed: true allows the event to pass the shadow boundary

        // We can fire a custom event very simply, by using this.dispatchEvent()
        this.dispatchEvent(myEvent);

        // So what are use cases for setting bubbles: true and composed: true? Let's go over them:
        /*
            bubbles: true, composed: false
            - Fire an event that is only handled within the firing component (and internal event). Parent component won't be able to handle
            - Fire an event from a slotted element that bubbles in the parent component

            bubbles: true, composed: true
            - Probably shouldn't use this ever
            - Because it bubbles through potentially tons of components, it could cause some naming collisions, so you have to name
              it something that won't cause a collision and cause the wrong action to fire
        */
        // So really don't ever set composed: true unless you have a very specific use case
    }
}