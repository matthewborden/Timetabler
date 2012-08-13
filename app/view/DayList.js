store = Ext.create('Timetabler.store.User');
Ext.define('Timetabler.view.DayList', {
    extend: 'Ext.List',
    alias:['widget.DayList'],
    config: { 
		disableSelection:true,
		store: store,
		ui:'round',
	}
});
 