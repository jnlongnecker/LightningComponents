import { LightningElement, track, api } from 'lwc';

// We can import code from other JS files using the import keyword
// If we want to, we can also rename our imports using the as keyword
import { getGuitarist, master as masterList } from './guitaristUtility';
// We need to specify a relative path to the file we're importing from. We can also import from another component using c/componentName

// The default export can only be used once, and you must rename the default export when you import
// You need not specify a name when using the default export
export default class Javascript extends LightningElement {

    // Decorators are special functions that are called on classes, fields and functions during their definition
    // We're going to look at @wire later, but we'll look at @track and @api right now

    // Fields are normally reactive, but the normal reactivity is shallow. To deeply track a complex field, use the @track decorator
    @track
    allGuitarists = [];

    // If we decorate a field with @api, it turns it into an attribute for the component!
    @api
    greeting = "No greeting set, but hello!";

    // What if we want it to be a property?
    myNumber;

    // We can write get and (optional) set for our field instead!
    @api
    get number() {
        return this.myNumber;
    }

    // If a set is defined, a get must also be defined. Only one should be decorated with @api. By convention, this is the get
    set number(value) {
        if (isNaN(value) || value < 0) return;
        this.myNumber = value;

        // Notice we need to use this.setAttribute() to actually reflect the change of the attribute
        this.setAttribute('number', this.myNumber);
    }

    // Here, we're making use of that imported method
    addGuitarist() {
        this.allGuitarists.push(getGuitarist());
    }

    clearList() {
        this.allGuitarists = [];
    }

    setToMaster() {
        this.allGuitarists = [...masterList];
    }
}

/*
    Perhaps you noticed that 'lwc' is just something we can name to import from. We have other places than lwc and our
    relative paths to import from, we also have Salesforce modules. Each one is going to being with @salesforce. Let's go over these:
    - @salesforce/schema : Used to access org object and field data
    - @salesforce/apex : Used to access apex classes. One of the more commonly used ones as we will call with the @wire decorator
      - Syntax: @salesforce/apex/namespace.className.methodName
    - @salesforce/community : Used to access community site information
    - @salesforce/client/formFactor : Retrieves information about the device running the browser
      - Possible values: Large (desktop), Medium (tablet), Small (mobile)
    - @salesforce/label : Used to import custom labels
    - @salesforce/resourceUrl : Used to access static resources
    - @salesforce/user : Used to access information about the context user
    - @salesforce/userPermission : Used to access wheter the current user has a certain permission
*/