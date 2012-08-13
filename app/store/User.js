Ext.define('Timetabler.store.User',{
    extend:'Ext.data.Store',
    alias  : 'store.user',
    requires : [ 'Timetabler.model.User' ], 
    config:{
        model: 'Timetabler.model.User',
		grouper: {
			
			timeTranslate:function(time){
				curTime = time.split(":")
				if (curTime[0] > 12){
					changedTime = curTime[0] - 12;
					timeString = changedTime + ":" + curTime[1];
				}else{
					timeString = curTime[0] + ":" + curTime[1];
				}
				
				return timeString;
			},
            groupFn: function(record) {
				var period = record.get('DefinitionPeriodNumber');
				if( period == "1" || period == "2") {
						return "Period  1 & 2";
				}else if (period == "3" || period == "4") {
						return "Period  3 & 4";
				}else if (period == "5" || period == "6") {
						return "Period  5 & 6";
				}
            },
			
            sortProperty: 'PeriodNumber'
        }
    }
});