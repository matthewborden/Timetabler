Ext.define('Timetabler.store.Favourites',{
    extend:'Ext.data.Store',
    alias  : 'store.favourites',
    requires : [ 'Timetabler.model.Favourites' ], 
    config:{
        model: 'Timetabler.model.Favourites',
    }
});