import { LightningElement } from 'lwc';

export default class LwcBasics extends LightningElement {

    // This is a field of the class. An instance of a field is called a property
    btnLabel = "Hide";
    detailsActive = true;

    myGuitarists = [
        { name: "Mark Morton", image: "https://d2emr0qhzqfj88.cloudfront.net/s3fs-public/2018-11/Mark-Morton-header-mobile.jpg" },
        { name: "Willie Adler", image: "https://media.gettyimages.com/photos/willy-adler-of-lamb-of-god-performs-on-stage-at-o2-academy-on-9-2010-picture-id96548110" }
    ];

    // We're not manipulating the DOM here! Very important, we only change our properties
    handleClick() {
        this.detailsActive = !this.detailsActive;
        this.btnLabel = (!this.detailsActive ? "Show" : "Hide");
    }
}