public class WorkShiftWrapper {
    @AuraEnabled
    public Date dateOfMonth {get; set;}
    
    @AuraEnabled
    public List<RoundersWrapper> RoundersWrappers {get; set;}

    public WorkShiftWrapper(Date dt) {
        this.dateOfMonth = dt;
    }
}