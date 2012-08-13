Ext.define('Timetabler.view.Period.Template', {
    extend: 'Ext.Panel',
    alias:['widget.PeriodTemplate'],
    config: {
		cls: 'timetabler-dashboard-panel',
		tpl: new Ext.XTemplate('<div class="round-box"><h1 class="timetabler-title-center">{ClassDescription}</h1><div><em class="small">{[this.timeTranslate(values.DefinitionTimeFrom)]} to {[this.timeTranslate(values.DefinitionTimeTo)]} in <bold>{Room}</bold></em>{[startup.calcTimeLeft(values)]}</div>', {
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
	}
});