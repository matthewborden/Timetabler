Ext.define('Timetabler.view.AddTaskPanel',{	extend: 'Ext.form.Panel',    requires: ['Ext.form.FieldSet', 'Ext.field.Select','Ext.field.DatePicker'],    alias: ['widget.AddTaskPanel'],    config: {        items: [{                xtype: 'fieldset',                items: [{                        xtype: 'textfield',                        name: 'Title',                        label: 'Title'                    }, {                        xtype: 'datepickerfield',                        label: 'Due Date',                        name: 'Date',                        value: new Date()                    }, {                        xtype: 'textareafield',                        name: 'Content',                        label: 'Content'                    }]            }, {                xtype: 'button',                ui: 'submit',                text: 'Submit',            }]    }}); 