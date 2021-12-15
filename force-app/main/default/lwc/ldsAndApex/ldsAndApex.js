import { LightningElement, wire, api, track } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import GetAccount from "@salesforce/apex/WebController.GetAccount";
import GetAccountWithName from "@salesforce/apex/WebController.GetAccountWithName";

// SF says to import references to objects and fields as it can now ensure dependencies and prevent objects and fields from deletion
// It will also cascade renames into the code so it reflects the change. It's just better
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";

// The Lightning Data Service allows us to manipulate records by using its functionality. The simplest way to use this is the prebuilt components that use LDS
// LDS is built on top of the UI API, but we can leverage that ourselves
export default class LdsAndApex extends LightningElement {
  @api recordId;
  @track myAccount;
  @track error;

  // So, what is the wire service? It's a way to communicate with the server in a reactive way that caches the data.
  // Data gets cached, and whenever a reactive variable changes, the wire services gets the new data

  // Here, we use the wire service to pull the name field of an Account into the record variable
  // Note the use of the '$' before recordId variable name. This sets this value to be reactive, so it'll refresh when the id changes
  @wire(getRecord, { recordId: "$recordId", fields: [ACCOUNT_NAME_FIELD] })
  record;
  // Something to note: the wire service is good for reading, but not creating, updating or deleting
  // This is why we use the UI API without @wire to perform these operations

  // We can use the wire service with our own custom methods as well
  @wire(GetAccount)
  someAccount;

  // Getting data from the service is verbose, so a custom get is often times used
  get name() {
    return this.record.data.fields.Name.value;
  }

  // Custom methods is less verbose. Note we still use data, but no longer have to use fields and value
  get apexName() {
    return this.someAccount.data.Name;
  }

  // We can also wire functions. This isn't restricted to custom methods, we can use the UI API as well
  @wire(GetAccount)
  someFunction({ error, data }) {
    // We should only do this if we want to perform some logic on the response and separate it out
    if (data) {
      console.log(`We got this data: ${data}!`);
    } else if (error) {
      console.log(`We got this error: ${error}!`);
    }
  }

  // One of the downsides of the wire service is we don't control when it gets fired, and we also MUST cache the value
  // If we don't want that, we can call the method imperatively
  retrieveAccount() {
    // Call the method
    GetAccount()
      // Callback on a response
      .then((result) => {
        this.myAccount = result;
      })
      // Callback if there's an error
      .catch((error) => {
        this.error = error;
      });
  }

  // If we have a method that takes a parameter, we pass in the parameter via object syntax just like in Aura
  retrieveAccountByName() {
    GetAccountWithName({ name: "Edge" })
      .then((result) => {
        this.myAccount = result;
      })
      .catch((error) => {
        this.error = error;
      });
  }

  funFunction() {
    let someNum = 0;
    for (let index = 0; index < 50; index++) {
      someNum += index;
    }
    console.log(someNum);
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
