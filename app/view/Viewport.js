Ext.define('Timetabler.view.Viewport',{
	extend:'Ext.Panel',	requires:[
		'Ext.TitleBar',
		'Timetabler.view.DayList',
		'Timetabler.view.Period.Card',
		'Timetabler.view.Dashboard',
		'Timetabler.view.SettingsPanel',
		'Timetabler.view.ClassesSingleClass',
		'Timetabler.view.ClassesSingleTask',
		'Timetabler.view.AddTaskPanel',
		'Timetabler.view.WeekList',
	],
	config: {
    	fullscreen: true,
		layout:'card',
    	items: [{
				docked:'top',
				xtype:'titlebar',								cls:'timetabler-top-bar',				
				title:'Timetabler',
				layout: {
					type : 'hbox'
				},
			},{
				xtype:'DayList',
				id:'Day',				grouped:true,
				scrollable: true,				pinHeaders: true,                 itemTpl: new Ext.XTemplate('<div class="title">{ClassDescription} </div><div><em class="small">Period {PeriodNumber} in <bold>{Room}</bold></em>{[startup.calcTimeLeft(values)]}</div>', {
                    timeTranslate: function (time) {
                        curTime = time.split(":")
                        if (curTime[0] > 12) {
                            changedTime = curTime[0] - 12;
                            timeString = changedTime + ":" + curTime[1];
                        } else {
                            timeString = curTime[0] + ":" + curTime[1];
                            if (timeString[0] == 0) {
                                timeString = curTime[0][1] + ":" + curTime[1];
                            }
                        }
                        return timeString;
                    },

                })
        	},{
				xtype:'Dashboard',
				id:'Dashboard'
			},{
				xtype:'PeriodCard',
				id:'Period'
			},{
				xtype:'SettingsPanel',
				id:'SettingsPanel'
			},{
				xtype:'ClassesSingleTask',
				id:'ClassesSingleTask'
			},{
				xtype:'AddTaskPanel',
				id:'AddTaskPanel'
			},{
				xtype:'WeekList',
				id:'Week'	
			}
    	]
    }
});

