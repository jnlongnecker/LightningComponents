import { LightningElement } from 'lwc';

export default class LifecycleHooks extends LightningElement {
    numClicks = 0;

    handleClick() {
        this.numClicks++;
    }

    // Lifecycle hooks are special methods that get executed at certain points in the component's lifecycle

    // The constructor gets run when the component is created. It is the first piece of code run for a component
    constructor() {
        // All constructors must begin with the super call to the LightningElement constructor
        super();
        alert("Component has been created!");
    }

    // The connectedCallback gets run when the component gets inserted into the DOM
    connectedCallback() {
        alert("Component has been inserted!");
    }

    // The renderedCallback gets run every single time the component is re-rendered, which can be many, many times
    renderedCallback() {
        alert("We've been rendered!");
    }

    // The disconnectedCallback gets run when the component is removed from the DOM
    disconnectedCallback() {
        alert("Component has been removed! Bye bye!");
    }
}