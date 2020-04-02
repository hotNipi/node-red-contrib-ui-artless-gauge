/*
MIT License

Copyright (c) 2020 hotNipi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var path = require('path');
module.exports = function (RED) {
	function HTML(config) {

		var cojo = JSON.stringify({
			config
		});

		var styles = String.raw`
		<style>
			.ag-txt-{{unique}} {					
				fill: currentColor;	
				font-size:${config.font.normal}em;				
			}					
			.ag-txt-{{unique}}.small {
				font-size:${config.font.small}em;
			}
			.ag-txt-{{unique}}.big {
				font-size:${config.font.big}em;
			}			
			.ag-icon-{{unique}}{
				fill: currentColor;
				font-size:${config.font.icon}em;				
			}
			.ag-icon-{{unique}}.fa{
				font-family:"FontAwesome";
			}
			.ag-icon-{{unique}}.mi{
				font-family:"Material Icons";
			}
			.ag-icon-{{unique}}.wi{
				font-family:"weather-icons-lite";
				font-size:${config.font.icon}em
			}
			.ag-icon-{{unique}}.angular-material{
				font-family:"Material Icons";
			}
					
													
		</style>`
		var initpos = config.differential == true ? config.stripe.left + (config.stripe.width / 2) : config.stripe.left

		var linear = String.raw`				
			<svg id="ag_svg_{{unique}}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%"  ng-init='init(` + cojo + `)' xmlns="http://www.w3.org/2000/svg" >				
				<text ng-if="${config.label != ""}" id="ag_label_{{unique}}" class="ag-txt-{{unique}}" text-anchor="start" dominant-baseline="baseline" x="` + config.stripe.left + `" y="${config.stripe.y - 7}">${config.label}</text>
				<text id="ag_value_{{unique}}" class="ag-txt-{{unique}} big" text-anchor="end" dominant-baseline="baseline" x="${config.exactwidth - 3}" y="${config.stripe.y - 6}"></text>
				<text id="ag_alt_{{unique}}" class="ag-txt-{{unique}} small" x="${config.stripe.left}" y="${config.stripe.y + config.stripe.sdy}"
					text-anchor="end" dominant-baseline="baseline">
					<tspan x="${config.stripe.left}" id="ag_alt_0_{{unique}}" text-anchor="start"></tspan>
					<tspan x="${config.stripe.left + 1.5 + (config.stripe.width / 2)}" id="ag_alt_1_{{unique}}" text-anchor="middle"></tspan>
					<tspan x="${config.exactwidth - 3}" id="ag_alt_2_{{unique}}" text-anchor="end"></tspan>					
				</text>
				<text ng-if="${config.icon != ""}" id="ag_icon_{{unique}}" class="ag-icon-{{unique}} ${config.icontype}" text-anchor="start" dominant-baseline="baseline" x="0" y="${config.stripe.y + 6}">icon</text>	
				<rect id="ag_str_bg_{{unique}}" x="` + config.stripe.left + `" y="` + config.stripe.y + `" 
					width="${config.stripe.width}" height="1"	
					style="stroke:none";
					fill="${config.bgrColor}"					
				/>
				<rect ng-if="${config.differential == true}"  x="${initpos}" y="${config.stripe.y - 7}" 
					width="1" height="7"	
					style="stroke:none";
					fill="${config.bgrColor}"				
				/>	
				<rect id="ag_str_line_{{unique}}" x="${initpos}" y="${config.stripe.y - 1}" 
					width="0" height="3"	
					style="stroke:none";
					fill="${config.color}"				
				/>
				<g id="ag_dots_{{unique}}" style="outline: none; border: 0;"></g>				
			</svg>`

		var radial = String.raw`				
			<svg id="ag_svg_{{unique}}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%"  ng-init='init(` + cojo + `)' xmlns="http://www.w3.org/2000/svg" >				
				<text ng-if="${config.label != ""}" id="ag_label_{{unique}}" class="ag-txt-{{unique}}" text-anchor="middle" dominant-baseline="baseline" x="${config.exactwidth / 2}" y="${(config.arc.cy - config.arc.r) - config.height * 4}">${config.label}</text>
				<text id="ag_value_{{unique}}" class="ag-txt-{{unique}} big" text-anchor="middle" dominant-baseline="baseline" x="${config.exactwidth / 2}" y="${config.arc.cy * .9}"></text>
				<text id="ag_unit_{{unique}}" class="ag-txt-{{unique}} small" text-anchor="middle" dominant-baseline="baseline" x="${config.exactwidth / 2}" y="${config.arc.cy * .9 + config.stripe.sdy}"></text>
				<text ng-if="${config.icon != ""}" id="ag_icon_{{unique}}" class="ag-icon-{{unique}} ${config.icontype}" text-anchor="middle" dominant-baseline="baseline" x="${config.exactwidth / 2}" y="${config.arc.cy * .75 + config.arc.r}">icon</text>
				
				<text ng-if="${config.width > 2}" id="ag_alt_{{unique}}" class="ag-txt-{{unique}} small" x="0" y="0"
					text-anchor="end" dominant-baseline="baseline">
					<tspan y="0" dy="${config.arc.cy * .75 + config.arc.r}" x="0" dx="${config.exactwidth / 2 - config.arc.r * .7}" id="ag_alt_0_{{unique}}" text-anchor="start"></tspan>
					<tspan y="0" dy="${(config.arc.cy + config.stripe.sdy - config.arc.r)}" x="${config.exactwidth / 2 + 1.5}" id="ag_alt_1_{{unique}}" text-anchor="middle"></tspan>
					<tspan y="0" dy="${config.arc.cy * .75 + config.arc.r}" x="0" dx="${config.exactwidth / 2 + config.arc.r * .7}" id="ag_alt_2_{{unique}}" text-anchor="end"></tspan>					
				</text>
				<rect ng-if="${config.differential == true}" x="${(config.exactwidth / 2)}" y="${(config.arc.cy - 7 - config.arc.r)}" 
					width="1" height="7"	
					style="stroke:none";
					fill="${config.bgrColor}";				
				/>				
				<path id="ag_str_bg_{{unique}}" style="fill:none"; stroke="${config.bgrColor}" stroke-width="1" />
				<path id="ag_str_line_{{unique}}" style="fill:none"; stroke="${config.color}" stroke-width="3" />
				<g id="ag_dots_{{unique}}" style="outline: none; border: 0;"></g>
			</svg>`

		var layout = config.type == "linear" ? linear : radial
		var scripts = String.raw`<script src="ui-artless-gauge/js/gsap.min.js"></script>`

		return String.raw`${styles}${scripts}${layout}`;
	}

	function checkConfig(node, conf) {
		if (!conf || !conf.hasOwnProperty("group")) {
			node.error(RED._("ui_artlessgauge.error.no-group"));
			return false;
		}
		return true;
	}

	var ui = undefined;


	function ArtlessGaugeNode(config) {
		try {
			var node = this;
			if (ui === undefined) {
				ui = RED.require("node-red-dashboard")(RED);
			}
			RED.nodes.createNode(this, config);
			var done = null;
			var range = null;
			var site = null;
			var getIconType = null;
			var ensureNumber = null;
			var getSiteProperties = null;
			var calculatePercPos = null;
			var calculateColor = null;
			var modifyConfig = null;

			if (checkConfig(node, config)) {
				ensureNumber = function (input, dets) {
					if (input === undefined) {
						return config.min;
					}
					if (typeof input !== "number") {
						var inputString = input.toString();
						input = parseFloat(inputString)
						if (isNaN(input)) {
							node.warn("msg.payload does not contain numeric value")
							return config.min
						}
					}
					if (isNaN(input)) {
						node.warn("msg.payload does not contain numeric value")
						input = config.min;
					}
					if (dets > 0) {
						input = parseFloat(input.toFixed(dets))
					} else {
						input = parseInt(input)
					}
					return input;
				}

				modifyConfig = function (input) {
					function addSectors(s) {
						if (s.t == 'sec') {
							config.sectors.push(s)
						}
					}
					var ret = false
					if (input && input.hasOwnProperty('sectors')) {
						if (Array.isArray(input.sectors)) {
							var sec, insec

							if (input.sectors.some(el => el.t == 'sec')) {
								config.sectors = config.sectors.filter(el => (el.t != "sec"))
							}
							insec = input.sectors.find(el => el.t == 'min')
							if (insec) {
								sec = config.sectors.find(el => el.t == 'min')
								sec.val = insec.val
								sec.col = insec.col
								sec.dot = insec.dot || 0
								config.min = insec.val
								config.color = insec.col
							}

							insec = input.sectors.find(el => el.t == 'max')
							if (insec) {
								sec = config.sectors.find(el => el.t == 'max')
								sec.val = insec.val
								sec.col = insec.col
								sec.dot = insec.dot || 0
								config.max = insec.val
							}
							input.sectors.forEach(el => addSectors(el))
							config.sectors.sort((a, b) => a.val - b.val);
							var i = config.sectors.length - 1
							config.sectors[i].col = config.sectors[i - 1].col
							ret = config
						}
					}
					if (input.icon) {
						config.icon = input.icon
						config.icontype = getIconType()
						ret = config
					}
					if (input.label) {
						config.label = input.label
						ret = config
					}
					if (input.unit) {
						config.unit = input.unit
						ret = config
					}
					return ret
				}
				getSiteProperties = function () {
					var opts = null;
					if (typeof ui.getSizes === "function") {
						opts = {};
						opts.sizes = ui.getSizes();
						opts.theme = ui.getTheme();
					}
					if (opts === null) {
						node.log("Couldn't reach to the site parameters. Using hardcoded default parameters!")
						opts = {}
						opts.sizes = { sx: 48, sy: 48, gx: 4, gy: 4, cx: 4, cy: 4, px: 4, py: 4 }
						opts.theme = {
							'widget-backgroundColor': {
								value: "#097479"
							}
						}
					}
					return opts
				}
				range = function (n, p, a, r) {
					if (a == "clamp") {
						if (n < p.minin) {
							n = p.minin;
						}
						if (n > p.maxin) {
							n = p.maxin;
						}
					}
					if (a == "roll") {
						var d = p.maxin - p.minin;
						n = ((n - p.minin) % d + d) % d + p.minin;
					}
					var v = ((n - p.minin) / (p.maxin - p.minin) * (p.maxout - p.minout)) + p.minout;
					if (r) {
						v = Math.round(v);
					}
					return v
				}

				calculatePercPos = function (v) {
					if (config.type == 'linear') {
						if (config.differential == true) {
							var vp, wcp
							var centervalue = (config.min + config.max) / 2
							var dp = {
								minin: config.min,
								maxin: config.max,
								minout: config.stripe.left,
								maxout: config.exactwidth
							}
							var centerpoint = range(centervalue, dp, 'clamp', true)
							if (v == centervalue) {
								return {
									x: centerpoint - 1,
									w: 2
								}
							} else if (v < centervalue) {
								vp = range(v, dp, 'clamp', true)
								wcp = centerpoint - vp
							} else {
								vp = centerpoint
								wcp = range(v, dp, 'clamp', true) - vp
							}
							return {
								x: vp,
								w: wcp,
								c: centerpoint
							}
						}
						var p = {
							minin: config.min,
							maxin: config.max,
							minout: 0,
							maxout: config.stripe.width
						}
						return {
							x: config.stripe.left,
							w: range(v, p, 'clamp', true)
						}
					}
					if (config.differential == true) {
						var lv, rv
						var centervalue = (config.min + config.max) / 2
						var dp = {
							minin: config.min,
							maxin: config.max,
							minout: config.arc.left,
							maxout: config.arc.right
						}
						var centerpoint = range(centervalue, dp, 'clamp', true)
						if (v == centervalue) {
							return {
								cx: config.arc.cx,
								cy: config.arc.cy,
								r: config.arc.r,
								left: centerpoint - 1,
								right: centerpoint + 1
							}
						} else if (v < centervalue) {
							lv = range(v, dp, 'clamp', true)
							rv = centerpoint
						} else {
							lv = centerpoint
							rv = range(v, dp, 'clamp', true)

						}
						return {
							cx: config.arc.cx,
							cy: config.arc.cy,
							r: config.arc.r,
							left: lv,
							right: rv,
							cp: centerpoint
						}
					}

					var p = {
						minin: config.min,
						maxin: config.max,
						minout: config.arc.left,
						maxout: config.arc.right
					}
					return {
						cx: config.arc.cx,
						cy: config.arc.cy,
						r: config.arc.r,
						left: config.arc.left,
						right: range(v, p, 'clamp', true)
					}

				}
				calculateColor = function (v) {
					if (config.sectors.length < 2) {
						return config.color
					}
					var i = config.sectors.findIndex(color => color.val > v)
					var ret = config.color
					if (i > 0) {
						ret = config.sectors[i - 1].col
					} else {
						if (v < config.min) {
							ret = config.sectors[0].col
						} else {
							ret = config.sectors[config.sectors.length - 1].col
						}
					}
					return ret
				}

				getIconType = function () {
					var t = ""
					if (config.icon === "") {
						return t
					}
					var url = /^https?:\/\//i;
					var fa = /^fa-/i;
					var wi = /^wi-/i;
					var mi = /^mi-/i;

					if (url.test(config.icon)) {
						t = 'image';
						config.iconurl = url;
					} else if (fa.test(config.icon)) {
						t = 'fa';
					} else if (wi.test(config.icon)) {
						t = 'wi';
					} else if (mi.test(config.icon)) {
						t = 'mi';
					} else {
						t = 'angular-material';
					}
					return t
				}

				var group = RED.nodes.getNode(config.group);
				var site = getSiteProperties();
				config.type = config.layout
				if (config.width == 0) {
					config.width = parseInt(group.config.width) || 1
				}
				if (config.height == 0) {
					config.height = parseInt(group.config.height) || 1
				}
				config.width = parseInt(config.width)
				config.height = parseInt(config.height)
				if (config.type == 'linear') {
					config.height = 1
				}
				if (config.type == 'radial') {
					var smallest = Math.min(...[config.width, config.height])
					if (smallest < 2) {
						smallest = 2
					}
					config.width = smallest
					config.height = smallest
				}

				config.exactwidth = parseInt(site.sizes.sx * config.width + site.sizes.cx * (config.width - 1)) - 12;
				config.exactheight = parseInt(site.sizes.sy * config.height + site.sizes.cy * (config.height - 1)) - 12;
				var sizecoef = site.sizes.sy / 48
				var iconsize = (30 * sizecoef) + 4
				var smalldrift = config.type == 'radial' ? config.height == 2 ? (13 * sizecoef) + 1 : (16 * sizecoef) + 1 : (13 * sizecoef) + 1

				var fp = {
					minin: 40,
					maxin: config.exactwidth * 2,
					minout: 1,
					maxout: (1 + (config.height == 2 ? 1 : config.height)) * .9
				}
				var side = Math.min((site.sizes.sy * config.height), (site.sizes.sx * config.width))
				var b = config.type == 'radial' ? range(side, fp, 'clamp', false) : 1.28

				config.icontype = getIconType()
				var ismult = config.type == "linear" ? 1.75 : config.height < 4 ? config.height - 1.1 : 2.5
				var is = parseFloat(sizecoef * ismult).toFixed(1)
				var norm = parseFloat(sizecoef * 1).toFixed(1)
				var big = parseFloat(sizecoef * b).toFixed(1)
				var small = parseFloat(sizecoef * 0.75).toFixed(1)
				config.font = { normal: norm, small: small, big: big, icon: is }

				var le = config.icon == "" ? 0 : iconsize
				var wi = config.icon == "" ? config.exactwidth : config.exactwidth - iconsize

				config.stripe = {
					left: le,
					y: site.sizes.sy * .52,
					width: wi,
					sdy: smalldrift
				}
				side = Math.min(config.exactwidth, config.exactheight)
				config.arc = {
					cx: (config.exactwidth / 2),
					cy: (side / 2) * 1.375,
					r: (side / 2) - 6,
					left: -40,
					right: 220
				}

				config.bgrColor = site.theme['group-borderColor'].value

				if (config.bgcolorFromTheme == false) {
					config.bgrColor = config.colorTrack
				}

				config.color = config.sectors.find(el => el.t == 'min').col
				config.min = config.sectors.find(el => el.t == 'min').val
				config.max = config.sectors.find(el => el.t == 'max').val

				config.sectors.sort(function (a, b) {
					return a.val - b.val
				});

				config.decimals = isNaN(parseFloat(config.decimals)) ? { fixed: 1 } : { fixed: parseInt(config.decimals) }
				config.padding = {
					hor: '6px',
					vert: (site.sizes.sy / 16) + 'px'
				}

				var html = HTML(config);

				done = ui.addWidget({
					node: node,
					order: config.order,
					group: config.group,
					width: config.width,
					height: config.height,
					format: html,
					templateScope: "local",
					emitOnlyNewValues: false,
					forwardInputMessages: true,
					storeFrontEndInputAsState: true,

					beforeEmit: function (msg) {

						var fem = {}
						if (msg.control) {
							fem.config = modifyConfig(msg.control)
						}

						if (!msg.payload) {
							msg.payload = config.min
						}

						msg.payload = ensureNumber(msg.payload, config.decimals.fixed)
						fem.payload = {
							value: msg.payload.toFixed(config.decimals.fixed),
							pos: calculatePercPos(msg.payload),
							col: calculateColor(msg.payload)
						}
						return { msg: fem };
					},

					initController: function ($scope) {
						$scope.unique = $scope.$eval('$id')
						$scope.timeout = null
						$scope.inited = false
						$scope.type = null
						$scope.arc = null
						var waitingpayload = null

						$scope.init = function (p) {
							update(p)
						}
						var update = function (data) {
							var main = document.getElementById("ag_svg_" + $scope.unique);
							if (data.payload && (!main || !$scope.inited)) {
								if (data.config) {
									$scope.timeout = setTimeout(update.bind(null, data), 40);
									return
								}
								waitingpayload = data
								return
							}
							if (!main && data.config) {
								$scope.timeout = setTimeout(update.bind(null, data), 40);
								return
							}
							$scope.inited = true
							$scope.timeout = null
							if (data.config) {

								$scope.type = data.config.type
								updateContainerStyle(main, data.config.padding)


								var u = data.config.type == "linear" ? ["", "", data.config.unit] : ["", "", ""]
								var cv = ""
								if (data.config.minmax) {
									if (data.config.type == "linear") {
										cv = data.config.unit
									}
									if (data.config.differential == true) {
										cv = ((data.config.min + data.config.max) / 2).toFixed(data.config.decimals)
										if (data.config.type == "linear" && data.config.unit != "") {
											cv = data.config.unit
										}
									}
									u = [data.config.min, cv, data.config.max]
								}
								updateTexts(u, data.config.unit, data.config.label)

								if (data.config.type === 'radial') {
									if ($scope.arc == null) {
										$scope.arc = data.config.arc
										createArcBgr(data.config.arc)
									}
								}
								updateSegmentDots(data.config.sectors)
								var adjust = { h: data.config.height, eh: data.config.exactheight }
								updateIcon(data.config.icontype, data.config.icon, data.config.type, adjust)
								if (waitingpayload) {
									data.payload = waitingpayload.payload
									waitingpayload = null;
								}
							}
							if (data.payload) {
								if ($scope.type === 'radial') {
									updateGaugeRadial(data.payload)
								} else {
									updateGaugeLinear(data.payload)
								}
							}
						}

						var updateContainerStyle = function (el, padding) {
							el = el.parentElement
							if (el && el.classList.contains('nr-dashboard-template')) {
								if ($(el).css('paddingLeft') == '0px') {
									el.style.paddingLeft = el.style.paddingRight = padding.hor
									el.style.paddingTop = el.style.paddingBottom = padding.vert
								}
							}
						}

						var createArcBgr = function (arc) {
							var el = document.getElementById("ag_str_bg_" + $scope.unique)
							el.setAttribute("d", arcPath(arc.cx, arc.cy, arc.r, arc.left, arc.right));
						}

						var updateSegmentDots = function (sectors) {
							var cont = document.getElementById("ag_dots_" + $scope.unique);
							if (!cont) {
								return
							}
							if (cont.children.length > 0) {
								while (cont.firstChild) {
									cont.removeChild(cont.firstChild);
								}
							}
							if (!sectors) {
								return
							}

							var svgns = "http://www.w3.org/2000/svg"
							var min = sectors.find(el => el.t == 'min').val
							var max = sectors.find(el => el.t == 'max').val
							function drawDotRadial(data) {
								if (!data.dot || data.dot == 0) {
									return
								}
								var p = 100 - (((data.val - min) * 100) / (max - min))
								var pr = (p * pathLength) / 100
								var pt = arc.getPointAtLength(pr);
								var circle = document.createElementNS(svgns, 'circle');
								circle.setAttributeNS(null, 'cx', pt.x);
								circle.setAttributeNS(null, 'cy', pt.y);
								circle.setAttributeNS(null, 'r', data.dot);
								circle.setAttributeNS(null, 'style', 'fill:' + data.col + ';');
								cont.appendChild(circle);
							}
							function drawDotLinear(data) {
								if (!data.dot || data.dot == 0) {
									return
								}
								var p = ((data.val - min) * 100) / (max - min)
								var pr = (p * pathWidth) / 100
								var pt = line.getPointAtLength(pr);
								if (data.t == "min") {
									pt.x += data.dot
								}
								if (data.t == 'max') {
									pt.x -= data.dot
								}

								var circle = document.createElementNS(svgns, 'circle');
								circle.setAttributeNS(null, 'cx', pt.x);
								circle.setAttributeNS(null, 'cy', pt.y);
								circle.setAttributeNS(null, 'r', data.dot);
								circle.setAttributeNS(null, 'style', 'fill:' + data.col + ';');
								cont.appendChild(circle);
							}
							if ($scope.type === 'radial') {
								var arc = document.getElementById("ag_str_bg_" + $scope.unique)
								var pathLength = arc.getTotalLength()
								sectors.forEach(s => drawDotRadial(s))
							}
							else {
								var line = document.getElementById("ag_str_bg_" + $scope.unique)
								var pathWidth = $(line).width()
								sectors.forEach(s => drawDotLinear(s))
							}

						}

						var updateTexts = function (arr, unit, label) {
							var ic = document.getElementById("ag_alt_" + $scope.unique);
							if (ic) {
								for (var i = 0; i < 3; i++) {
									ic = document.getElementById("ag_alt_" + i + "_" + $scope.unique);
									$(ic).text(arr[i]);
								}
							}
							ic = document.getElementById("ag_unit_" + $scope.unique);
							if (ic) {
								$(ic).text(unit);
							}
							ic = document.getElementById("ag_label_" + $scope.unique);
							if (ic) {
								$(ic).text(label);
							}
						}

						var updateIcon = function (type, iconclass, layout, adjust) {
							var icontext = ""
							if (iconclass != "") {
								if (type == 'angular-material') {
									icontext = String.fromCharCode(parseInt(iconclass, 16))
								}
								if (type == 'mi') {
									icontext = iconclass.split("-")[1]
								} else {
									var testI = document.createElement('i');
									var char;
									testI.className = type + ' ' + iconclass;
									document.body.appendChild(testI);
									char = window.getComputedStyle(testI, ':before').content.replace(/'|"/g, '');
									testI.remove();
									icontext = String.fromCharCode(char.charCodeAt(0))
								}
							}
							var ic = document.getElementById("ag_icon_" + $scope.unique);
							if (ic) {
								$(ic).text(icontext);
								$(ic).css("font-size", "");
								var ib = ic.getBBox()
								if (layout == 'linear') {
									var linebox = document.getElementById("ag_str_bg_" + $scope.unique).getBBox()
									var diff = ib.width - linebox.x
									if (diff > -2) {
										var d = diff < 0 ? 0 : diff
										var istyl = parseFloat(window.getComputedStyle(document.querySelector(".ag-icon-" + $scope.unique)).fontSize)
										$(ic).css("font-size", (istyl - d - 4) + "px");
									}
									ib = ic.getBBox()
									var ih = ib.height
									var ny = ih + ((adjust.eh - ih) / 2)
									if (type == 'wi') {
										ny -= 3
									}
									if (type == 'mi') {
										ny += 2
									}

									var nx = Math.floor((linebox.x - ib.width) / 2)
									if (nx < 0) { nx = 0 }
									$(ic).attr('y', ny);
									$(ic).attr('x', nx);
								}
								if (layout == 'radial') {
									var arcbox = document.getElementById("ag_str_bg_" + $scope.unique).getBBox()
									ny = arcbox.y + arcbox.height
									if (type == 'mi') {
										ny += 3
									}
									if (type == 'wi') {
										ny -= 3
									}
									$(ic).attr('y', ny);
								}

							}
						}

						var updateGaugeLinear = function (p) {

							var ic = document.getElementById("ag_value_" + $scope.unique);
							if (ic) {
								$(ic).text(p.value);
							}
							if (p.pos.left) {
								return
							}
							var el = "#ag_str_line_" + $scope.unique
							if (p.pos.c) {
								var currentx = gsap.getProperty(el, 'X')
								if (currentx != null) {
									if ((currentx == p.pos.c && p.pos.x < p.pos.c) || (currentx < p.pos.c && p.pos.x == p.pos.c)) {
										gsap.to(el, {
											duration: .5,
											attr: {
												width: 1,
												x: p.pos.c
											},
											ease: "power2.in"
										});
										gsap.to(el, {
											duration: .5,
											delay: 0.5,
											attr: {
												width: p.pos.w,
												x: p.pos.x
											},
											ease: "power2.out"
										});
									} else {
										gsap.to(el, {
											duration: 1,
											attr: {
												width: p.pos.w,
												x: p.pos.x
											},
											ease: "power2.inOut"
										});
									}
								} else {
									gsap.to(el, {
										duration: 1,
										attr: {
											width: p.pos.w,
											x: p.pos.x
										},
										ease: "power2.inOut"
									});
								}
							} else {
								gsap.to(el, {
									duration: 1,
									attr: {
										width: p.pos.w,
										x: p.pos.x
									},
									ease: "power2.inOut"
								});
							}
							gsap.to(el, {
								duration: .5,
								delay: .5,
								fill: p.col
							})
						}

						var updateGaugeRadial = function (p) {
							var ic = document.getElementById("ag_value_" + $scope.unique);
							if (ic) {
								$(ic).text(p.value);
							}
							if (p.pos.x) {
								return
							}
							if (p.pos.cp) {
								if (($scope.arc.left < p.pos.cp && p.pos.left == p.pos.cp) || ($scope.arc.right > p.pos.cp && p.pos.right == p.pos.cp)) {
									gsap.to($scope.arc, {
										right: p.pos.cp,
										left: p.pos.cp,
										duration: .5,
										ease: "power2.in",
										onUpdate: drawArcLine,
										onUpdateParams: [$scope.arc]
									})
									gsap.to($scope.arc, {
										right: p.pos.right,
										left: p.pos.left,
										duration: .5,
										delay: .5,
										ease: "power2.out",
										onUpdate: drawArcLine,
										onUpdateParams: [$scope.arc]
									})
								} else {
									gsap.to($scope.arc, {
										right: p.pos.right,
										left: p.pos.left,
										duration: 1,
										ease: "power2.inOut",
										onUpdate: drawArcLine,
										onUpdateParams: [$scope.arc]
									})
								}
							} else {
								gsap.to($scope.arc, {
									right: p.pos.right,
									left: p.pos.left,
									duration: 1,
									ease: "power2.inOut",
									onUpdate: drawArcLine,
									onUpdateParams: [$scope.arc]
								})
							}
							var el = "#ag_str_line_" + $scope.unique
							gsap.to(el, {
								duration: .5,
								delay: .5,
								stroke: p.col
							})
						}

						var drawArcLine = function (p) {
							if (!p || !p.left || !p.right) {
								return
							}
							p.left = parseFloat(p.left)
							p.right = parseFloat(p.right)
							if (isNaN(p.left) || isNaN(p.right)) {
								return
							}
							var el = document.getElementById("ag_str_line_" + $scope.unique)
							if (el) {
								el.setAttribute("d", arcPath(p.cx, p.cy, p.r, p.left, p.right));
							}
						}

						var arcPath = function (x, y, radius, startAngle, endAngle) {
							var start = convert(x, y, radius, endAngle)
							var end = convert(x, y, radius, startAngle)
							var f = endAngle - startAngle <= 180 ? "0" : "1"
							var d = ["M", start.x, start.y, "A", radius, radius, 0, f, 0, end.x, end.y].join(" ")
							return d
						}

						var convert = function (cx, cy, r, a) {
							var rad = (a - 180) * Math.PI / 180
							return {
								x: cx + (r * Math.cos(rad)),
								y: cy + (r * Math.sin(rad))
							}
						}

						$scope.$watch('msg', function (msg) {
							if (!msg) {
								return;
							}

							update(msg)


						});
						$scope.$on('$destroy', function () {
							if ($scope.timeout != null) {
								clearTimeout($scope.timeout)
								$scope.timeout = null
							}
						});
					}
				});
			}
		} catch (e) {
			console.log(e);
		}
		node.on("close", function () {
			if (done) {
				done();
			}
		});
	}
	RED.nodes.registerType("ui_artlessgauge", ArtlessGaugeNode);

	var uipath = 'ui';
	if (RED.settings.ui) {
		uipath = RED.settings.ui.path;
	}
	var fullPath = path.join('/', uipath, '/ui-artless-gauge/*').replace(/\\/g, '/');
	RED.httpNode.get(fullPath, function (req, res) {
		var options = {
			root: __dirname + '/lib/',
			dotfiles: 'deny'
		};
		res.sendFile(req.params[0], options)
	});
};