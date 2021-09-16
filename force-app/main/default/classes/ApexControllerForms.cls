public with sharing class ApexControllerForms {

    @AuraEnabled
    public static Contact GetContact(String name) {
        System.debug(name);
        Contact ret;
        name = name + '%';

        // If our server side code causes an error, we want to know on the client side
        try {
            ret = [SELECT AccountId FROM Contact WHERE name LIKE : name LIMIT 1];
        } 
        catch (Exception e) {

            // We can allow this to happen by throwing an AuraHandledException
            throw new AuraHandledException('Bad input name');
        }

        return ret;
    }
}
