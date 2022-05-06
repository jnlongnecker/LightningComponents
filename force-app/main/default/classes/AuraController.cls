/*
    Created By: Jared Longnecker
    Last Updated: 03/17/2022
    Description: Apex Controller for the Controllers Aura component
*/

public without sharing class AuraController {

    // To be able to use a method in a Lightning Component, we must use the @AuraEnabled annotation
    @AuraEnabled
    public static Account GetAccount(Boolean securityEnforced) {

        if (!securityEnforced) return GetAccount_NoSecurity();

        if (!Schema.sObjectType.Account.isAccessible()) return null;

        Integer selection = MakeAccountSelection();
        List<Account> chosenAccount = [SELECT id, name, rating FROM Account LIMIT 1 OFFSET : selection];

        // Remove any non-readable fields
        sObjectAccessDecision stripped = Security.StripInaccessible(AccessType.READABLE, chosenAccount);
        chosenAccount = (List<Account>)stripped.GetRecords();

        // Return the selection
        return chosenAccount[0];
    }

    private static Account GetAccount_NoSecurity() {
        Integer selection = MakeAccountSelection();
        return [SELECT id, name FROM Account LIMIT 1 OFFSET : selection];
    }

    private static Integer MakeAccountSelection() {

        // Find out how many accounts exist in the system
        AggregateResult result = [SELECT COUNT(ID) numAcc FROM Account];
        Integer numAccounts = (Integer)result.get('numAcc');
        
        // Make a random selection
        return Integer.valueOf((Math.random() * numAccounts));
    }
}
