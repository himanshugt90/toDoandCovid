public with sharing class CountryStatsCovid19Wrapper {
    @AuraEnabled
    Public String country{get;set;}
    @AuraEnabled 
    public locationDetailWrapper coordinates{get;set;} 
    Public class locationDetailWrapper{
        @AuraEnabled
    	Public String Latitude{get;set;}
        @AuraEnabled
        Public String ongitude{get;set;}
    }
}
