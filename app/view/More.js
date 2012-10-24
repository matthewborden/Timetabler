Ext.define('Timetabler.view.More',{
    extend: 'Ext.Panel',
    alias:['widget.More'],
    config: {
		html:'<div class="roundbox-last round-box"><h1 class="timetabler-title-center">Other Days.</h1></div>',
		cls: 'timetabler-dashboard-panel',
		style:'padding: 0 0 0 0; margin-bottom:10px'
	},
	initialize : function() {
	   this.element.on('tap', this.onTap);
    },
	onTap:function(){
		core.changeView('Week');
	},
}); 