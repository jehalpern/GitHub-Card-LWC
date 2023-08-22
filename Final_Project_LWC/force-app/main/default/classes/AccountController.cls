public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserDetail(String selectedUser){
        String key = '%' + selectedUser + '%';
        return [SELECT github_username__c FROM User WHERE Name LIKE :key];
    }

}
