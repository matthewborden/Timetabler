Ext.define('Timetabler.model.User', {
    extend: 'Ext.data.Model',
    config:{
    fields: [
         {name: 'DayNumber', type: 'int'},
         {name: 'PeriodNumber', type: 'string'},
         {name: 'PeriodNumberSeq', type: 'string'},
         {name: 'DefinitionPeriodNumber', type: 'string'},
         {name: 'DefinitionTimeFrom', type: 'string'},
         {name: 'DefinitionTimeTo', type: 'string'},
         {name: 'ClassCode', type: 'string'},
         {name: 'ClassDescription', type: 'string'},
         {name: 'StaffID', type: 'string'},
        {name: 'Room', type: 'string'},
		{name: 'SchoolStaffCode', type: 'string'},
    ]
    }
});

