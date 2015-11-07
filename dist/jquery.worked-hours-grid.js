/*
 *  jQuery Worked Hours Grid plugin - v0.3.0
 *  jQuery plugin used to calculate worked durations in worked hours grids.
 *  http://github.com/tantale/jquery-worked-hours-grid
 *
 *  Made by Laurent LAPORTE
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var workedHoursGrid = "workedHoursGrid",
		defaults = {
			units: {
				hours: "h",
				minutes: "min",
				seconds: "s"
			},
			selectors: {
				row: ".row",
				range: ".range",
				start: ".start",
				end: ".end",
				sum: ".sum",
				total: ".total"
			}
		};

	// The actual plugin constructor
	function WorkedHoursGrid ( element, options ) {
		this.element = element;
		this.grid = $(this.element);
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend( true, {}, defaults, options );
		this._defaults = defaults;
		this._name = workedHoursGrid;
		this.init();
	}

	WorkedHoursGrid.prototype = {
		init: function () {
			var self = this;
			this.grid.find(this.settings.selectors.start).change(function(){
				self.updateTotal($(this));
			});
			this.grid.find(this.settings.selectors.end).change(function(){
				self.updateTotal($(this));
			});
			this.refresh();
		},
		refresh: function () {
			this.grid
				.find(this.settings.selectors.row)
				.find(this.settings.selectors.start + ":first").change();
		},
		updateTotal: function (input) {
			var
				self = this,
				range = input.closest(this.settings.selectors.range),
				row = range.closest(this.settings.selectors.row),
				sum = row.find(this.settings.selectors.sum),
				total = this.grid.find(this.settings.selectors.total),
				rowSum = new DeltaSum(),
				totalSum = new DeltaSum();

			row.find(this.settings.selectors.range).each(function(index, rangeElt){
				var
					myRange = $(rangeElt),
					start = myRange.find(self.settings.selectors.start),
					end = myRange.find(self.settings.selectors.end),
					delta = new Delta(start.val(), end.val());
				rowSum.append(delta);
			});

			$(sum).text(rowSum.toString(this.settings.units));

			this.grid.find(this.settings.selectors.range).each(function(index, rangeElt){
				var
					myRange = $(rangeElt),
					start = myRange.find(self.settings.selectors.start),
					end = myRange.find(self.settings.selectors.end),
					delta = new Delta(start.val(), end.val());
				totalSum.append(delta);
			});

			$(total).text(totalSum.toString(this.settings.units));
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ workedHoursGrid ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + workedHoursGrid ) ) {
				$.data( this, "plugin_" + workedHoursGrid, new WorkedHoursGrid( this, options ) );
			}
		});
	};

	ONE_SECOND = 1000;
	ONE_MINUTE = 60 * ONE_SECOND;
	ONE_HOUR   = 60 * ONE_MINUTE;
	ONE_DAY    = 24 * ONE_HOUR;

	Duration = function(deltaTime) {
		var rest = deltaTime;
		this.deltaTime = deltaTime;
		this.milliseconds = rest % 1000, rest = Math.floor(rest / 1000);
		this.seconds = rest % 60, rest = Math.floor(rest / 60);
		this.minutes = rest % 60, rest = Math.floor(rest / 60);
		this.hours = rest;
	};

	Duration.prototype = {
		toString: function(units) {
			var parts = [], seconds;
			if (this.deltaTime >= ONE_HOUR) {
				if (this.hours || this.minutes || this.seconds || this.milliseconds) {
					parts.push(this.hours + units.hours);
				}
			}
			if (this.deltaTime >= ONE_MINUTE) {
				if (this.minutes || this.seconds || this.milliseconds) {
					parts.push(this.minutes + units.minutes);
				}
			}
			if (this.deltaTime >= ONE_SECOND) {
				if (this.seconds || this.milliseconds) {
					seconds = this.seconds + this.milliseconds / 1000;
					parts.push(seconds + units.seconds);
				}
			}
			return parts.join(" ");
		}
	};

	Delta = function(startVal, endVal) {
		this.startTime = 0;
		this.endTime = 0;
		this.deltaTime = 0;
		this.init(startVal, endVal);
	};

	Delta.prototype = {
		init: function(startVal, endVal) {
			var
				today = new Date(),
				todayIso = today.toISOString().split("T")[0];
			this.startTime = Date.parse(todayIso + "T" + startVal);
			this.endTime   = Date.parse(todayIso + "T" + endVal);
			if (this.startTime && this.endTime) {
				this.deltaTime = this.startTime < this.endTime ?
					(this.endTime - this.startTime) :
					(ONE_DAY + this.endTime - this.startTime);
			} else {
				this.deltaTime = 0;
			}
		},

		toString: function(units) {
			var duration = new Duration(this.deltaTime);
			return duration.toString(units);
		}
	};

	DeltaSum = function() {
		this.deltas = [];
		this.deltaTime = 0;
	};

	DeltaSum.prototype = {
		append: function(delta) {
			this.deltas.push(delta);
			this.deltaTime = this.deltaTime + delta.deltaTime;
		},

		toString: function(units) {
			var duration = new Duration(this.deltaTime);
			return duration.toString(units);
		}
	};

})( jQuery, window, document );
