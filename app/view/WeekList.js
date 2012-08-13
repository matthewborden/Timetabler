week = Ext.create('Timetabler.store.Week');
Ext.define('Timetabler.view.WeekList',{
    extend: 'Ext.List',
    alias:['widget.WeekList'],
    config: {
				grouped: true, 
				pinHeaders: true,
				store:week,
				deferEmptyText:true,
				itemSelector:'item',
				itemTpl: new Ext.XTemplate('<div class="padding"><div class="title">{name} {[this.isToday(values.day)]}</div>', {
	}
}); 