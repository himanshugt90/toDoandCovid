public with sharing class countiesCovid19LwcWrapper {
    @AuraEnabled
    Public String country{get;set;}
    @AuraEnabled
    Public Integer cases{get;set;}
    @AuraEnabled
    Public Integer deaths{get;set;}
    @AuraEnabled
    Public Integer recovered{get;set;}
    @AuraEnabled
    Public Integer active{get;set;}
}
