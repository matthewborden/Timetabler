Ext.define('Timetabler.controller.Startup', {
    extend: 'Ext.app.Controller',
    init: function () {
		// Creates The App and checks if this is 
		// the first time it is being used.
        startup = this;
		Ext.create('Timetabler.view.Viewport');
        if (localStorage.getItem("synID") == null) {
            this.requestDayData();
        } else {
			this.processData();
        }
		
    },
    requestTermData: function () {
		// Get the current Term
        var Data = JSON.parse(localStorage.getItem("responseTextDateData"));
        var Term = Data.Term;
        return Term;
    },
    calcTimeLeft: function (values) {
		// calculate the time left in the period
        var dTime = new Date();
        var TimeNow = HMStoMin(dTime.getHours() + ":" + dTime.getMinutes() + ":00");
        var ClassEnd = HMStoMin(values.DefinitionTimeTo.toString());
		var MinuteDiff = ClassEnd - TimeNow;
        if (MinuteDiff <= 50 && MinuteDiff >= 0 && values.DayNumber == DayNumber()) {
            return  '<em class="unreconciled">' + MinuteDiff + ' Minutes Left</em>';
        } else {
            return "";
        }
    },
    requestDayData: function () {
		
		/*
		 * Code for preset username file
		 * Function: To preset the username. 
		 * Also: comment out core.js line 108,109,113 and the code below this comment.
		 
		 
		 Ext.Ajax.request({
			url: usernameURL,
			success: function (response) {
				localStorage.setItem("synID", response.responseText);
				studentString = response.responseText;
				
				 Ext.Ajax.request({
					url: 'date.json',
					success: function (response) {
						// process server response here
						localStorage.setItem("responseTextDateData", response.responseText);
						dateString = response.responseText;
						
						startup.requestData(true);
					}
				});
			}
		});
		*/
	
		// Get the data for the Day Function and the expired function
        Ext.Ajax.request({
            url: 'date.json',
            success: function (response) {
                // process server response here
                localStorage.setItem("responseTextDateData", response.responseText);
				dateString = response.responseText;
            }
        });
    },
    requestData: function (val) {
		// Request the data
		var Data = JSON.parse(dateString);
		var Term = Data.Term;
		curYear = new Date();
		requestURL  = dataURL + studentString + '&room=0&year='+ Ext.Date.format(curYear,'Y') +'&term='+ Term +'&day='+ DayNumber()+ '&callType=student';
		Ext.Ajax.request({
			url: requestURL,
			success: function (response) {
				localStorage.setItem("responseTextTimeTableData", response.responseText);
				window.location.reload();
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