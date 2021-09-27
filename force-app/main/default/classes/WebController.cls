public with sharing class WebController {
    
    // In addition to AuraEnabled, we also need (cacheable=true) to use a method with the wire service
    @AuraEnabled(cacheable=true)
    public static Account GetAccount() {
        return [SELECT name FROM Account LIMIT 1];
    }

    @AuraEnabled
    public static Account GetAccountWithName(string name){
        string filter = '%' + name + '%';
        return [SELECT name FROM Account WHERE name LIKE : filter LIMIT 1];
    }
}
