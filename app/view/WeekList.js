week = Ext.create('Timetabler.store.Week');
Ext.define('Timetabler.view.WeekList',{
    extend: 'Ext.List',
    alias:['widget.WeekList'],
    config: {				xtype:'list',				ui: 'round',				disableSelection:true,
				grouped: true, 
				pinHeaders: true,
				store:week,
				deferEmptyText:true,
				itemSelector:'item',
				itemTpl: new Ext.XTemplate('<div class="padding"><div class="title">{name} {[this.isToday(values.day)]}</div>', {                    isToday: function (day) {                        var isToday = (Ext.util.Custom.curDay()[0] == day);						if (isToday){							return  '<em class="unreconciled">Today</em>';						} else {							return "";						}                    },                })								
	}
}); 