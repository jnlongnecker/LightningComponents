/*
    Created By: Jared Longnecker
    Last Updated: 03/17/2022
    Description: Apex Controller for the ldsAndApex Lightning Web Component
*/

public with sharing class WebController {
    
    // In addition to AuraEnabled, we also need (cacheable=true) to use a method with the wire service
    // Using (cacheable=true) is going to cause us to no longer be able to perform any DML within the method
    @AuraEnabled(cacheable=true)
    public static Account GetAccount() {
        return [SELECT name FROM Account LIMIT 1];
    }

    // Imperative method calls can be made on @AuraEnabled methods without (cacheable=true)
    @AuraEnabled
    public static Account GetAccountWithName(string name) {
        string filter = '%' + name + '%';
        return [SELECT name FROM Account WHERE name LIKE : filter LIMIT 1];
    }
}

/*
    While server side security is on us, as it always is with Apex, client side security is handled
    by something called the Lightning Locker Service, which is provided by the Lightning Component Framework.
    Here's some of the things that it does:

    - Restricts use of eval()
    - Hides global objects such as to window by wrapping them in more secure versions
    - Enforces strict mode, which make code more secure, robust and supported by multiple platforms
    - Blocks access to SF Global Variables
    - Blocks use of third party web components
    - Cleans MIME types of files and blocks dangerous ones (MIME types are certain file types)
*/
