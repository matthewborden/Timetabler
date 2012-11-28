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
                    localStorage.setItem("synID", thisForm.getValues()['synID']);					var Data = JSON.parse(localStorage.getItem("responseTextDateData"));					var Term = Data.Term;
                	curYear = new Date();					requestURL  = dataURL + localStorage.getItem("synID") + '&room=0&year='+ Ext.Date.format(curYear,'Y') +'&term='+ Term +'&day='+ DayNumber()+ '&callType=student';					Ext.Ajax.request({						url: requestURL,						success: function (response) {							localStorage.setItem("responseTextTimeTableData", response.responseText);							window.location.reload()													}					});
				}
            }
        }]
    }
});