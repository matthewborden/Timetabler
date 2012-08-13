Ext.define('Timetabler.controller.Startup', {
    extend: 'Ext.app.Controller',
    init: function () {
        startup = this;
		Ext.create('Timetabler.view.Viewport');
        if (localStorage.getItem("synID") == null) {
            this.requestDayData();
        } else {
            this.processData();
        }
		
    },
    requestTermData: function () {
        var Data = JSON.parse(localStorage.getItem("responseTextDateData"));
        var Term = Data.Term;
        return Term;
    },
    calcTimeLeft: function (values) {
        var dTime = new Date();
        var TimeNow = HMStoMin(dTime.getHours() + ":" + dTime.getMinutes() + ":00");
        var ClassEnd = HMStoMin(values.DefinitionTimeTo.toString());
		var MinuteDiff = ClassEnd - TimeNow;
		console.log(TimeNow,ClassEnd,MinuteDiff);
        if (MinuteDiff <= 50 && MinuteDiff >= 0) {
            return  '<em class="unreconciled">' + MinuteDiff + ' Minutes Left</em>';
        } else {
            return "";
        }
    },
    requestDayData: function () {
        Ext.Ajax.request({
            url: '/php/date.php',
            success: function (response) {
                // process server response here
                localStorage.setItem("responseTextDateData", response.responseText);
            }
        });
    },
    requestData: function (val) {
        Ext.Ajax.request({
            url: '/php/get.php?id=' + localStorage.getItem("synID"),
            success: function (response) {
                localStorage.setItem("responseTextTimeTableData", response.responseText);
                if (val) {
                    window.location.reload()
                }
            }
        });
    },
    processData: function () {
        if (navigator.onLine) {
            //check if the date has passed in the current local storage
            var responseDate = JSON.parse(localStorage.getItem("responseTextDateData"));
            var expireDate = new Date(responseDate.expiry_Month + "/" + responseDate.expiry_Date + "/" + responseDate.expiry_Year);
            var dTime = new Date();
            // if it has then refresh the data.
            if (expireDate < dTime) { this.requestDayData(); this.requestData(true) }
        }
        //Use the JSON and prase it into an object
        var responseObject = JSON.parse(localStorage.getItem("responseTextTimeTableData"));
        Ext.Array.each(responseObject, function (value) {
            store.add(value);
            periodStore.add(value);
        });
        periodStore.setGrouper({
            groupFn: function (record) {
                return (record.data.DayNumber <= 5) ? "Week 1" : "Week 2";
            },
            sortProperty: 'DayNumber'
        });
		store.clearFilter();
		Ext.util.Custom.Filter();
		store.sort("PeriodNumber","ASC");
    }
});