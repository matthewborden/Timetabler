Ext.define('Timetabler.view.Name',{
    extend: 'Ext.Panel',
    alias:['widget.Name'],
    config: {
		tpl:'<div class="round-box"><h1 class="timetabler-title-center">{content}</h1><h2>{subcontent}</h2></div>',
		cls: 'timetabler-dashboard-panel',
	},
	initialize : function() {
       this.setData(this.currentDate());
	   this.renderElement.on('tap', 'onTap', this);
    },
	onTap:function(){
		core.changeView('Day');
	},
	currentDate:function () {
		var date = new Date();
        return { 
			content:'Day ' + Ext.util.Custom.curDay()[0],
			subcontent: Ext.Date.format(Ext.util.Custom.curDay()[1], "l, d F Y")
		}
	}
}); 

