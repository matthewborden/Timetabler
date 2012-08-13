Ext.define('Timetabler.store.Tasks',{
    extend:'Ext.data.Store',
    alias  : 'store.tasks',
    requires : [ 'Timetabler.model.Tasks' ], 
    config:{
        model: 'Timetabler.model.Tasks',
    }
});