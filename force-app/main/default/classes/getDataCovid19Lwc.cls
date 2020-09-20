public with sharing class getDataCovid19Lwc {
     @AuraEnabled
    public static List<countiesCovid19LwcWrapper> getAllData(){
        
        List<countiesCovid19LwcWrapper> getDataAllCountires=new List<countiesCovid19LwcWrapper>();
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        
        request.setEndpoint('https://corona.lmao.ninja/v2/countries?sort=cases');
        
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200){
            getDataAllCountires = (List<countiesCovid19LwcWrapper>)JSON.deserialize(response.getBody(), List<countiesCovid19lwcWrapper>.class);
            System.debug('data:'+getDataAllCountires);
            
        }
        return getDataAllCountires;
        
    }
    
    @AuraEnabled   
    public static Map<String, Object> getAllCovidData(){
        Map<String, Object> result=new Map<String, Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://corona.lmao.ninja/v2/all');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200){
            result = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            
            System.debug('data:'+result);
        }
        return result;
        
        
    }
    @AuraEnabled
    public static List<CountryStatsCovid19Wrapper> getAllCordinate(){
        List<CountryStatsCovid19Wrapper> getDataAllCordinate=new List<CountryStatsCovid19Wrapper>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://corona.lmao.ninja/v2/jhucsse');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200){
            getDataAllCordinate = (List<CountryStatsCovid19Wrapper>)JSON.deserialize(response.getBody(), List<CountryStatsCovid19Wrapper>.class);
            System.debug('data:'+getDataAllCordinate);
            
        }
        return getDataAllCordinate;
        
    }
    @AuraEnabled
    public static AllIndiaCovid19Wrapper getAllIndiaData(){
        AllIndiaCovid19Wrapper getAllIndiaDataList=new AllIndiaCovid19Wrapper();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.covid19india.org/data.json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200){
            getAllIndiaDataList = (AllIndiaCovid19Wrapper)JSON.deserialize(response.getBody().replace('"date":', '"CaseDate":'), AllIndiaCovid19Wrapper.class);
            System.debug('data:'+getAllIndiaDataList);
            
        }
        return getAllIndiaDataList;
        
    }
    @AuraEnabled
    public static Map<String,Object> getAllIndiaDistData(String stateName){
        Map<String,Object> StateDataList=new Map<String,Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.covid19india.org/state_district_wise.json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200){
            StateDataList=(Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            System.debug('data:'+StateDataList);
            
        }
        Object state=StateDataList.get(stateName);
        String dta=JSON.serialize(state);
        
        Map<String, Object> pms=(Map<String, Object>)JSON.deserializeUntyped(dta);
        Object district=pms.get('districtData');
        
        Map<String, Object> ds=(Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(district));
        System.debug(ds);
        return ds;
        
    }
    @AuraEnabled
    public static Map<String,Object> getAllIndiaDistDailyData(){
        Map<String,Object> StateDataList=new Map<String,Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.covid19india.org/districts_daily.json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200){
            StateDataList=(Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            System.debug('data:'+StateDataList);
            
        }
        Object data1=StateDataList.get('districtsDaily');
        
        
        Map<String, Object> dd=(Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(data1));
        
        return dd;
        
    }
    @AuraEnabled
    public static List<Object> getAllIndiaZoneData(){
        Map<String,Object> StateDataList=new Map<String,Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.covid19india.org/zones.json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200){
            StateDataList=(Map<String, Object>)JSON.deserializeUntyped(response.getBody());
           
            
        }
        Object data1=StateDataList.get('zones');
        
        
        List<Object> dd=(List<Object>)JSON.deserializeUntyped(JSON.serialize(data1));
         System.debug('data:'+dd);
        return dd;
        
    }
}
