public class RoundersWrapper {
    @AuraEnabled
    public Id id {get;set;}

    @AuraEnabled
    public String Name {get;set;}

    @AuraEnabled
    public String rounderCode {get;set;}
    
    @AuraEnabled
    public List<SubmitedWorkShift__c> SubmitedWorkShift {get;set;}

    @AuraEnabled
    public List<Demand__c> Demand {get;set;}

    public RoundersWrapper(Id Id,String Name,String rounderCode) {
        this.Id = Id;
        this.Name = Name;
        this.rounderCode = rounderCode;
    }
}
