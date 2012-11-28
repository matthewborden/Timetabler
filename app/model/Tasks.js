Ext.define('Timetabler.model.Tasks', {
    extend: 'Ext.data.Model',
    config:{
		fields: [
			 {name: 'Title', type: 'string'},
			 {name: 'Date', type: 'string'},
			 {name: 'ClassCode', type: 'string'},			 {name: 'ClassDescription', type: 'string'},
			 {name: 'Content', type: 'string'},
		],
		belongsTo: 'User',
		proxy: {
            type: 'localstorage',
            id: 'tasks'
        }
    }
});

