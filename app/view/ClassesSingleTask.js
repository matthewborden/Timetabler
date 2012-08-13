Ext.define('Timetabler.view.ClassesSingleTask', {
    extend: 'Ext.Container',
    alias:['widget.ClassesSingleTask'],
    config: {
		tpl:new Ext.XTemplate('<br><div class="round-box"><h1 class="timetabler-title-center">{Title}</h1><h2>{[this.configDate(values.Date)]}</h2></div><br><div class="round-box"><p style="padding:10px">{Content}</p></div>', {
                    configDate: function (date) {
						date = new Date(date);
					  return Ext.Date.format(date, "l, d F Y");
                    },

                })
	}
});
 