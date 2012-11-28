Ext.define('Timetabler.controller.Core', {
    extend: 'Ext.app.Controller',
	indexArray:[],
    init: function () {
		// setup for the object
		tasks.load();
		core = this;
    },
	onBackButtonTap:function(){
		// Manages the navigation system, had to write a system to keep track of the current page
		var me = this;
		me.changeView('back'); 
		if(me.getIndex() == 0){
			me.getBackButton().destroy();
			tasks.clearFilter();
		}
		if(me.getDeleteButton() != undefined){
			me.getDeleteButton().destroy();
		}
	},
	changeView:function(value){
		// Back/Foward Left/Right
		var me = this;
		if (value == 'back'){
			me.changeAnimation('right');
			me.backView();
		} else {
			me.changeAnimation('left');
			me.setView(value);
			if (me.getBackButton() == undefined){
				me.getToolbar().add({
	            	xtype: 'button',
	            	text: 'Back',
	            	ui: 'back',
	            	align: 'left'
	        	});
			}
		}
	},
	setIndex:function (value){
		this.index = value;
	},
	getIndex:function (){
		return this.index;
	},
	setView:function (value){
		var me = this;
		var curIndex = me.getIndex();
		if (value != core.indexArray[curIndex]){
			if (curIndex == undefined){ curIndex = 0;}
			else {
				curIndex = curIndex + 1;
			}
			this.indexArray[curIndex] = value;
			me.getViewport().setActiveItem(value);
			me.setIndex(curIndex);
		}
	},
	backView:function (value){
		var me = this;
		var curIndex = me.getView();
		this.indexArray.pop();
		var curView = this.indexArray[curIndex];
		me.getViewport().setActiveItem(curView);
	},
	
	getView:function (){
		var me = this;
		curIndex = me.getIndex();
		var me = this;
		if (curIndex == undefined){ curIndex = 0;}
		else {
			curIndex = curIndex - 1;
		}
		me.setIndex(curIndex);
		return curIndex;
	},
    onWeekListItemTap: function (opts, index, target, record) {
		var me = this;
        store.clearFilter();
        store.filter({
            property: 'DayNumber',
            value: record.get('day'),
            exactMatch: true
        });
		me.changeView('Day');
    },
    onDayListItemTap: function (opts, index, target, record) {
		var me = this;
        me.getPeriodTemplate().setData(record.data);
        periodStore.clearFilter();
        periodStore.filter("ClassCode", record.data.ClassCode);
		curClassCode = record.data.ClassCode;
		curDescription = record.data.ClassDescription;
        tasks.clearFilter();
        tasks.filter('ClassCode', curClassCode);
		me.changeView('Period');
    },
    changeAnimation: function (direct) {
        var me = this;
		me.getViewport().getLayout().setAnimation({
            type: 'slide',
            direction: direct,
            duration: 400
        });
    },
    onViewportActivate: function () {
		var me = this;
        this.init();
        if (localStorage.getItem("synID") == null) {
            me.getViewport().setActiveItem('SettingsPanel');
        } else{
		
            me.changeAnimation('left');
            me.setView('Dashboard');
		}
    },
    onAddTaskButtonTap: function () {
		var me = this;
        me.changeAnimation('left');
        if (me.getAddButton() != undefined) {
            me.getAddButton().destroy();
        }
    },
    onClassesSingleClassItemTap: function (opts, index, target, record) {
		var me = this;
        me.getClassesSingleTask().setData(record.data);
		curIndex = index;
        if (me.getAddButton() != undefined) {
            me.getAddButton().destroy();
        }
		if(me.getDeleteButton() == undefined){
			me.getToolbar().add({
				xtype: 'button',
				text: 'Delete',
				align: 'right'
			});
		}
		me.changeView('ClassesSingleTask');
    }, 
	onDeleteButtonTap:function(){
		var me = this;
		 //remove record load and refresh
		 tasks.removeAt(curIndex);
		 tasks.sync();
		 tasks.load();
		 me.changeView('back');
		if(me.getIndex() == 0){
			if(me.getBackButton() != undefined){
				me.getBackButton().destroy();
			}
		}
		 if(me.getDeleteButton() != undefined){
			me.getDeleteButton().destroy();
		 }
	},
	onTaskSubmit:function () {
		var me = this;
		var form = me.getAddTaskPanel().getValues();
		if (form.Title == '' || form.Content == ''){
			alert('Error: Eields Empty');
			return;
		}

		tasks.add({
			Title: form.Title,
			Content: form.Content,
			Date: form.Date,
			ClassCode: curClassCode,
			ClassDescription: curDescription,
		});
		tasks.sync();
		tasks.load();
		me.getAddTaskPanel().reset();
		me.changeView('back');
	},
    config: {
        refs: { 
            'Toolbar': 'titlebar',
            'Viewport': 'panel[fullscreen=true]',
            'DayList': 'DayList',
            'WeekList': 'WeekList',   
            'PeriodTemplate': 'PeriodTemplate',
            'BackButton': 'button[ui=back]',
            'AddButton': 'button[text=New]',
            'DeleteButton': 'button[text=Delete]',
            'AddTaskPanel': 'AddTaskPanel',
            'ClassesSingleClass': 'ClassesSingleClass',
            'ClassesSingleTask': 'ClassesSingleTask',
			'Submit':'button[ui=submit]'
        },
        control: {
            'Viewport': {
                activate: 'onViewportActivate'
            },
            'WeekList': {
                itemtap: 'onWeekListItemTap'
            },
            'DayList': {
                itemtap: 'onDayListItemTap'
            },
            'BackButton': {
				initialize :function (cmp){ 
					var me = this;
					cmp.element.on('touchstart', me.onBackButtonTap, me);
				}
            },
            'AddButton': {
                initialize :function (cmp){ 
					var me = this;
					cmp.element.on('touchstart', me.onAddTaskButtonTap, me);
				}
            },
            'HomeworkButton': {
                initialize :function (cmp){ 
					var me = this;
					cmp.element.on('touchstart', me.onHomeworkButtonTap, me);
				}
            },
			'ClassesSingleClass':{
				itemtap:'onClassesSingleClassItemTap'
			},
			'DeleteButton':{
				 initialize :function (cmp){ 
					var me = this;
					cmp.element.on('touchstart', me.onDeleteButtonTap, me);
				}
			},
			'Submit':{
				initialize :function (cmp){ 
					var me = this;
					cmp.element.on('touchstart', me.onTaskSubmit, me);
				}
			}
        },
    },
});