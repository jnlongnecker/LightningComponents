import { LightningElement } from 'lwc';

export default class JsDemo extends LightningElement {
    render = false;
    btnText = "Start";

    renderChild() {
        this.render = !this.render;
        this.btnText = (this.btnText == "Start" ? "Stop" : "Start");
    }
}