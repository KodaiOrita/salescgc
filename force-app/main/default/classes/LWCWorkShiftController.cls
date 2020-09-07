public class LWCWorkShiftController {
    @AuraEnabled(cacheable=true)
    public static List<WorkShiftWrapper> getWorkShifts(String YYMM){
        //designatedMonthはYYYY-MMで渡す//
        String StrYYMM = YYMM;

        List<Date> dates = getDatesOfDesignatedMonth(StrYYMM);
        List<Rounder__c> rounders = getRounders();
        List<Demand__c> demands = getRelatedDemands(dates,rounders);
        

        //WorkShiftWrapperに各日付とRoundersWrappersを全て入れます。
        List<WorkShiftWrapper> WorkShiftWrappers = new List<WorkShiftWrapper>();
        for (Date dts : dates) {
            //日付分のWorkShiftWrapperを作る。
            WorkShiftWrapper WSWrapper = new WorkShiftWrapper(dts);
            WorkShiftWrappers.add(WSWrapper);
        }

        //次にdemandsを日付とRounderを見て正しいオブジェクトに入れるため、先にWorkShiftWrapperのMap作成します。
        Map <Date,WorkShiftWrapper> WSWMap = new Map<Date,WorkShiftWrapper>();

        for (WorkShiftWrapper wsw : WorkShiftWrappers){
            //まずroundersを使って、RoundersWrapperに値をセットしたリストを作ります。
            List<RoundersWrapper> RoundersWrappers = new List<RoundersWrapper>(); 
            for (Rounder__c rd : rounders) {
                RoundersWrapper rw = new RoundersWrapper(rd.Id,rd.Name,rd.rounderCode__c);
                RoundersWrappers.add(rw);
            }
            wsw.RoundersWrappers = RoundersWrappers;

            for (RoundersWrapper rw : RoundersWrappers){
                List<Demand__c> dlist = new List<Demand__c>();   
                for (Demand__c dmnd : demands) {
                    if(rw.id == dmnd.RefRounder__c && wsw.dateOfMonth == dmnd.workDay__c){
                        dlist.add(dmnd);
                    }      
                } 
                rw.Demand = dlist;

                //submitedworkshiftも入れる。
                
                
                //WSWMap.put(wsw.dateOfMonth,wsw);
            }
        }
        //Demandを全て回して、入れる日付を探す(WorkShiftWrappers)。
        //入れる日付の中で、入れるラウンダーを探す。リスト形式にして。(WorkShiftWrappers)。
        


        /*for (Demand__c dmnd : demands) {
            //MapでWorkShiftWrapperの中から対象の日付を検索。
            WorkShiftWrapper targetWSW = WSWMap.get(dmnd.workDay__c);
            System.debug(dmnd.Name + targetWSW);
            //日付があっていたら、その中のラウンダーを見て、ラウンダーの中のdmandに入れる。リスト形式にする。           

            List<Demand__c> dlist = new List<Demand__c>();
            for (RoundersWrapper rw : targetWSW.RoundersWrappers){
                if(rw.id == dmnd.RefRounder__c){
                    dlist.add(dmnd);
                }
            }       
            rw.Demand = dlist;
        */
        
        return WorkShiftWrappers;
    }
    @AuraEnabled(cacheable=true)
    public static List<Date> getDatesOfDesignatedMonth(String designatedYYMMM){
        //最初の日
        //年取得
        Integer designatedYY = Integer.valueOf(designatedYYMMM.mid(0,4));
        //月を取得
        Integer designatedMM = Integer.valueOf(designatedYYMMM.mid(5,2));
        Date firstDay = date.newInstance(designatedYY, designatedMM, 1);

        //月の最終日
        Date endDay = firstDay.addMonths(1).addDays(-1);

        Integer numberDays = firstDay.daysBetween(endDay);

        List<Date> daysList = new List<Date>();

        for(Integer i = 0 ; i < numberDays+1 ; i++){
            Date days = date.newInstance(designatedYY,designatedMM,i+1);
            daysList.add(days);
        }
        return daysList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Rounder__c> getRounders(){
        //Rounderを全て検索
        List<Rounder__c> rounders =  [SELECT Id, Name,rounderCode__c FROM Rounder__c];

        return rounders;
    }
    @AuraEnabled(cacheable=true)
    public static List<Demand__c> getRelatedDemands(List<Date> Dates ,List<Rounder__c> rounders){
        List<Demand__c> demands = [SELECT Id,Name,shiftcode__c,RefRounder__c,workDay__c,startingHour__c,endingTime__c,shopName__c 
                                    FROM Demand__c 
                                    WHERE RefRounder__c IN :rounders AND workDay__c IN :Dates];
                                    System.debug('ディマンドチェック' + demands);
        return demands;
    }
}