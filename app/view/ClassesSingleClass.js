tasks = Ext.create('Timetabler.store.Tasks');
Ext.define('Timetabler.view.ClassesSingleClass', {
    extend: 'Ext.List',
    alias:['widget.ClassesSingleClass'],
    config: {
		ui: 'round',
		cls:'todayList',
		disableSelection:true,
		store:tasks,
		itemSelector:'item',
		itemTpl:  '{Title}',
	}
});
 