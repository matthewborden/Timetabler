Ext.define('Timetabler.model.Week', {
    extend: 'Ext.data.Model',
    config:{
    	fields: [
        	{ name: 'day', type: 'int' },
        	{ name: 'week', type: 'string' },
        	{ name: 'name', type: 'string' }
    	]
    }
}); 