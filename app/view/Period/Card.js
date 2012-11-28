periodStore = Ext.create('Timetabler.store.User');Ext.define('Timetabler.view.Period.Card', {
    extend: 'Ext.Container',
    alias:['widget.PeriodCard'],	requires:['Timetabler.view.Period.Template','Timetabler.view.AddNew'],
    config: {
		layout : 'vbox',		scrollable: 'vertical',
		items:[{				xtype:'PeriodTemplate',			},{				xtype:'container',				layout: 'vbox',				scrollable: false,				items:[{					xtype:'ClassesSingleClass',					itemTpl:  '{Title}',					scrollable: false,				},{					xtype:'AddNew'				}]			},{				xtype:'list',				disableSelection:true,				scrollable: false,				ui:'round',				grouped:true,				store:periodStore,				itemTpl: new Ext.XTemplate('<div class="title">Day {DayNumber} - Period {PeriodNumber} </div><div><em class="small">{[this.timeTranslate(values.DefinitionTimeFrom)]} to {[this.timeTranslate(values.DefinitionTimeTo)]} in <bold>{Room}</bold></em>{[startup.calcTimeLeft(values)]}</div>', {                    timeTranslate: function (time) {                        curTime = time.split(":")                        if (curTime[0] > 12) {                            changedTime = curTime[0] - 12;                            timeString = changedTime + ":" + curTime[1];                        } else {                            timeString = curTime[0] + ":" + curTime[1];                            if (timeString[0] == 0) {                                timeString = curTime[0][1] + ":" + curTime[1];                            }                        }                        return timeString;                    },                })							}],
	}
});
   