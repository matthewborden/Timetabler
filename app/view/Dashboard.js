Ext.define('Timetabler.view.Dashboard', {
    extend: 'Ext.Container',
    requires: ['Timetabler.view.DayList', 'Timetabler.view.ClassesSingleTask', 'Timetabler.view.Name', 'Timetabler.view.More'],
    alias: ['widget.Dashboard'],
    config: {
        layout: 'vbox',
        scrollable: 'vertical',
        items: [{
            xtype: 'Name',
			scrollable: false,
        }, {
            xtype: 'ClassesSingleClass',
            scrollable: false,
        },{
            xtype: 'container',
            layout: 'vbox',
            scrollable: false,
            items: [{
                xtype: 'DayList',
                scrollable: false,
                grouped: false,
                pinHeaders: false,
                cls: 'todayList',
                itemTpl: new Ext.XTemplate('<div class="title">{ClassDescription} </div><div><em class="small">Period {PeriodNumber} in <bold>{Room}</bold></em>{[startup.calcTimeLeft(values)]}</div>', {
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
            }, {
                xtype: 'More',
                scrollable: false
            }],

        }],

    },
    initialize: function () {}
});