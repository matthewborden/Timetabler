Ext.define('Timetabler.store.Week',{
	extend:'Ext.data.Store', 
	requires :['Timetabler.model.Week'],
	config:{
    	model: 'Timetabler.model.Week',
		data: [
			{ day: 1, week: 'Week 1', name:'Monday'},
			{ day: 2, week: 'Week 1', name:'Tuesday'},
			{ day: 3, week: 'Week 1', name:'Wednesday'},
			{ day: 4, week: 'Week 1', name:'Thursday'},
			{ day: 5, week: 'Week 1', name:'Friday'},
			{ day: 6, week: 'Week 2', name:'Monday'},
			{ day: 7, week: 'Week 2', name:'Tuesday'},
			{ day: 8, week: 'Week 2', name:'Wednesday'},
			{ day: 9, week: 'Week 2', name:'Thursday'},
			{ day: 10, week: 'Week 2', name:'Friday'}
		],
		grouper: {
			groupFn: function(record) {
				return record.get('week');
			}
		},
    	

	},
	
});