Ext.define('Timetabler.model.Favourites', {
    extend: 'Ext.data.Model',
    config:{
		fields: ['id','ClassCode','ClassDescription'],
		proxy: {
            type: 'localstorage',
            id  : 'favourites'
        }
    }
});

