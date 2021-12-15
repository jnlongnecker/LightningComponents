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
