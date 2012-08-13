//<debug>
//</debug>

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

function HMStoMin(T) { //This is needed for timeLeft function to work
    var A = T.split(/\D+/);
    return A[0] * 60 + A[1];
}
Ext.util.Custom = {
	curDay:function () {
		curDay = DayNumber();
		var t = new Date();
		var afterDay = new Date('15:30 ' + Ext.Date.format(t,'d/M/Y'));
		var weekend = [6,0];
		curDate = new Date();
		if (t > afterDay || weekend.indexOf(t.getDay()) != -1 /* true */){ 
			curDay = (DayNumber() + 1) % 10;
		}
		if (curDay == 0){curDay = 1};
		switch(curDate.getDay()){
			case 0: // Sunday
				curDate.addDays(1);
				break;
			case 6: // Saturday
				curDate.addDays(2);
				break;
			case 5: // Friday
				if (t > afterDay){
					curDate.addDays(3);
				}
				break;
			default:
				if (t > afterDay){
					curDate.addDays(1);
				}
				break;
		}
		
		return [curDay,curDate];
	},
	Filter : function (values) {
		curDay = DayNumber();
		curDay = Ext.util.Custom.curDay()[0];
		store.filter({
			property: 'DayNumber',
            value: curDay,
            exactMatch: true
		})
	}
}

function Period(startVar,endVar) {
	//Function checks if the period is now
	Now = Ext.Date.format(new Date(), 'd/M/Y');
	start = new Date(startVar + ' '+ Now);
	end = new Date(endVar + ' '+ Now);
	Now = new Date();
	// Check and Return
	if (Now > start && Now < end) {
		return true;
	} else {
		return false;
	}
}

function DayNumber() { //See Comment below where cahnge was made
    /* Stuff to Change */
	data = localStorage.getItem('responseTextDateData');
    parseData = JSON.parse(data);
if (parseData != null) {
	var Start_Month = parseData.TermStartMonth;
    var Start_Date = parseData.TermStartDate;
    var Start_DayNumber = parseData.TermStartDayNumber;
} else { return 0;}
    /* Stuff to Change */

    var today = new Date();
    var Start_Day2;
    var Start_Date = new Date(today.getFullYear(), Start_Month - 1, Start_Date);
    var Day_Number;
    var Day_Diff;

    if (Start_DayNumber < 6) {
        Start_Day2 = Start_DayNumber;
    } else {
        Start_Day2 = Start_DayNumber - 5;
    }

    var one_day = 1000 * 60 * 60 * 24;

    Day_Diff = Math.ceil((today.getTime() - Start_Date.getTime()) / (one_day));
    Day_Diff = Day_Diff - 1;

    Day_Number = Day_Diff + Start_Day2;

    while (Day_Number > 14) { //Equals sign removed here 
        Day_Number = Day_Number - 14;
    };

    if (Day_Number < 6) {
        if (Start_DayNumber > 5) {
            Day_Number = Day_Number + 5
        }
    } else {
        if (Day_Number < 8) {
            Day_Number = 0;
        } else {
            if (Day_Number < 13) {
                if (Start_DayNumber > 5) {
                    Day_Number = Day_Number - 7
                } else {
                    Day_Number = Day_Number - 2;
                }
            } else {
                Day_Number = 0;
            }
        }
    }
    return Day_Number;
}

Ext.application({
    name: 'Timetabler',
    fullscreen: true,
    controllers: ['Startup','Core'],
    views: ['SettingsPanel', 'Viewport'],
    models: ['User', 'Week','Favourites','Tasks'],
    stores: ['User', 'Week','Favourites','Tasks'],
    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',
    requires:['Timetabler.store.Week','Timetabler.store.User','Timetabler.store.Tasks','Timetabler.view.SettingsPanel'],
    launch: function () {
		tasks.setAutoLoad(true);
        Ext.fly('appLoadingIndicator').destroy();
       	Timetabler.controller.Startup();

    },
    onUpdated: function () {
        Ext.Msg.confirm("Application Update", "This application has just successfully been updated to the latest version. Reload now?", function () {
            window.location.reload();
        });

    }
});