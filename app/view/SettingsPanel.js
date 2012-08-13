Ext.define('Timetabler.view.SettingsPanel', {
    extend: 'Ext.form.Panel',
    alias: ['widget.SettingsPanel'],
    requires: ['Ext.form.FieldSet', 'Ext.form.Number', 'Timetabler.controller.Startup'],
    config: {

        items: [{
            xtype: 'fieldset',
            title: 'Student ID',
            items: [{
                xtype: 'numberfield',
                name: 'synID'
            }]
        }, {
            xtype: "button",
            text: 'Submit',
            handler: function () {
                thisForm = this.getParent();
                if (thisForm.getValues()['synID'] == 0) {
                    alert("Please Enter a Student ID");
                } else {
                    localStorage.setItem("synID", thisForm.getValues()['synID']);
                	Ext.Ajax.request({
			            url: '/php/get.php?id=' + localStorage.getItem("synID"),
			            success: function (response) {
			                localStorage.setItem("responseTextTimeTableData", response.responseText);
			           			                    window.location.reload()
			            }
			        });
				}
            }
        }]
    }
});