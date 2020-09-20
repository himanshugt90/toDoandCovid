public with sharing class AllIndiaCovid19Wrapper {
    @AuraEnabled
    public List<Cases_time_series> cases_time_series;
    @AuraEnabled
    public List<Statewise> statewise;
    
    public class Delta {
        @AuraEnabled
        public Integer active;
        @AuraEnabled
        public Integer confirmed;
        
        @AuraEnabled
        public Integer deaths;
        @AuraEnabled
        public Integer recovered;
    }
    
    public class Statewise {
        @AuraEnabled
        public String active;
        @AuraEnabled
        public String confirmed;
        @AuraEnabled
        public String deaths;
        @AuraEnabled
        public Delta delta;
        @AuraEnabled
        public String lastupdatedtime;
        @AuraEnabled
        public String recovered;
        @AuraEnabled
        public String state;
    }
    public class Cases_time_series {
        @AuraEnabled
        public String dailyconfirmed;
        @AuraEnabled
        public String dailydeceased;
        @AuraEnabled
        public String dailyrecovered;
        @AuraEnabled
        public String CaseDate;
        @AuraEnabled
        public String totalconfirmed;
        @AuraEnabled
        public String totaldeceased;
        @AuraEnabled
        public String totalrecovered;
    }
}
