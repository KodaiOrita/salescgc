public class LWCWorkShiftController {
//	    @AuraEnabled(cacheable=true)
    public void getWorkShifts(String designatedYYMMM){
        //designatedMonthはYYYY-MMで渡す//
        
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
	        System.debug(days);
            daysList.add(days);
        }

    }
}