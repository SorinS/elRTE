/**
 * jQuery plugin - elRTE toolbar
 * Create buttons for all loaded editor commands, group them in panels and append to toolbar
 *
 * @param  elRTE  editor instance 
 */
$.fn.elrtetoolbar = function(rte) {
	
	return this.each(function() {
		var $this = $(this).addClass('ui-helper-clearfix ui-widget-header ui-corner-all elrte-toolbar'),
			o     = rte.options,
			g     = o.presets[o.preset]||[], // commands groups names
			gl    = g.length,
			pc    = 'elrte-buttonset',
			ex    = {},
			p, pa, gn, cmdn, cl, cmd, btn;
			
		while (gl--) {
			// cmd group name
			gn = g[gl];
			// commands names from group
			cmdn = o.commands[gn] || [];
			cl   = cmdn.length;
			// toolbar panel contains commands from group
			p  = $('<div class="ui-helper-clearfix '+pc+' '+pc+'-'+gn+'"/>');
			pa = false
			while (cl--) {
				if ((cmd = rte._commands[cmdn[cl]]) && !ex[cmd.name] && (btn = rte.ui.cmdui[cmd.conf.ui])) {
					p.prepend(btn(cmd));
					ex[cmd.name] = true;
					pa = true;
				}
			}
			pa && $this.prepend(p);
		}
		!$this.children().length && $this.hide();
		
		$this.delegate('.elrte-button', 'hover', function() {
			if (!$(this).hasClass('.'+elRTE.CSS_CLASS_DISABLED)) {
				$(this).toggleClass(elRTE.CSS_CLASS_HOVER);
			}
		})
		.delegate('.ui-menu-item a', 'hover', function() {
			$(this).toggleClass('ui-state-hover')
		});
		
	});
}
