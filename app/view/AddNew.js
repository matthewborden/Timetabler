Ext.define('Timetabler.view.AddNew',{
    extend: 'Ext.Panel',
    alias:['widget.AddNew'],
    config: {
		html:'<div class="roundbox-last round-box"><h1 class="timetabler-title-center">Add New Task</h1></div>',
		cls: 'timetabler-dashboard-panel',
		style:'padding: 0 0 0 0;'
	},
	initialize : function() {
		this.renderElement.on('tap', 'onTap', this);
    },
	onTap:function(){
		core.changeView('AddTaskPanel');
	},
}); 