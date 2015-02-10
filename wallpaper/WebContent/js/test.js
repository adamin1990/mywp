(function() {
	document.cookie = "js=1; path=/"
})();
function aaa(a) {
}
$.G = {
	gaq : function(b) {
		var a = $.G.getUSERID(), c = a ? "&userid=" + a : "";
		typeof _gaq != "undefined" && _gaq
				&& _gaq.push([ "_trackPageview", b ])
	},
	isRedirect : function(a) {
		a = a.split("?")[0];
		return a.indexOf("/dj/go2/") > -1 || a.indexOf("/redirect/") > -1
	},
	addfavorite : function(a, b) {
		if (document.all) {
			window.external.addFavorite(a, b);
			return true
		} else {
			if (window.sidebar && window.sidebar.addPanel) {
				window.sidebar.addPanel(b, a, "");
				return true
			}
		}
		return false
	},
	store : function(b) {
		var a = $("#win-house");
		if (!a.length) {
			a = $('<div id="win-house" class="h0"></div>').appendTo("body")
		}
		b && a.append(b);
		return a
	},
	getToken : function(h) {
		var d = {}, b = "", g = "", k = "", c = $(window), a = c.data("verif")
				|| [], j = $("input", "#form-token");
		if (b = $.Bom.getCookie("csrftoken")) {
			g = "csrfmiddlewaretoken=" + b;
			d.csrfmiddlewaretoken = b
		} else {
			if (j.length) {
				b = j.val();
				d.csrfmiddlewaretoken = b;
				g = $.param(d)
			}
		}
		k = '<input type="hidden" name="csrfmiddlewaretoken" value="' + b
				+ '" />';
		if (a.length) {
			g += "&ccode=" + a[0];
			g += "&ctoken=" + a[1];
			d.ccode = a[0];
			d.ctoken = a[1];
			k += '<input type="hidden" name="ccode" value="' + a[0]
					+ '" /><input type="hidden" name="ctoken" value="' + a[1]
					+ '" />'
		}
		return h ? h == 3 ? k : h == 2 ? d : g : g
	},
	getTokenVal : function() {
		var a = "", b = $("input", "#form-token");
		if (a = $.Bom.getCookie("csrftoken")) {
		} else {
			if (b.length) {
				a = b.val()
			}
		}
		return a
	},
	setCookie : function(a, b) {
		$.Bom.setSubCookie("sg", a, b)
	},
	setDayCookie : function(a, b) {
		$.Bom.setSubCookie("sgd", a, b, {
			expires : 1
		})
	},
	setWeekCookie : function(a, b) {
		$.Bom.setSubCookie("sgw", a, b, {
			expires : 7
		})
	},
	setMonthCookie : function(a, b) {
		$.Bom.setSubCookie("sgm", a, b, {
			expires : 30
		})
	},
	setYearCookie : function(a, b) {
		$.Bom.setSubCookie("sgy", a, b, {
			expires : 365
		})
	},
	getCookie : function(a) {
		return $.Bom.getSubCookie("sg", a)
	},
	getDayCookie : function(a) {
		return $.Bom.getSubCookie("sgd", a)
	},
	getWeekCookie : function(a) {
		return $.Bom.getSubCookie("sgw", a)
	},
	getMonthCookie : function(a) {
		return $.Bom.getSubCookie("sgm", a)
	},
	getYearCookie : function(a) {
		return $.Bom.getSubCookie("sgy", a)
	},
	simpleMarqueeW : function(b, f, j, d) {
		var k = $(b), c = k.find(":first-child"), h = k.parent();
		if (c.length) {
			var f = f || 4000, j = j || 2, d = d || 20, m, n = false, c, l;
			var a = function() {
				l = c.outerWidth(true);
				clearInterval(m);
				m = setInterval(g, d)
			};
			var g = function() {
				if (n) {
					return
				}
				if (h.scrollLeft() + j >= l) {
					clearInterval(m);
					k.append(c);
					h.scrollLeft(0);
					setTimeout(a, f)
				} else {
					h.scrollLeft(h.scrollLeft() + j)
				}
			};
			k.mouseover(function() {
				n = true
			});
			k.mouseout(function() {
				n = false
			});
			setTimeout(a, f)
		}
	},
	simpleMarqueeH : function(b, f, k, h, d) {
		var j = $(b), c = j.find(":first-child");
		if (c.length) {
			var f = f || 4000, h = h || 2, d = d || 20, m, n = false, c, l;
			var a = function() {
				l = c.outerHeight(true);
				clearInterval(m);
				m = setInterval(g, d)
			};
			var g = function() {
				if (n) {
					return
				}
				if (j.scrollTop() + h >= l) {
					clearInterval(m);
					j.append(c);
					j.scrollTop(0);
					setTimeout(a, f)
				} else {
					j.scrollTop(j.scrollTop() + h)
				}
			};
			j.mouseover(function() {
				n = true
			});
			j.mouseout(function() {
				n = false
			});
			setTimeout(a, k)
		}
	},
	scrollToAnchor : function(c, g) {
		var g = g || 0, d = $(window), f = $("body,html"), b = $("a[name=" + c
				+ "]");
		if (c && b.length) {
			var a = b.offset().top - g || 0;
			f.animate({
				scrollTop : a
			}, 200)
		} else {
			if (!!window.ActiveXObject && !window.XMLHttpRequest) {
				f.animate({
					scrollTop : a
				}, 200)
			}
		}
	},
	bindChecks : function(a, l, d, h, j, k) {
		var g = "input[type=checkbox],[checked],[checked=false]", m = $(a), c = $(l);
		function b(o) {
			var p = [], n = "", f = c.find(g);
			if (o.prop("checked")) {
				f.each(function(t, s) {
					var u = $(s), q = u.attr("value");
					u.prop("checked", true);
					if (q !== undefined) {
						u.attr("dvalue", q)
					}
					p.push(u.attr("dvalue"))
				});
				m.prop("checked", true).add(f).addClass("checked")
			} else {
				f.each(function(s, q) {
					$(q).prop("checked", false)
				});
				m.prop("checked", false).add(f).removeClass("checked")
			}
			n = $.trim(p.join(" ")).replace(/ /ig, ",");
			m.attr("dvalue", n);
			m.filter("[type=checkbox]").val(n)
		}
		if (d) {
			m.prop("checked", true)
		} else {
			if (d !== undefined) {
				m.prop("checked", false)
			} else {
				if (m.attr("dchecked") == "true") {
					m.prop("checked", true)
				} else {
					if (!m.prop("checked")) {
						m.prop("checked", false)
					}
				}
			}
		}
		b(m);
		if (m.attr("type") != "checkbox") {
			m.click(function(n) {
				var f = true;
				if ($.isFunction(h)) {
					f = h()
				}
				if (f) {
					m.prop("checked", !m.prop("checked"))
				}
			})
		}
		m.click(function(o) {
			o.stopPropagation();
			var n = $(this), f = true;
			if ($.isFunction(h)) {
				f = h.call(this, m, c, g)
			}
			if (f) {
				b(n);
				if ($.isFunction(j)) {
					j.call(this, m, c, g)
				}
			}
		});
		c
				.delegate(g, "click",
						function(t) {
							t.stopPropagation();
							var s = $(this);
							if (s.attr("type") != "checkbox") {
								s.prop("checked", !s.prop("checked"))
							}
							var q = $.trim(m.attr("dvalue")), f = q ? q
									.split(",") : [], o = "", n = s
									.attr("value");
							if (n !== undefined) {
								s.attr("dvalue", n)
							}
							n = s.attr("dvalue");
							f = $(f).filter(function(v, u) {
								return u !== n
							}).get();
							var p = s.prop("checked");
							if (p) {
								f.push(n);
								s.addClass("checked")
							} else {
								s.removeClass("checked")
							}
							o = $.trim(f.join(" ")).replace(/ /ig, ",");
							m.attr("dvalue", o);
							if (m.attr("type") == "checkbox") {
								m.val(o)
							}
							if ($.isFunction(k)) {
								k.call(this, m, c, g, p)
							}
						})
	},
	getCursorPosition : function(b) {
		var a = {
			text : "",
			start : 0,
			end : 0
		};
		if (b.setSelectionRange) {
			a.start = b.selectionStart;
			a.end = b.selectionEnd;
			a.text = (a.start != a.end) ? b.value.substring(a.start, a.end)
					: ""
		} else {
			if (document.selection) {
				var c, d = document.selection.createRange(), f = document.body
						.createTextRange();
				f.moveToElementText(b);
				a.text = d.text;
				a.bookmark = d.getBookmark();
				for (c = 0; f.compareEndPoints("StartToStart", d) < 0
						&& d.moveStart("character", -1) !== 0; c++) {
					if (b.value.charAt(c) == "\n") {
						c++
					}
				}
				a.start = c;
				a.end = a.text.length + a.start
			}
		}
		return a
	},
	setCursorPosition : function(b, a) {
		if (!a) {
			alert("You must get cursor position first.")
		}
		if (b.setSelectionRange) {
			b.focus();
			b.setSelectionRange(a.start, a.end)
		} else {
			if (b.createTextRange) {
				var c = b.createTextRange();
				if (b.value.length === a.start) {
					c.collapse(false);
					c.select()
				} else {
					c.moveToBookmark(a.bookmark);
					c.select()
				}
			}
		}
	},
	getSelectedText : function() {
		var a = window, b = document;
		if (a.getSelection) {
			return a.getSelection().toString()
		} else {
			if (b.getSelection) {
				return b.getSelection()
			} else {
				if (b.selection) {
					return b.selection.createRange().text
				}
			}
		}
	},
	blinkIt : function(d, b, a, f, c) {
		c = c || 1000;
		if (f === 0) {
			a();
			return
		}
		if ($.isFunction(d)) {
			d()
		}
		window.setTimeout(function() {
			$.G.blinkIt(b, d, a, --f, c)
		}, c)
	},
	recurseDo : function(c, a, f, b, d) {
		if (f == 0) {
			if ($.isFunction(d)) {
				d()
			}
			return
		}
		a = c.apply(null, a);
		if (a[0].length) {
			setTimeout(function() {
				$.G.recurseDo(c, a, --f, b, d)
			}, b)
		} else {
			if ($.isFunction(d)) {
				d()
			}
		}
	},
	getUSERID : function() {
		if (typeof USER !== "undefined" && USER.ID) {
			return USER.ID
		} else {
			return ""
		}
	},
	isSTAFF : function() {
		if (typeof USER !== "undefined" && USER.ISSTAFF) {
			return true
		} else {
			return false
		}
	},
	dtImageTrans : function(d, f, a, g, k) {
		var b = $.trim(d).replace(/^http(s)?:\/\//ig, ""), b = b.split("/"), j = b[0], b = b[1];
		if (j.indexOf("duitang.com") == -1 || !b || b != "uploads"
				&& b != "misc") {
			return d
		}
		if (f) {
			a = a || 0;
			g = g || 0;
			k = k ? "_" + k : "";
			return $.G.dtImageTrans(d).replace(/(\.[a-z_]+)$/ig,
					".thumb." + a + "_" + g + k + "$1")
		} else {
			return d.replace(/(?:\.thumb\.\w+|\.[a-z]+!\w+)(\.[a-z_]+)$/ig,
					"$1")
		}
	},
	getFitSize : function(d, c) {
		if (d[0] && d[1] && c[0]) {
			if (!c[1]) {
				c[1] = c[0]
			}
			if (d[0] > c[0] || d[1] > c[1]) {
				var g = d[0] / d[1], f = g >= c[0] / c[1];
				return f ? [ c[0], parseInt(c[0] / g) ] : [ parseInt(c[1] * g),
						c[1] ]
			}
		}
		return d
	},
	setImgSize : function(b, a, f) {
		b.onload = null;
		b.removeAttribute("width");
		b.removeAttribute("height");
		var c = b;
		if (c && c.width && c.height && a) {
			if (!f) {
				f = a
			}
			if (c.width > a || c.height > f) {
				var g = c.width / c.height, d = g >= a / f;
				b[d ? "width" : "height"] = d ? a : f;
				if (document.all) {
					b[d ? "height" : "width"] = (d ? a : f) * (d ? 1 / g : g)
				}
			}
		}
		b.style.visibility = "visible"
	},
	setImgSizeByAncestor : function(f, b) {
		f.onload = null;
		var d = $(f).parent(b)[0];
		if (d) {
			var c = parseInt($(d).css("width"));
			c = c ? c : d.offsetWidth;
			$.G.setImgSize(f, c)
		}
	},
	getNum : function(a) {
		return a ? +a.replace(/^[^\d]*(\d+\.?\d*).*/, "$1") || 0 : 0
	},
	isFromDomain : function(a) {
		a = a.replace("http://", "").replace("https://", "");
		a = a.split("?");
		a = a[0].split("/");
		a = a[0];
		for (var b = 1; b < arguments.length; b++) {
			if (a.indexOf(arguments[b]) > -1) {
				return true
			}
		}
		return false
	},
	trimLink : function(a, b) {
		return a
				.replace(
						/(?:http(?:s)?:\/\/)(?:(?:[\w-]+\.)+[\w-]+)(?:\:\d+)?(?:\/[\w-\.\/%]*)?(?:[?][\w-\.\/%!*\(\);\:@&=+$,\[\]]*)?(?:#[\w-\.\/%!*\(\);\:@&=+$,\[\]]*)?/ig,
						function(c) {
							return b ? '<a href="' + c + '" target="_blank">'
									+ c + "</a>" : ""
						})
	},
	isLink : function(a) {
		return !!a
				.match(/^(?:http(?:s)?:\/\/)(?:(?:[\w-]+\.)+[\w-]+)(?:\:\d+)?(?:\/[^ \t\n]*)?$/ig)
	},
	removeParam : function(c, b) {
		var d = new RegExp("\\?" + b + "(=[^&]*)?"), a = new RegExp("\\&" + b
				+ "(=[^&]*)?");
		return c.replace(d, "?").replace(a, "").replace(/\?&/, "?").replace(
				/\?$/, "")
	},
	getParams : function(b) {
		var a = {}, c, h, f, b = b.split("#")[0], j = b.indexOf("?"), l = j > -1 ? b
				.substr(j + 1)
				: "", g = l.split("&");
		for (f = 0, len = g.length; f < len; f++) {
			var k = g[f].indexOf("=");
			if (k > 0) {
				c = g[f].substring(0, k);
				h = g[f].substr(k + 1);
				try {
					if (h.indexOf("+") > -1) {
						h = h.replace(/\+/g, " ")
					}
					a[c] = decodeURIComponent(h)
				} catch (d) {
				}
			}
		}
		return a
	},
	addParam : function(b, f, d) {
		var c = new RegExp("([&\\?])" + f + "=[^& ]*", "g");
		b = b.replace(c, function(h, g) {
			return g == "?" ? "?" : ""
		});
		var a = b.indexOf("?");
		b += (a > -1 ? a + 1 != b.length ? "&" : "" : "?") + f + "=" + d;
		return b
	}
};
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(c, b) {
		if (b == null) {
			b = 0
		} else {
			if (b < 0) {
				b = Math.max(0, this.length + b)
			}
		}
		for (var a = b; a < this.length; a++) {
			if (this[a] === c) {
				return a
			}
		}
		return -1
	}
}
if (!String.prototype.lenB) {
	String.prototype.lenB = function() {
		return this.replace(/[^\x00-\xff]/g, "**").length
	}
}
if (!String.prototype.leftB) {
	String.prototype.leftB = function(h) {
		var g = this, d = g.slice(0, h), f = d.replace(/[^\x00-\xff]/g, "**").length;
		if (f <= h) {
			return d
		}
		f -= d.length;
		switch (f) {
		case 0:
			return d;
		case h:
			return g.slice(0, h >> 1);
		default:
			var b = h - f, a = g.slice(b, h), c = a.replace(/[\x00-\xff]/g, "").length;
			return c ? g.slice(0, b) + a.leftB(c) : g.slice(0, b)
		}
	}
}
if (!String.prototype.cut) {
	String.prototype.cut = function(g, d, c) {
		var f = this;
		r = c ? f.substr(0, g) : f.leftB(g);
		return r == f ? r : r + (typeof d === "undefined" ? "…" : d)
	}
}
Date.prototype.pattern = function(a) {
	var d = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
		"H+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		S : this.getMilliseconds()
	};
	var c = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(a)) {
		a = a.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length))
	}
	if (/(E+)/.test(a)) {
		a = a
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ c[this.getDay() + ""])
	}
	for ( var b in d) {
		if (new RegExp("(" + b + ")").test(a)) {
			a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (d[b])
					: (("00" + d[b]).substr(("" + d[b]).length)))
		}
	}
	return a
};
function getToken(h) {
	var d = {}, b = "", g = "", k = "", c = $(window), a = c
			.data("verification")
			|| [], j = $("input", "#form-token");
	if (b = $.Bom.getCookie("csrftoken")) {
		g = "csrfmiddlewaretoken=" + b;
		d.csrfmiddlewaretoken = b
	} else {
		if (j.length) {
			b = j.val();
			d.csrfmiddlewaretoken = b;
			g = $.param(d)
		}
	}
	k = '<input type="hidden" name="csrfmiddlewaretoken" value="' + b + '" />';
	if (b && a.length) {
		g += "&recaptcha_response_field=" + a[0];
		g += "&recaptcha_challenge_field=" + a[1];
		d.recaptcha_response_field = a[0];
		d.recaptcha_challenge_field = a[1];
		k += '<input type="hidden" name="recaptcha_response_field" value="'
				+ a[0]
				+ '" /><input type="hidden" name="recaptcha_challenge_field" value="'
				+ a[1] + '" />'
	}
	return h ? h == 3 ? k : h == 2 ? d : g : g
}
function getTokenVal() {
	var a = "", b = $("input", "#form-token");
	if (a = $.Bom.getCookie("csrftoken")) {
	} else {
		if (b.length) {
			a = b.val()
		}
	}
	return a
}
function mergeServerMessage(d) {
	var c = "";
	if ($.isArray(d)) {
		for (var b = 0; b < d.length; b++) {
			if ($.isArray(d[b])) {
				var a = d[b][1] || d[b][0] || "";
				c += a + ","
			}
			c += d[b] + ";"
		}
		c = c.slice(0, -1)
	} else {
		if ($.isPlainObject(d)) {
			for (e in d) {
				c += d[e].toString() + ";"
			}
			c = c.slice(0, -1)
		} else {
			c = d
		}
	}
	c = c || "";
	return c.split(";")[0].split(",")[0]
}
$
		.ajaxSetup({
			type : "POST",
			timeout : 20000,
			wrongmsg : function(b) {
				var a = $.trim(mergeServerMessage(b.message));
				if (a && SUGAR) {
					SUGAR.PopOut.alert('<div class="prompt prompt-fail"><h3>'
							+ a + "</h3></div>");
					$({}).delay(4000).queue(function() {
						SUGAR.PopOut.closeMask()
					})
				}
			},
			errormsg : function() {
				if (SUGAR) {
					SUGAR.PopOut
							.alert('<div class="prompt prompt-fail"><h3>网络出问题了，请稍后再试</h3></div>');
					$({}).delay(2000).queue(function() {
						SUGAR.PopOut.closeMask()
					})
				}
			},
			success : function(f, b, a) {
				if ($.inArray("html", this.dataTypes) != -1) {
					return
				}
				var d = $.isPlainObject(f) ? f : $.parseJSON(f);
				if (!d) {
					$.G.gaq("/_trc/Error/ajax/json_parse_fail_" + this.url);
					return
				}
				if (d.success || d.status == 1) {
					if ($.isFunction(this.mysuccess)) {
						this.mysuccess(d, f)
					}
				} else {
					if ($.isFunction(this.myfailure)) {
						this.myfailure(d, f)
					} else {
						this.wrongmsg(d)
					}
					var c = mergeServerMessage(d.message);
					if (c) {
						$.G.gaq("/_trc/Error/ajax/response_" + c + "_"
								+ this.url)
					}
				}
			},
			error : function(b, a) {
				$.G
						.gaq("/_trc/Error/ajax/status_"
								+ a
								+ "_"
								+ (this.url ? this.url : "null_"
										+ window.location.href));
				if ($.isFunction(this.myerror)) {
					this.myerror(b, a)
				}
			}
		});
(function(d) {
	var b = d.event, a = b.special;
	function c(f) {
		f.preventDefault();
		f.type = "safeSubmit";
		if (b.handle) {
			b.handle.apply(this, arguments)
		} else {
			if (b.dispatch) {
				b.dispatch.apply(this, arguments)
			}
		}
	}
	b.special.safeSubmit = {
		setup : function() {
			var f = this, g = d(f);
			b.add(f, "submit", c)
		},
		teardown : function() {
			var f = this, g = d(f);
			b.remove(f, "submit", c)
		}
	};
	d.fn.safeSubmit = function(h, g, f) {
		if (typeof f !== "function") {
			f = g;
			g = h;
			h = null
		}
		f = f || function() {
			alert("请输入内容")
		};
		return arguments.length > 0 ? this.unbind("safeSubmit").bind(
				"safeSubmit",
				h,
				function(m) {
					var k = this, n = d(k), l = d("input[type=text],textarea",
							n).not("[name=]").not("[data-optional]"), j = d(
							"[type=submit]", n);
					safe = true;
					l.each(function(o, p) {
						if (d.trim(d(p).val()) === "" && safe) {
							safe = false
						}
					});
					j.each(function(o, p) {
						if (d(p).prop("disabled") && safe) {
							safe = false
						}
					});
					if (safe) {
						g.call(this, arguments)
					} else {
						f.call(this, arguments)
					}
				}) : this.trigger("safeSubmit")
	}
})(jQuery);
(function(a) {
	a.fn.getFormAction = function() {
		var c = this, b = c[0];
		if (b && b.tagName.toLowerCase() === "form") {
			return encodeURI(c.attr("action"))
		}
		return null
	};
	a.fn.paramForm = function(c) {
		var d = a(this), b = {};
		d
				.find("input,select,textarea")
				.not("[type=submit]")
				.filter("[name]")
				.each(
						function(g, f) {
							if ((a(f).attr("type") === "checkbox" || a(f).attr(
									"type") === "radio")
									&& a(f).prop("checked") === true
									|| (a(f).attr("type") !== "checkbox" && a(f)
											.attr("type") !== "radio")) {
								if (a.type(b[f.name]) !== "undefined") {
									b[f.name] += "," + f.value
								} else {
									b[f.name] = f.value
								}
							}
						});
		if (a.isPlainObject(c)) {
			a.extend(b, c)
		}
		return a.param(b)
	};
	a.fn.lengthLimit = function(b) {
		this.filter("textarea,input[type=text]").each(function() {
			var f = a(this), d = f.attr("maxlength");
			var c = function(k) {
				var j = k ? k.keyCode : null;
				if (!j || j === 8 || j === 13 || j > 36 && j < 41) {
					return
				}
				var h = this, g = h.value, l = g.cut(d, "");
				if (l.length < g.length) {
					h.value = l;
					h.scrollTop = h.scrollHeight
				}
			};
			a(this).change(function(g) {
				c.call(this, g)
			}).keyup(function(g) {
				c.call(this, g)
			});
			c.apply(this)
		});
		return this
	};
	a.fn.inputTagLimit = function(b) {
		var c = a.extend(true, {}, {
			invalid : new RegExp("/"),
			taglen : 20
		}, b);
		this
				.filter("textarea,input[type=text]")
				.each(
						function() {
							var h = a(this), g = c.taglen, d;
							var f = function(o) {
								var n = o ? o.keyCode : null;
								if (!n || n === 8 || n === 13 || n > 36
										&& n < 41) {
									return
								}
								var l = h.val(), j = l.split(" "), j = j[j.length - 1], k = l
										.substring(0, l.length - j.length);
								if (l[l.length - 1] != " " && j && j.lenB() > g) {
									j = j.cut(g, "");
									l = k + j
								}
								h.val(l.replace(c.invalid, ""));
								vl = h.val().length;
								a.G.setCursorPosition(h[0], {
									start : vl,
									end : vl
								})
							};
							a(this).change(function(j) {
								f.call(this, j)
							}).keyup(function(j) {
								f.call(this, j)
							});
							f.apply(this)
						});
		return this
	};
	a.fn.pagelimit = function(f) {
		var g = a(this), d = f.length || 0;
		function b() {
			var h = parseInt(this.value) || 0;
			var j = d || 0;
			if (h > j) {
				this.value = j
			} else {
				if (h < 1) {
					this.value = 1
				} else {
					this.value = h
				}
			}
		}
		function c(h) {
			if (!(h.keyCode >= 37 && h.keyCode <= 40 || h.keyCode == 46 || h.keyCode == 8)) {
				b.call(this)
			}
		}
		g.change(c).keyup(c);
		b.call(this)
	}
})(jQuery);
(function(a) {
	function b(c, g) {
		for (var d = 0, f = ""; d < g; d++) {
			f += c
		}
		return f
	}
	a.fn.autogrow = function(c) {
		this.filter("textarea").each(
				function() {
					this.timeoutId = null;
					var j = a(this), f = j.height();
					var h = a("<div></div>").css({
						position : "absolute",
						wordWrap : "break-word",
						top : 0,
						left : -9999,
						display : "none",
						width : j.width(),
						fontSize : j.css("fontSize"),
						fontFamily : j.css("fontFamily"),
						lineHeight : j.css("lineHeight")
					}).appendTo(document.body);
					var g = function() {
						var k = this.value.replace(/</g, "<")
								.replace(/>/g, ">").replace(/&/g, "&").replace(
										/\n$/, "<br/>&nbsp;").replace(/\n/g,
										"<br/>").replace(/ {2,}/g, function(l) {
									return b("&nbsp;", l.length - 1) + " "
								});
						h.html(k);
						a(this).css("overflow", "hidden").css(
								"height",
								Math.max(h.height()
										+ (parseInt(j.css("lineHeight")) || 0),
										f))
					};
					var d = function() {
						clearTimeout(this.timeoutId);
						var k = this;
						this.timeoutId = setTimeout(function() {
							g.apply(k)
						}, 100)
					};
					a(this).change(g).keyup(d).keydown(d);
					g.apply(this)
				});
		return this
	}
})(jQuery);
(function(k) {
	k.fn._fadeIn = k.fn.fadeIn;
	var c = function() {
	};
	var l = document.documentMode || 0;
	var f = k.browser.msie && ((k.browser.version < 8 && !l) || l < 8);
	var g = k.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !l;
	k.blockUI = function(s) {
		d(window, s)
	};
	k.unblockUI = function(s) {
		j(window, s)
	};
	k.growlUI = function(w, u, v, s) {
		var t = k('<div class="growlUI"></div>');
		if (w) {
			t.append("<h1>" + w + "</h1>")
		}
		if (u) {
			t.append("<h2>" + u + "</h2>")
		}
		if (v == undefined) {
			v = 3000
		}
		k.blockUI({
			message : t,
			fadeIn : 700,
			fadeOut : 1000,
			centerY : false,
			timeout : v,
			showOverlay : false,
			onUnblock : s,
			css : k.blockUI.defaults.growlCSS
		})
	};
	k.fn.block = function(s) {
		return this.unblock({
			fadeOut : 0
		}).each(function() {
			if (k.css(this, "position") == "static") {
				this.style.position = "relative"
			}
			if (k.browser.msie) {
				this.style.zoom = 1
			}
			d(this, s)
		})
	};
	k.fn.unblock = function(s) {
		return this.each(function() {
			j(this, s)
		})
	};
	k.blockUI.version = 2.39;
	k.blockUI.defaults = {
		message : "<h1>Please wait...</h1>",
		title : null,
		draggable : true,
		theme : false,
		css : {
			padding : 0,
			margin : 0,
			width : "30%",
			top : "40%",
			left : "35%",
			textAlign : "center",
			color : "#000",
			border : "none",
			backgroundColor : "#fff"
		},
		themedCSS : {
			width : "30%",
			top : "40%",
			left : "35%"
		},
		overlayCSS : {
			backgroundColor : "#000",
			opacity : 0.2
		},
		growlCSS : {
			width : "350px",
			top : "10px",
			left : "",
			right : "10px",
			border : "none",
			padding : "5px",
			opacity : 0.6,
			cursor : "default",
			color : "#fff",
			backgroundColor : "#000",
			"-webkit-border-radius" : "10px",
			"-moz-border-radius" : "10px",
			"border-radius" : "10px"
		},
		iframeSrc : /^https/i.test(window.location.href || "") ? "javascript:false"
				: "about:blank",
		forceIframe : false,
		baseZ : 1000,
		centerX : true,
		centerY : true,
		allowBodyStretch : true,
		bindEvents : true,
		constrainTabKey : true,
		fadeIn : 200,
		fadeOut : 200,
		timeout : 0,
		showOverlay : true,
		focusInput : false,
		applyPlatformOpacityRules : true,
		onBlock : null,
		onUnblock : null,
		quirksmodeOffsetHack : 4,
		blockMsgClass : "blockMsg"
	};
	var b = null;
	var h = [];
	function d(w, I) {
		var D = (w == window);
		var A = I && I.message !== undefined ? I.message : undefined;
		I = k.extend({}, k.blockUI.defaults, I || {});
		I.overlayCSS = k.extend({}, k.blockUI.defaults.overlayCSS, I.overlayCSS
				|| {});
		var F = k.extend({}, k.blockUI.defaults.css, I.css || {});
		var Q = k.extend({}, k.blockUI.defaults.themedCSS, I.themedCSS || {});
		A = A === undefined ? I.message : A;
		if (D && b) {
			j(window, {
				fadeOut : 0
			})
		}
		if (A && typeof A != "string" && (A.parentNode || A.jquery)) {
			var L = A.jquery ? A[0] : A;
			var S = {};
			k(w).data("blockUI.history", S);
			S.el = L;
			S.parent = L.parentNode;
			S.display = L.style.display;
			S.position = L.style.position;
			if (S.parent) {
				S.parent.removeChild(L)
			}
		}
		k(w).data("blockUI.onUnblock", I.onUnblock);
		var E = I.baseZ;
		var P = (k.browser.msie || I.forceIframe) ? k('<iframe class="blockUI" style="z-index:'
				+ (E++)
				+ ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'
				+ I.iframeSrc + '"></iframe>')
				: k('<div class="blockUI" style="display:none"></div>');
		var O = I.theme ? k('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'
				+ (E++) + ';display:none"></div>')
				: k('<div class="blockUI blockOverlay" style="z-index:'
						+ (E++)
						+ ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
		var N, J;
		if (I.theme && D) {
			J = '<div class="blockUI '
					+ I.blockMsgClass
					+ ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'
					+ (E + 10)
					+ ';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'
					+ (I.title || "&nbsp;")
					+ '</div><div class="ui-widget-content ui-dialog-content"></div></div>'
		} else {
			if (I.theme) {
				J = '<div class="blockUI '
						+ I.blockMsgClass
						+ ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'
						+ (E + 10)
						+ ';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'
						+ (I.title || "&nbsp;")
						+ '</div><div class="ui-widget-content ui-dialog-content"></div></div>'
			} else {
				if (D) {
					J = '<div class="blockUI ' + I.blockMsgClass
							+ ' blockPage" style="z-index:' + (E + 10)
							+ ';display:none;position:fixed"></div>'
				} else {
					J = '<div class="blockUI ' + I.blockMsgClass
							+ ' blockElement" style="z-index:' + (E + 10)
							+ ';display:none;position:absolute"></div>'
				}
			}
		}
		N = k(J);
		if (A) {
			if (I.theme) {
				N.css(Q);
				N.addClass("ui-widget-content")
			} else {
				N.css(F)
			}
		}
		if (!I.theme
				&& (!I.applyPlatformOpacityRules || !(k.browser.mozilla && /Linux/
						.test(navigator.platform)))) {
			O.css(I.overlayCSS)
		}
		O.css("position", D ? "fixed" : "absolute");
		if (k.browser.msie || I.forceIframe) {
			P.css("opacity", 0)
		}
		var C = [ P, O, N ], R = D ? k("body") : k(w);
		k.each(C, function() {
			this.appendTo(R)
		});
		if (I.theme && I.draggable && k.fn.draggable) {
			N.draggable({
				handle : ".ui-dialog-titlebar",
				cancel : "li"
			})
		}
		var y = f
				&& (!k.boxModel || k("object,embed", D ? null : w).length > 0);
		if (g || y) {
			if (D && I.allowBodyStretch && k.boxModel) {
				k("html,body").css("height", "100%")
			}
			if ((g || !k.boxModel) && !D) {
				var H = o(w, "borderTopWidth"), M = o(w, "borderLeftWidth");
				var B = H ? "(0 - " + H + ")" : 0;
				var G = M ? "(0 - " + M + ")" : 0
			}
			k
					.each(
							[ P, O, N ],
							function(t, V) {
								var z = V[0].style;
								z.position = "absolute";
								if (t < 2) {
									D ? z
											.setExpression(
													"height",
													"Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"
															+ I.quirksmodeOffsetHack
															+ ') + "px"')
											: z
													.setExpression("height",
															'this.parentNode.offsetHeight + "px"');
									D ? z
											.setExpression(
													"width",
													'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
											: z
													.setExpression("width",
															'this.parentNode.offsetWidth + "px"');
									if (G) {
										z.setExpression("left", G)
									}
									if (B) {
										z.setExpression("top", B)
									}
								} else {
									if (I.centerY) {
										if (D) {
											z
													.setExpression(
															"top",
															'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
										}
										z.marginTop = 0
									} else {
										if (!I.centerY && D) {
											var T = (I.css && I.css.top) ? parseInt(I.css.top)
													: 0;
											var U = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "
													+ T + ') + "px"';
											z.setExpression("top", U)
										}
									}
								}
							})
		}
		if (A) {
			if (I.theme) {
				N.find(".ui-widget-content").append(A)
			} else {
				N.append(A)
			}
			if (A.jquery || A.nodeType) {
				k(A).show()
			}
		}
		if ((k.browser.msie || I.forceIframe) && I.showOverlay) {
			P.show()
		}
		if (I.fadeIn) {
			var K = I.onBlock ? I.onBlock : c;
			var v = (I.showOverlay && !A) ? K : c;
			var u = A ? K : c;
			if (I.showOverlay) {
				O._fadeIn(I.fadeIn, v)
			}
			if (A) {
				N._fadeIn(I.fadeIn, u)
			}
		} else {
			if (I.showOverlay) {
				O.show()
			}
			if (A) {
				N.show()
			}
			if (I.onBlock) {
				I.onBlock()
			}
		}
		n(1, w, I);
		if (D) {
			b = N[0];
			h = k(":input:enabled:visible", b).not("[type=file]");
			if (I.focusInput) {
				setTimeout(q, 20)
			}
		} else {
			a(N[0], I.centerX, I.centerY)
		}
		if (I.timeout) {
			var x = setTimeout(function() {
				D ? k.unblockUI(I) : k(w).unblock(I)
			}, I.timeout);
			k(w).data("blockUI.timeout", x)
		}
	}
	function j(v, w) {
		var u = (v == window);
		var t = k(v);
		var x = t.data("blockUI.history");
		var y = t.data("blockUI.timeout");
		if (y) {
			clearTimeout(y);
			t.removeData("blockUI.timeout")
		}
		w = k.extend({}, k.blockUI.defaults, w || {});
		n(0, v, w);
		if (w.onUnblock === null) {
			w.onUnblock = t.data("blockUI.onUnblock");
			t.removeData("blockUI.onUnblock")
		}
		var s;
		if (u) {
			s = k("body").children().filter(".blockUI").add("body > .blockUI")
		} else {
			s = k(".blockUI", v)
		}
		if (u) {
			b = h = null
		}
		if (w.fadeOut) {
			s.fadeOut(w.fadeOut);
			setTimeout(function() {
				m(s, x, w, v)
			}, w.fadeOut)
		} else {
			m(s, x, w, v)
		}
	}
	function m(s, v, u, t) {
		s.each(function(w, x) {
			if (this.parentNode) {
				this.parentNode.removeChild(this)
			}
		});
		if (v && v.el) {
			v.el.style.display = v.display;
			v.el.style.position = v.position;
			if (v.parent) {
				v.parent.appendChild(v.el)
			}
			k(t).removeData("blockUI.history")
		}
		if (typeof u.onUnblock == "function") {
			u.onUnblock(t, u)
		}
	}
	function n(s, w, x) {
		var v = w == window, u = k(w);
		if (!s && (v && !b || !v && !u.data("blockUI.isBlocked"))) {
			return
		}
		if (!v) {
			u.data("blockUI.isBlocked", s)
		}
		if (!x.bindEvents || (s && !x.showOverlay)) {
			return
		}
		var t = "mousedown mouseup keydown keypress";
		s ? k(document).bind(t, x, p) : k(document).unbind(t, p)
	}
	function p(w) {
		if (w.keyCode && w.keyCode == 9) {
			if (b && w.data.constrainTabKey) {
				var u = h;
				var t = !w.shiftKey && w.target === u[u.length - 1];
				var s = w.shiftKey && w.target === u[0];
				if (t || s) {
					setTimeout(function() {
						q(s)
					}, 10);
					return false
				}
			}
		}
		var v = w.data;
		if (k(w.target).parents("div." + v.blockMsgClass).length > 0) {
			return true
		}
		return k(w.target).parents().children().filter("div.blockUI").length == 0
	}
	function q(s) {
		if (!h) {
			return
		}
		var t = h[s === true ? h.length - 1 : 0];
		if (t) {
			t.focus()
		}
	}
	function a(A, u, C) {
		var B = A.parentNode, z = A.style;
		var v = ((B.offsetWidth - A.offsetWidth) / 2) - o(B, "borderLeftWidth");
		var w = ((B.offsetHeight - A.offsetHeight) / 2)
				- o(B, "borderTopWidth");
		if (u) {
			z.left = v > 0 ? (v + "px") : "0"
		}
		if (C) {
			z.top = w > 0 ? (w + "px") : "0"
		}
	}
	function o(s, t) {
		return parseInt(k.css(s, t)) || 0
	}
})(jQuery);
SUGAR = function() {
	var g = $.browser.msie, f = $.browser.mozilla, d = g
			&& $.browser.version === "6.0", c = g
			&& $.browser.version === "7.0", a = g
			&& $.browser.version === "8.0", h = g
			&& $.browser.version === "9.0", b = $.browser.opera;
	return {
		PopOut : function() {
			return {
				fnCloseMask : function() {
					this.closeMask()
				},
				poptorylen : 10,
				poptory : [],
				WD : [ 400, 484, 660 ],
				STR : [
						'<a href="javascript:;" target="_self" class="abtn l" onclick="SUGAR.PopOut.closeMask();"><button type="button"><u>关闭</u></button></a>',
						'<a href="javascript:;" target="_self" class="abtn l" onclick="SUGAR.PopOut.closeMask();"><button type="button"><u>取消</u></button></a>' ],
				go : function(j) {
					j = -j;
					if (j < 0 || j > 9) {
						return
					}
					var m = this, l;
					if (l = m.poptory[j]) {
						var k = m.setCont([ l.head, l.cont ], l.n);
						m.blockPop(k, l.n, l.ht, l.opt)
					}
				},
				alert : function(o, l, k) {
					var u = this, l = l === "s" ? 0 : l === "m" ? 1
							: l === "l" ? 2 : l, l = l || 0, m = u.WD, j = $.G
							.store();
					if ($.type(o) === "string" || $.type(o) === "number") {
						o = [ "", o + "" ]
					}
					o[0] = o[0];
					o[1] = o[1] || "";
					var p = $.type(o[1]) === "string", s = u.setCont(o, l);
					var q = s.outerHeight();
					if (p) {
						var t = s.html();
						s.remove();
						s = '<div class="mask-body">' + t + "</div>"
					} else {
						u.poptory = [ {
							head : o[0],
							cont : $(o[1]),
							n : l,
							ht : q,
							opt : k
						} ].concat(u.poptory), u.poptory.length = u.poptorylen
					}
					u.blockPop(s, l, q, k)
				},
				setCont : function(l, q) {
					var p = this, m = p.WD, k = $.G.store(), j, o;
							j = l[0] == null ? ""
									: $('<div class="tt-s"><span>'
											+ l[0]
											+ '</span><a class="mask-close" target="_self" href="javascript:;" onclick="SUGAR.PopOut.closeMask();">关闭</a></div>'),
							o = $('<div class="mask-body"></div>').css("width",
									m[q]).appendTo(k), o.append(j).append(
									$('<div class="mask-cont"></div>').append(
											l[1]));
					return o
				},
				blockPop : function(u, m, t, l) {
					var v = this, o = v.WD, k = $.G.store();
					l = $.extend({
						position : "fixed"
					}, l);
					var p = false, s, j, q;
					if (l.position === "fixed") {
						p = true
					} else {
						s = $(window), j = s.scrollTop(), q = s.height()
					}
					$.blockUI({
						message : u,
						baseZ : 9000,
						focusInput : (l && l.focus !== undefined) ? l.focus
								: true,
						onUnblock : function() {
							k.find(".mask-cont:empty").closest(".mask-body")
									.remove();
							if (l && $.isFunction(l.fn)) {
								l.fn()
							}
						},
						css : {
							position : l.position,
							top : (p ? "50%" : j),
							left : "50%",
							textAlign : "left",
							marginLeft : -(o[m] / 2),
							marginTop : p ? -(t / 2) - 20 : (t >= q ? 0
									: (q - t) / 2),
							width : o[m],
							height : t,
							border : "none",
							background : "none"
						},
						fadeIn : $(".blockOverlay:visible").length ? 0 : 200
					});
					if (m < 1) {
						v.setOverLay()
					}
				},
				setOverLay : function() {
					if (d) {
						return
					}
					var l = $("div.blockPage"), j = l.outerWidth(), n = l
							.outerHeight(), m = parseInt(l.css("marginTop")), k = parseInt(l
							.css("marginLeft"));
					$("div.blockOverlay").css({
						width : j + 24,
						height : n + 24,
						top : "50%",
						left : "50%",
						marginTop : m - 12,
						marginLeft : k - 12,
						"border-radius" : "8px",
						"-moz-border-radius" : "8px",
						"-webkit-border-radius" : "8px"
					})
				},
				closeMask : function() {
					$.unblockUI()
				}
			}
		}()
	}
}();
(function(c) {
	var b = c.browser.msie && c.browser.version === "6.0", a = c.browser.opera;
	c.fn.sidepop = function(d) {
		var g = {
			_create : function(l, o) {
				var n = o.id, k = l.$pop;
				var m = [ "none", "none", "none" ];
				if (o.btnset == 1) {
					m[2] = ""
				} else {
					if (o.btnset == 2) {
						m[0] = ""
					} else {
						if (o.btnset == 3) {
							m[2] = "";
							m[0] = ""
						}
					}
				}
				l.$bar = c(o.btnset ? [ '<div class="', o.btnClass.bars, '" ',
						o.seat ? "" : 'style="display:none;"', '><a  class="',
						o.btnClass.min, '" style="display:', m[0],
						'" href="javascript:;" target="_self">-</a><a class="',
						o.btnClass.max, '" style="display:', m[1],
						'" href="javascript:;" target="_self">+</a><a class="',
						o.btnClass.close, '" style="display:', m[2],
						'" href="javascript:;" target="_self">X</a></div>' ]
						.join("") : "");
				l.$cont = c('<div class="' + o.btnClass.cont + '"></div>');
				if (o.seat) {
					l.$dom = c('<div class="' + n + '"></div>').append(l.$bar)
							.append(l.$cont);
					l.$wrap = c("<div>").append(l.$dom);
					k.before(l.$wrap);
					l.$cont.append(k)
				} else {
					l.$dom = c('<div class="' + n + '"></div>').append(l.$bar)
							.append(l.$cont.append(k)).appendTo(o.position)
				}
			},
			_feature : function(s, q) {
				var n = s.$pop, v = s.$dom, u = s.$cont, l = c(window), m = l
						.width(), k = l.height(), o = l.scrollTop();
				s.size = [ q.width === null ? u.outerWidth() : q.width,
						q.height === null ? u.outerHeight() : q.height ];
				var t = "absolute";
				if (q.seat) {
					v.removeClass(".SG-posfollow");
					t = "relative";
					var p = v.offset();
					s.inittop = p.top;
					s.initleft = p.left;
					s.$wrap.css({
						width : q.width,
						height : q.height
					})
				} else {
					if (!b && q.isFixed == 1) {
						t = "fixed"
					}
				}
				v.css({
					position : t,
					bottom : "auto",
					zIndex : q.zIndex,
					width : s.size[0],
					height : s.size[1]
				});
				s.bias = q.bias === "middle" ? (k - s.size[1]) / 2 : q.bias;
				s.departure = q.departure === "center" ? (m - s.size[0]) / 2
						: q.departure;
				if (b && q.baseline == "bottom" || a && q.baseline == "bottom") {
					s.bias -= 2
				}
				v.css({
					left : q.dockSide === "right" ? "auto" : s.departure,
					right : q.dockSide === "left" ? "auto" : s.departure
				});
				if (q.baseline == "bottom") {
					if (!q.seat && !b && q.isFixed == 1) {
						v.css({
							top : "auto",
							bottom : s.bias
						})
					}
				} else {
					if (q.baseline == "top") {
						if (!q.seat && !b && q.isFixed == 1) {
							v.css({
								bottom : "auto",
								top : s.bias
							})
						}
					}
				}
			},
			_bindBars : function(k, n) {
				var m = k.$bar, l = n.btnClass;
				m.delegate("a", "click", function(o) {
					var p = c(this);
					if (p.hasClass(l.close)) {
						g.close(k, n)
					} else {
						if (p.hasClass(l.show)) {
							g.show(k, n)
						} else {
							if (p.hasClass(l.min)) {
								g.min(k, n)
							} else {
								if (p.hasClass(l.max)) {
									g.max(k, n)
								}
							}
						}
					}
				})
			},
			_scrollAnim : function(k, l) {
				if (l.scroll === 2) {
					k.$dom.stop().css({
						opacity : 0,
						top : g._getTop(k, l)[0]
					}).animate({
						opacity : 1
					}, l.fadeSpeed, function() {
						k.$bar.css("display", "block")
					})
				} else {
					k.$dom.animate({
						top : g._getTop(k, l)[0]
					}, l.floatSpeed, function() {
						k.$bar.css("display", "block")
					})
				}
			},
			_eventScroll : function(l) {
				var k = l.data.props, m = l.data.c;
				if (m.scroll === 2) {
					k.$dom.not(":animated").css({
						opacity : 0
					})
				}
				if (c.isFunction(m.withScroll)) {
					m.withScroll()
				}
				window.clearTimeout(k.scrollTimer);
				k.scrollTimer = window.setTimeout(function() {
					g._scrollAnim(k, m)
				}, m.scrollDelayTime)
			},
			_scrollSeatAnim : function(m, n) {
				var k = m.$dom, l = g._getTop(m, n);
				m.inittop = m.$wrap.offset().top;
				if (!m.$wrap.find(":first-child").length) {
					m.$wrap.append(k)
				}
				if (l[0] < m.inittop) {
					k.removeClass("SG-posfollow");
					k.css({
						position : "relative",
						top : 0,
						left : 0
					})
				} else {
					if (n.seatrange && l[0] > m.inittop + n.seatrange - l[2]) {
						k.css({
							position : "relative",
							top : n.seatrange - l[2] + n.seattop,
							left : 0
						})
					} else {
						k.addClass("SG-posfollow");
						if (!b && n.isFixed == 1) {
							k.css({
								position : "fixed",
								top : l[0] - l[1] + n.seattop,
								left : m.initleft
							})
						} else {
							k.appendTo(n.position).css({
								position : "absolute",
								top : l[0],
								left : m.initleft
							})
						}
					}
				}
			},
			_eventScrollSeat : function(l) {
				var k = l.data.props, m = l.data.c;
				if (c.isFunction(m.withScroll)) {
					m.withScroll()
				}
				g._scrollSeatAnim(k, m)
			},
			_bindScroll : function(k, l) {
				if (!l.seat && !b && l.isFixed == 1 || l.scroll === 0) {
					k.$bar.css("display", "block");
					return
				} else {
					if (l.seat) {
						k.$bar.css("display", "block");
						c(window).scroll({
							props : k,
							c : l
						}, g._eventScrollSeat);
						g._scrollSeatAnim(k, l)
					} else {
						c(window).scroll({
							props : k,
							c : l
						}, g._eventScroll);
						g._scrollAnim(k, l)
					}
				}
			},
			_unbindScroll : function() {
				c(window).unbind("scroll", g._eventScroll)
			},
			_getTop : function(p, o) {
				var q = p.bias, t = p.$dom, s = t.outerHeight(false), m = c(
						window).width(), k = c(window).height(), n = c(window)
						.scrollTop(), l = s + q - k;
				l = l < 0 ? 0 : l;
				switch (o.baseline) {
				case "top":
					return [ n + q - l, n, s ];
				case "bottom":
					return [ n + k - s - q + l, n, s ]
				}
			},
			close : function(m, o) {
				var k = m.$dom, n = o.btnClass;
				k.css("display", "none");
				g._unbindScroll(m, o);
				var l = n.close;
				c("." + l, k).removeClass(l).addClass(n.show);
				if (c.isFunction(o.fnAfterClose)) {
					o.fnAfterClose.call(g, m, o)
				}
			},
			show : function(m, o) {
				var k = m.$dom, n = o.btnClass;
				k.css("display", "block");
				g._bindScroll(m, o);
				var l = n.show;
				c("." + l, k).removeClass(l).addClass(n.close)
			},
			min : function(m, p) {
				var l = m.$dom, n = p.btnClass, o = p.expandDir === "left-right", k = o ? {
					width : p.remainArea
				}
						: {
							height : p.remainArea
						};
				if (!o && p.baseline === "bottom") {
					k.marginTop = m.size[1] - p.remainArea
				}
				l.animate(k, function() {
					c("." + n.min, l).css("display", "none");
					c("." + n.max, l).css("display", "inline")
				})
			},
			max : function(m, p) {
				var l = m.$dom, n = p.btnClass, o = p.expandDir === "left-right", k = o ? {
					width : m.size[0]
				}
						: {
							height : m.size[1]
						};
				if (!o && p.baseline === "bottom") {
					k.marginTop = 0
				}
				l.animate(k, function() {
					c("." + n.min, l).css("display", "inline");
					c("." + n.max, l).css("display", "none")
				})
			},
			_noop : c.noop
		};
		var j = c.extend(true, {}, c.fn.sidepop.defaults, d);
		var f = c(this), h = {};
		if (!f.length) {
			return
		}
		h.$pop = f;
		g._create(h, j);
		g._feature(h, j);
		g._bindBars(h, j);
		g._bindScroll(h, j);
		if (c.isFunction(j.fnInitExe)) {
			j.fnInitExe.call(g, h, j)
		}
		return this
	};
	c.fn.sidepop.defaults = {
		id : "",
		position : "body",
		width : null,
		height : null,
		remainArea : 25,
		initTop : null,
		btnClass : {
			min : "SG-sidemin",
			max : "SG-sidemax",
			close : "SG-sideclose",
			show : "SG-sideshow",
			bars : "SG-sidebar",
			cont : "SG-sidecont"
		},
		btnset : 1,
		scroll : 2,
		fnInitExe : null,
		fnAfterClose : null,
		dockSide : "left",
		departure : 0,
		baseline : "bottom",
		seat : false,
		seatrange : null,
		seattop : 0,
		withScroll : null,
		isFixed : 0,
		bias : 100,
		expandDir : "top-down",
		floatSpeed : 150,
		fadeSpeed : 250,
		scrollDelayTime : 350,
		zIndex : 1000
	}
})(jQuery);
(function(b) {
	var a = 1;
	b.fn.tippop = function(c) {
		var d = {
			_create : function(h, k) {
				var j = k.id, g = h.$pop;
				h.$dom = b('<div class="' + j + ' SG-tippop"></div>').append(
						b('<div class="pr"><u></u></div>')).append(g).appendTo(
						"body");
				h.size = [ k.width, k.height ];
				a = Math.max(a, k.zIndex);
				h.$dom.css({
					position : "absolute",
					bottom : "auto",
					zIndex : k.zIndex,
					width : h.size[0],
					height : h.size[1],
					display : "none"
				})
			},
			_bind : function(k, l) {
				var g = k.$dom, h = b(l.triger), j = l.delegateSelector;
				b(".SG-close", g).click(function(m) {
					m.preventDefault();
					d.close(k)
				});
				b(".SG-close-e", g).click(function(m) {
					m.preventDefault();
					d.close(k);
					h.unbind(l.eventType);
					g.remove()
				});
				g.bind("mouseenter", function(m) {
					clearTimeout(g.data("timer"));
					g.css({
						zIndex : ++a
					})
				}).bind("mouseleave", function(m) {
					g.data("timer", setTimeout(function() {
						d.close(k)
					}, l.holdon))
				});
				if (j === null) {
					h.bind(l.eventType, function(m) {
						d._show.call(this, k, l)
					}).bind("mouseleave", function() {
						g.mouseleave()
					})
				} else {
					h.delegate(j, l.eventType, function(m) {
						d._show.call(this, k, l)
					}).delegate(j, "mouseleave", function() {
						g.mouseleave()
					})
				}
			},
			close : function(g, h) {
				g.$dom.css("display", "none")
			},
			_show : function(t, q) {
				var m = t.$pop, w = t.$dom, j = w.outerWidth(), v = w
						.outerHeight(), g = b(document).width(), s = b(document)
						.height(), p = this === d || q.triger0 ? b(q.triger)
						: b(this), u = p.offset(), n = p.outerWidth(), h = p
						.outerHeight(), k;
				clearTimeout(w.data("timer"));
				t.offset = [ u.left + q.biasX, u.top + q.biasY ];
				var o = t.offset[0], l = t.offset[1];
				t.offset[0] = o + j > g ? g - j - 20 : o;
				t.offset[1] = l + v > s ? s - v - 20 : l;
				w.css({
					left : t.offset[0],
					top : t.offset[1],
					zIndex : ++a,
					display : "block"
				})
			},
			_noop : b.noop
		};
		var f = b.extend(true, {}, b.fn.tippop.defaults, c);
		return this.each(function() {
			var g = b(this), h = {};
			if (!g.data("tippop")) {
				h.$pop = g;
				d._create(h, f);
				d._bind(h, f);
				if (f.loadShow) {
					d._show(h, f)
				}
				if (b.isFunction(f.fnInitExe)) {
					f.fnInitExe.call(d, h, f)
				}
				g.data("tippop", true)
			}
		}).closest("." + f.id)
	};
	b.fn.tippop.defaults = {
		id : "",
		triger : null,
		triger0 : false,
		eventType : "mouseover",
		holdon : 1000,
		delegateSelector : null,
		width : "auto",
		height : "auto",
		biasX : 0,
		biasY : 0,
		loadShow : false,
		fnInitExe : null,
		zIndex : 3000
	}
})(jQuery);
(function() {
	$.SGAlert = $.SGAlert || {};
	$.SGAlert.show = function(c, g, j, d) {
		var j = j || ".mask-body:visible";
		var a = $(j);
		var d = d || {
			visibility : "hidden",
			position : "absolute",
			zIndex : 999999999,
			width : "auto",
			padding : "4px 12px",
			margin : "4px 0 0",
			lineHeight : "21px",
			fontSize : "12px",
			background : "#4c4c4c",
			borderRadius : "4px",
			color : "#fff"
		};
		if (!a.length) {
			a = $("body")
		}
		var k = parseInt(a.css("width")) || a.outerWidth();
		var b = a.find(".SGAlert-holder");
		if (!b.length) {
			b = $('<div class="SGAlert-holder"></div>').appendTo(a)
		}
		b.css(d).html(c);
		window.clearTimeout(b.data("timer"));
		var l = b.outerWidth(), f = b.outerHeight(true), h = 200;
		b.css({
			top : -f,
			visibility : "visible",
			left : (k - l) / 2
		}).animate({
			top : 0,
			opacity : 1
		}, h);
		if (g && g > 0) {
			b.data("timer", window.setTimeout(function() {
				b.animate({
					top : -f,
					opacity : 0
				}, h, function() {
					b.css("visibility", "hidden")
				})
			}, g))
		}
	};
	$.SGAlert.clean = function() {
		$(".SGAlert-holder").remove()
	}
})();
function setIptFocus(a) {
	function b(d) {
		var c = d.target;
		c.style.color = "#333";
		c.value = "";
		$(a).unbind("focus", arguments.callee)
	}
	$(a).focus(b)
}
function setLabelIptFocus(c, b) {
	function a() {
		if ($.trim($(c).val()) !== "") {
			clearTimeout($(b).data("timer"));
			$(b).css("display", "none")
		} else {
			$(b).data("timer", setTimeout(function() {
				$(b).css("display", "block")
			}, 150))
		}
	}
	$(c).bind("blur", function(d) {
		a()
	}).bind("focus click", function() {
		clearTimeout($(b).data("timer"));
		$(b).css("display", "none")
	});
	a()
}
function resetTags(a, j) {
	var h = $("a", a), g = [];
	for (var d = 0; d < h.length && d < 12; d++) {
		var b = $.trim(h[d].innerHTML);
		g.push(b)
	}
	var c = $(j).val(), f = false;
	h.each(function(m, o) {
		var l = $(o), k = $.trim(l.text()), n = $.inArray(k, g) != -1;
		if ((" " + c + " ").match(new RegExp("\\s" + k + "\\s", "ig"))) {
			$(o).addClass("added");
			if (!f && n) {
				f = true
			}
		} else {
			$(o).removeClass("added")
		}
	});
	if (f) {
		h.each(function(m, o) {
			var l = $(o), k = $.trim(l.text()), n = $.inArray(k, g) != -1;
			if (f && n) {
				$(o).addClass("added")
			}
		})
	}
}
function tagSelectBind(a, b, c) {
	$(a)
			.delegate(
					"a",
					"click",
					function(m) {
						m.preventDefault();
						m.stopPropagation();
						var k = $(this), h = $.trim(k.text()), n = k.parent()
								.find("a"), d = [];
						for (var g = 0; g < n.length && g < 12; g++) {
							var p = $.trim(n[g].innerHTML);
							d.push(p)
						}
						if (!k.hasClass("added")) {
							var f = $(b), q = $.trim(f.val()), o = $.trim(q
									.replace(/,/ig, " ").replace(/\s{2,}/ig,
											" ")), j = o.split(" "), l = j.length;
							if (l >= c) {
								alert("最多只能添加" + c + "个标签哦");
								return false
							}
							f.focus();
							f
									.val(f.val()
											+ (q == ""
													|| q.charAt(q.length - 1) == " " ? k
													.text()
													+ " "
													: " " + k.text() + " "));
							k.addClass("added")
						}
						if ($.inArray(h, d) != -1) {
							n.each(function(s, u) {
								var t = $(u);
								if ($.inArray($.trim(t.text()), d) != -1) {
									t.addClass("added")
								}
							})
						}
					});
	$(b)
			.keyup(
					function(j) {
						j.stopPropagation();
						var g = $.trim(this.value), h = $.trim(g.replace(/,/ig,
								" ").replace(/\s{2,}/ig, " ")), f = h
								.split(" "), d = f.length;
						if (d > c) {
							this.value = g.replace(/([ ,])+?[^ ,]*$/ig,
									function(l, k) {
										return k
									});
							j.preventDefault();
							return false
						}
						resetTags(a, this)
					})
}
function setTagsHTML(b, a) {
	var c = [];
	if ($.isArray(a)) {
		$(a).each(function(f, d) {
			if (d !== "|") {
				c.push('<a href="#"><i>' + d + "</i></a>")
			}
		});
		$(b).find("a").remove();
		$(b).append(c.slice(0, 20).join(""))
	}
}
function setDefaultTags(p) {
	var l = $("a", p), g = $.G.getMonthCookie("usedtags"), m = g ? g.split(";")
			: [], o = l.length, h = o > 12 ? 12 : o, a;
	var b = [];
	for (var f = 0; f < h; f++) {
		var n = $.trim($(l[f]).text());
		b.push(n)
	}
	b.push("|");
	for (var d = 0, c = m.length; d < c; d++) {
		if ($.inArray(m[d], b) === -1) {
			b.push(m[d])
		}
	}
	if (o > 12) {
		for (var f = 12; f < o; f++) {
			var n = $.trim($(l[f]).text());
			if (b.length < 21 && $.inArray(n, b) === -1) {
				b.push(n)
			}
		}
	}
	$.G.setMonthCookie("usedtags", b.join(";"));
	setTagsHTML(p, b)
}
function setUsedTags(c, h) {
	var j = $(h);
	var g = $.trim(j.val());
	if (g) {
		var b = $.trim(g.replace(/\s{2,}/g, " ")).split(" "), f = $.G
				.getMonthCookie("usedtags"), a = f.split(";"), d = $.inArray(
				"|", a);
		$(b).each(function(l, k) {
			if ($.inArray(k, a) === -1) {
				a = $.grep(a, function(m) {
					return m !== k && $.trim(m) !== ""
				});
				a = a.slice(0, d).concat([ k ], a.slice(d))
			}
		});
		a = a.slice(0, 20);
		$.G.setMonthCookie("usedtags", a.join(";"));
		setTagsHTML(c, a)
	}
}
function showSelectTags(a, d, c) {
	var f;
	function g() {
		if ($(a).data("mouselock")) {
			return
		}
		window.clearTimeout(f);
		if ($.isFunction(c)) {
			c(a, d, 1)
		} else {
			$(a).css("display", "block")
		}
	}
	function b() {
		if ($(a).data("mouselock")) {
			return
		}
		window.clearTimeout(f);
		f = window.setTimeout(function() {
			if ($.isFunction(c)) {
				c(a, d)
			} else {
				$(a).css("display", "none")
			}
		}, 200)
	}
	$(d).bind("click focus mouseenter", g).blur(b);
	$(a).bind("mouseenter", g);
	$(a).bind("mouseleave", b)
}
function keyupLenLimitForU(b, x, v, t, k) {
	if (!b || typeof b.value == "undefined") {
		return
	}
	var n = /(?:http(?:s)?:\/\/)(?:(?:[\w-]+\.)+[\w-]+)(?:\:\d+)?(?:\/[\w-\.\/%]*)?(?:[?][\w-\.\/%!*\(\);\:@&=+$,\[\]]*)?(?:#[\w-\.\/%!*\(\);\:@&=+$,\[\]]*)?(?=\s)/g, w = [], a = [], x = x || 300, v = !!v, k = $(k), s = 0, q = b.value
			.replace(n, function(l, j, o) {
				w.push(l);
				a.push(j - s);
				s += l.length;
				return ""
			}), f, m = false;
	if (v) {
		f = x - q.length
	} else {
		f = Math.floor((2 * x - q.lenB()) / 2)
	}
	f -= w.length * 8;
	if (f < 0) {
		if (v && t) {
			q = q.substr(0, x)
		} else {
			if (t) {
				q = q.cut(x * 2, "")
			}
		}
		var d = [];
		for (var h = 0, g = 0, c = w.length; h < c && h < 8; h++) {
			d.push(q.slice(g, a[h]));
			d.push(w[h]);
			g = a[h]
		}
		d.push(q.slice(g, q.length));
		b.value = d.join("");
		$(b).scrollTop(1000);
		m = true
	}
	k.html(t && f < 0 ? 0 : f);
	return m
}
(function() {
	if (SUGAR && SUGAR.PopOut) {
		var d = $.browser.msie, c = d && $.browser.version === "6.0", b = d
				&& $.browser.version === "7.0", a = d
				&& $.browser.version === "8.0", f = d
				&& $.browser.version === "9.0";
		$
				.extend(
						SUGAR.PopOut,
						{
							login : function(g) {
								var m = this;
								var n = $("#poplogin"), j = $.G.store(), h = g;
								if (!h) {
									h = location.pathname + location.search
											+ location.hash
								}
								n.find("[name=next]").val(h);
								if (!j.length) {
									j = $(
											'<div id="win-house" class="h0"></div>')
											.appendTo("body")
								}
								if (!n.length) {
									n = $('<div id="poplogin" class="win-wraper clr"><div class="login clr"><div class="cont"><form method="POST"  action="/login/?next='
											+ h
											+ '" method="POST" ><div class="unme cnt-i clr"><label for="username"></label><i>用户名/邮箱</i><input type="text" id="p-username" name="login_name" placeholder="用户名/邮箱" /></div><div class="pswd cnt-i clr"><label for="password"></label><i>密码</i><input type="password" id="p-password" name="pswd" placeholder="密码" /></div><div class="submit clr"><a class="abtn l" href="javascript:;" onmousedown="$.G.gaq(\'/_trc/Login/pop/direct\');"><button id="loginbtn" type="submit"><u>登录</u></button></a><div class="u-chk clr"><input class="chk" type="checkbox" name="remember" id="poplogin-rem" value="记住我" checked /><label for="poplogin-rem" >记住我</label><u>|&nbsp;</u><a href="/getpasswd/">忘记密码？</a></div></div></form><div class="toreg clr"><a href="/reg/" onmousedown="$.G.gaq(\'/_trc/Login/pop/reg\');">注册</a></div></div><div class="sites"><p>使用合作网站账号登录：</p><div class="clr"><a class="qqsite" href="/connect/qq/?next='
											+ h
											+ '" onmousedown="$.G.gaq(\'/_trc/Login/pop/connect_qq\');">QQ</a><a class="weibo" href="/connect/sina/?next='
											+ h
											+ '" onmousedown="$.G.gaq(\'/_trc/Login/pop/connect_sina\');">新浪微博</a><a class="douban" href="/connect/douban/?next='
											+ h
											+ '" onmousedown="$.G.gaq(\'/_trc/Login/pop/connect_douban\');">豆瓣</a><a class="qqweib" href="/connect/qweibo/?next='
											+ h
											+ '" onmousedown="$.G.gaq(\'/_trc/Login/pop/connect_qweibo\');">腾讯微博</a><a class="taobao" href="/connect/taobao/?next='
											+ h
											+ '" onmousedown="$.G.gaq(\'/_trc/Login/pop/connect_taobao\');">淘宝</a></div></div></div></div>');
									j.append(n)
								}
								var k = $("#p-username, #p-password");
								if (k.length
										&& typeof k.get(0).placeholder == "undefined") {
									var l = $("#poplogin").find("i");
									l.css("display", "block");
									l.click(function(o) {
										$(this).css("display", "none");
										$(this).siblings("input").focus()
									});
									k.focusin(function(o) {
										$(this).siblings("i").css("display",
												"none")
									});
									k.focusout(function(o) {
										if ($.trim(this.value) == "") {
											$(this).siblings("i").css(
													"display", "block")
										}
									});
									if (a) {
										k.keydown(function(o) {
											if (o.keyCode == 13
													&& $.trim($("#p-username")
															.val())
													&& $.trim($("#p-password")
															.val())) {
												o.preventDefault();
												o.stopPropagation();
												n.find("form").submit()
											}
										})
									}
								}
								m.alert([ "登录堆糖网", n, "" ], 2);
								$({}).delay(100).queue(function() {
									var o;
									if ((o = $("#p-username")[0])) {
										o.focus()
									}
								})
							}
						})
	}
})();
function mblogTagsInit(h) {
	var c = $(h[0]), k = $(h[1]), l = $(h[2]), m = $(h[3]), g = $(h[4]), b = $(h[5]), a = h[6], j, d;
	g.lengthLimit();
	var f = {
		tags : {
			user_tags : [],
			def_tags : [],
			used_tags : [],
			added_tags : []
		},
		_init : function() {
			for ( var q in this.tags) {
				this.tags[q] = []
			}
			var o = c.find(".added-tag"), s;
			for (var q = 0, n = o.length, p; q < n; q++) {
				p = $.trim($(o[q]).text());
				p && this.tags.user_tags.push(p)
			}
			if ($.fn.comtags) {
				m.append(function() {
					var v = "", t = $.fn.comtags.tags;
					for (var u = 0; u < t.length; u++) {
						v += '<a href="#">' + t[u] + "</a>"
					}
					return v
				})
			}
			this._initSysTags();
			this._flashHotTagHtml()
		},
		_initSysTags : function() {
			var u = $.G.getMonthCookie("usedtags"), s = u ? u.split(";") : [], v = m
					.find("a"), x = v.length, p = x >= 12 ? 12 : x, n;
			for (var q = 0, w; q < p; q++) {
				w = $.trim($(v[q]).text());
				w && this.tags.def_tags.push(w)
			}
			for (var q = 0, o = s.length, w; q < o; q++) {
				w = $.trim(s[q]);
				if (w && $.inArray(w, this.tags.def_tags) === -1 && w !== "|") {
					this.tags.used_tags.push(w)
				}
			}
			if (x > 12) {
				for (var q = 12, w; q < x; q++) {
					w = $.trim($(v[q]).text());
					if (this.tags.used_tags.length > 8) {
						break
					}
					if ($.inArray(w, this.tags.used_tags) === -1) {
						this.tags.used_tags.push(w)
					}
				}
			}
			this._saveToCookie()
		},
		_saveToCookie : function() {
			$.G.setMonthCookie("usedtags", this.tags.def_tags.join(";") + ";|;"
					+ this.tags.used_tags.slice(0, 20).join(";"))
		},
		_escapeHTML : function(o) {
			var n = {
				"&" : "&amp;",
				"<" : "&lt;",
				">" : "&gt;",
				'"' : "&quot;",
				"'" : "&#x27;",
				"/" : "&#x2F;"
			};
			return o.replace(/[&<>"'\/]/g, function(p) {
				return n[p]
			})
		},
		_flashHotTagHtml : function() {
			var v = this.tags.def_tags, n = this.tags.used_tags, s = this
					._getCurTags(), w = [], u = false;
			for (var q = 0, o = s.length, x; q < o; q++) {
				x = s[q];
				if ($.inArray(x, v) > -1) {
					u = true;
					break
				}
			}
			for (var q = 0, o = v.length, x, p; q < o; q++) {
				p = "";
				x = v[q];
				p += '<a class="def-tags';
				if ($.inArray(x, s) > -1) {
					p += " locked"
				}
				if (u) {
					p += " locked"
				}
				p += '" href="javascript:;"><i>' + this._escapeHTML(x)
						+ "</i></a>";
				w.push(p)
			}
			for (var q = 0, o = n.length, x; q < o; q++) {
				x = n[q];
				if ($.inArray(x, s) > -1) {
					w
							.push('<a class="user-tags locked" href="javascript:;"><i>'
									+ this._escapeHTML(x) + "</i></a>")
				} else {
					w.push('<a class="user-tags" href="javascript:;"><i>'
							+ this._escapeHTML(x) + "</i></a>")
				}
			}
			m.find("a").remove();
			m.append(w.slice(0, 20).join(""))
		},
		_removeFromSelect : function(n) {
			var p = c.find(".added-tag"), s = this.tags.user_tags, q = this.tags.added_tags, t = this.tags.used_tags, o = $
					.inArray(n, s);
			if (o !== -1) {
				this.tags.user_tags = s.slice(0, o).concat(
						s.slice(o + 1, s.length))
			}
			o = $.inArray(n, q);
			if (o !== -1) {
				this.tags.added_tags = q.slice(0, o).concat(
						q.slice(o + 1, q.length));
				tf = false
			}
			this._flashHotTagHtml();
			c.find(".added-tag").each(function(w, u) {
				if ($.trim($(u).text()) === n) {
					$(u).remove()
				}
			});
			c.closest("div").find(".tag-tips").removeClass("red")
		},
		_flashPageCnt : function() {
			if (l.length) {
				var o = this._getCurTags(), s = [], u;
				for (var q = 0, p, n = o.length; q < n; q++) {
					s.push('<a class="mytag" href="' + a + o[q] + '/"><i>'
							+ this._escapeHTML(o[q]) + "</i></a>")
				}
				l.find("a").not("#addnewtag").remove();
				l.prepend(s.join(""))
			}
			g.focus()
		},
		_remove : function(n) {
			if (k.hasClass("form-locked")) {
				return
			}
			k.addClass("form-locked");
			if (!n) {
				n = $.trim(g.prev().text())
			}
			if (!n) {
				return
			}
			if ($.inArray(n, this.tags.user_tags) === -1) {
				this._removeFromSelect(n);
				k.removeClass("form-locked");
				return
			}
			if (k.length) {
				c.find(".abtn").addClass("abtn-no");
				$.ajax(
						{
							url : k.getFormAction(),
							data : k.paramForm(getToken(2)) + "&tags="
									+ encodeURIComponent(n),
							mysuccess : function(o, p) {
								f._removeFromSelect(n);
								f._flashPageCnt()
							}
						}).always(function() {
					k.removeClass("form-locked");
					c.find(".abtn").removeClass("abtn-no")
				})
			} else {
				k.removeClass("form-locked");
				f._removeFromSelect(n);
				f._flashPageCnt()
			}
		},
		_add : function(u) {
			var q = {}, p = u.split(","), w = [], v = this.tags.user_tags
					.concat(this.tags.added_tags), n;
			g.val("");
			for (var s = 0, x, o = p.length; s < o; s++) {
				x = p[s];
				if (v.length >= 5) {
					c.closest("div").find(".tag-tips").addClass("red");
					return
				}
				if (x && $.inArray(x, this.tags.user_tags) === -1
						&& $.inArray(x, this.tags.added_tags) === -1) {
					v.push(x);
					this.tags.added_tags.push(x);
					g.before('<a class="added-tag" href="javascript:;"><i>'
							+ this._escapeHTML(x) + "</i></a>");
					if ($.inArray(x, this.tags.used_tags) === -1
							&& $.inArray(x, this.tags.def_tags) === -1) {
						this.tags.used_tags.unshift(x)
					}
				}
			}
			this._flashHotTagHtml();
			this._saveToCookie()
		},
		_checkLength : function() {
			return c.find(".added-tag").length
		},
		_getCurTags : function() {
			return this.tags.user_tags.concat(this.tags.added_tags)
		},
		_beforeSubmit : function() {
			var n = $.trim(g.val());
			if (n.length) {
				this._add(n)
			}
		},
		_afterSubmit : function() {
			this.tags.user_tags = this._getCurTags();
			this.tags.added_tags = []
		}
	};
	b.bind("click", function(n) {
		f.tags.added_tags = [];
		m.find(".locked").removeClass("locked")
	});
	m.delegate("a", "click", function(o) {
		var p = $(this), n = $.trim(p.text());
		if (p.hasClass("locked")) {
			return
		}
		if (f._checkLength() >= 5) {
			c.closest("div").find(".tag-tips").addClass("red");
			return
		}
		if (p.hasClass("def-tags")) {
			m.find(".def-tags").each(function() {
				if (!$(this).hasClass("locked")) {
					$(this).addClass("locked")
				}
			})
		} else {
			p.addClass("locked")
		}
		f._add(n);
		g.focus()
	});
	g.bind("keyup", function(q) {
		var s = $(this), o = s.val().slice(-1);
		if ((q.keyCode === 188 && !q.shiftKey) || q.keyCode === 13
				|| (q.keyCode === 229 && o === "，")) {
			var n = s.val(), p = n.length;
			p = q.keyCode === 13 ? p : p - 1;
			n = n.substr(0, p), n = n.replace(/,/ig, " ");
			s.val(n);
			n.length && f._add(n)
		}
	});
	g.bind("keydown", function(o) {
		var p = $(this), n = $.trim(p.val());
		if (o.keyCode === 8 && !n && f._getCurTags().length) {
			f._remove()
		}
		if (o.keyCode === 13) {
			o.preventDefault();
			return
		}
	});
	c.click(function(n) {
		g.focus()
	});
	c.delegate("a", "click", function(n) {
		f._remove($.trim($(this).text()))
	});
	c.submit(function(q) {
		var n = $(this), p = n.find(".abtn"), o = p.find("[type=submit]");
		var s;
		f._beforeSubmit();
		s = f.tags.added_tags.join(",");
		if (!s) {
			f._flashPageCnt();
			SUGAR.PopOut.closeMask(0);
			return
		}
		if (p.hasClass("abtn-no")) {
			return
		}
		p.addClass("abtn-no");
		n.find("input[name=tags]").val(s);
		$.ajax({
			url : n.getFormAction(),
			data : n.paramForm(getToken(2)),
			mysuccess : function(t, u) {
				SUGAR.PopOut.closeMask(0);
				f._flashPageCnt();
				f._afterSubmit()
			}
		}).always(function() {
			p.removeClass("abtn-no")
		})
	});
	f._init()
}
(function(a) {
	a.fn.comtags = {
		tags : [ "家居", "设计", "插画", "电影", "旅行", "手工", "女装", "男装", "配饰", "美食",
				"摄影", "艺术", "封面", "动漫", "怀旧", "街拍", "小孩", "宠物", "植物", "人物" ]
	}
})(jQuery);
function taobaoThumbPic(b, a, c) {
	if (/^http:\/\/[^\/]*(alicdn|taobaocdn|aliimg)\.com/.test(b)) {
		var b = b.replace(/_\.webp\w{0,10}$/ig, "");
		b = b.replace(/_\d+x[\da-z]{1,10}\.jpg$/ig, "");
		if (a) {
			return b + "_" + a + "x" + c + ".jpg"
		} else {
			return b
		}
	} else {
		return b
	}
}
(function() {
	$.SGColl = function() {
		var h, l, u, n, x, f, E, q, d, y, b, o, t, k, g, s, B, v, w, c, m, A, p, D = {
			upload : "上传图片",
			fetch : "抓取网页图片"
		}, C = [], z, a = 4000, j;
		return {
			type : "upload",
			init : function(H, G) {
				var I = this;
				if (!$.G.getUSERID()) {
					SUGAR.PopOut.login();
					return
				}
				if (typeof H !== "function") {
					G = H;
					H = $.noop
				}
				A = H;
				if (G && $.isPlainObject(G)) {
					p = $.extend({}, G)
				}
				if (p && p.type) {
					I.type = p.type
				}
				if (!I.inited) {
					I.inited = true;
					l = $("#sgcoll-up"), h = $.G.store(), j;
					if (!h.length) {
						h = $('<div id="win-house" class="h0"></div>')
								.appendTo("body")
					}
					if (!l.length) {
						var L = '<form id="form-sgcoll-poststatus" action="/people/mblog/add/" method="post" target="_blank"><input type="hidden" id="sgcoll-sourcetitle" name="source_title" value=""/><input type="hidden" id="sgcoll-sourcelink"  name="source_link" value=""/><!-- 图片区域 --> <div id="sgcoll-pics"></div><div id="sgcoll-panel"><!-- 专辑区域 --> <div class="sgcoll-album"><div id="sgcoll-albumsel" class="sgcoll-albumsel"><input id="sgcoll-albumsel-v" type="text" name="album" value="" data-optional="1"/><a class="sgcoll-shw" href="javascript:;">默认专辑</a></div></div> <!-- 输入框 --> <div class="sgcoll-cxa"><textarea name="content" class="txa" id="sgcoll-txa" data-optional="1"></textarea><span class="sgcoll-wremain dn"><b id="sgcoll-rmn">300</b> 字</span><label for="sgcoll-txa" id="sgcoll-txa-lb">写点介绍，让更多人喜欢ta</label></div> <!-- 标签区域 --> <div class="sgcoll-tags-wrp"><div id="sgcoll-tags-add" class="da tag-sel-cnt tag-use-cnt clr"><input id="sgcoll-tags-inp" class="tag-edt-ipt" autocomplete="off" type="text" value="" maxlength="20" /></div><label for="sgcoll-tags-inp" id="sgcoll-tags-lb"><i>&nbsp;</i>添加适合的标签，方便大家找到</label><button class="dn" id="dopost-tags-reset" type="button" /><div class="tag-use-cnt tag-def-cnt da" id="sgcoll-tags-sel"><span id="sgcoll-tags-cls"><span>关闭</span></span><span class="tag-use-desc">热门标签：</span></div></div> <!-- 发布按钮 --> <div id="sgcoll-subarea" class="u-chk clr"><a class="abtn l" href="javascript:;" target="_self"><button id="sgcoll-abtnpost" type="submit"><u>发布</u></button></a><input type="checkbox" name="syncpost" class="chk s-sina dn" value="sina" id="sgcoll-sync"><label for="sgcoll-sync" title="同步到新浪微博" class="s-sina dn" >同步</label><div class="sgcoll-mbsite s-sina dn">新浪</div><div id="sgcoll-poststat"></div></div></div><input id="sgcoll-tags-val" type="hidden" name="tags" value=""/><input type="hidden" name="source" value=""/><input type="hidden" value="" name="" id="sgcoll-imgcont" /><input id="sgcoll-grpid" type="hidden" name="group" value/></form>';
						l = $(
								'<div id="sgcoll-up"><div id="sgcoll-fetch-in" class="dn clr"><div class="sgcoll-dragdr"><a href="/about/collectit/?from=postbg" target="_blank">使用堆糖收集工具，抓取图片更简单 &gt;</a></div><div class="sgcoll-drgbox"><div class="gray sgcoll-fetch-normal" id="sgcoll-fchk">将图片所在页面网址完整地粘贴到这里</div><form id="form-sgcoll-fetchpic" class="sgcoll-fetch-normal" action="/mblog/fetch/" method="post" target="_self"><input type="text" value="http://" autocomplete="off" class="ipt" name="url" id="sgcoll-fipt"><div class="tc"><a target="_self" href="javascript:;" class="abtn dib" id="sgcoll-fchab"><button type="submit"><u>确定</u></button></a></div></form><div id="sgcoll-fetching" class="l loading3 dn">正在抓取<br/><a id="sgcoll-fetch-cancel" class="lkl" href="javascript:;">取消</a></div></div></div><div id="sgcoll-up-in" class="dn clr"><div id="sgcoll-dropimgcov">拖拽图片到这里可直接上传</div><div id="sgcoll-dropimg" class="sgcoll-dbox"><a id="sgcoll-upbtn" href="javascript:;" class="abtn abtn-up dib sgcoll-up-normal"><u><i></i>上传图片</u><form id="form-sgcoll-upic" target="alupifr" enctype="multipart/form-data" method="POST" action="/upload/photo/"><input name="img" hidefocus="true" type="file" /><input type="hidden" name="tid" value=""/><input type="hidden" name="callback" value="$.fn.uploadpic.upPicCallBack"><iframe name="alupifr" src="about:blank" class="dn" scrolling="no" frameborder="0" height="0" width="0"></iframe><input type="hidden" name="type" value="blog"/></form></a><div id="sgcoll-up-mess" class="sgcoll-up-normal">图片需小于10M；如有来源，请注明</div><div id="sgcoll-uploading" class="l loading3 dn">正在上传<br/><a id="sgcoll-up-cancel" class="uploadpic-delthepic lkl" href="javascript:;">取消</a></div></div></div><div id="sgcoll-uploaded" class="dn">'
										+ L + "</div></div>").appendTo(h);
						n = $("#form-sgcoll-fetchpic"), x = $("#sgcoll-fipt"),
								f = $("#sgcoll-pics"),
								E = $("#sgcoll-uploaded"),
								q = $("#sgcoll-txa"), d = $("#sgcoll-txa-lb"),
								y = $("#sgcoll-imgcont"),
								b = $("#sgcoll-tags-add"),
								o = $("#sgcoll-tags-val"),
								t = $("#sgcoll-tags-inp"),
								k = $("#sgcoll-tags-lb"),
								g = $("#sgcoll-tags-sel"), s = $(
										"#sgcoll-tags-cls").find("span"),
								B = $("#dopost-tags-reset"),
								v = $("#sgcoll-albumsel"),
								w = $("#sgcoll-subarea"),
								c = $("#form-sgcoll-poststatus"),
								m = $("#sgcoll-abtnpost"), j;
						if (typeof BIND_SITES == "undefined"
								|| !BIND_SITES.sina) {
							w.find(".s-sina").remove()
						} else {
							w.find(".s-sina").removeClass("dn")
						}
						I.resetType(I.type, true);
						var F = !!($.browser.webkit && navigator.userAgent
								.toString().match("Chrome"));
						if (F && window.File && window.FileList) {
							var K = $("#sgcoll-dropimg,#sgcoll-dropimgcov");
							K
									.bind(
											"dragenter",
											function(N) {
												if (N.originalEvent.dataTransfer.types
														.toString() === "Files") {
													window.clearTimeout(K
															.data("timer"));
													K.css("backgroundPosition",
															"0 -300px");
													$("#sgcoll-dropimgcov")
															.css("display",
																	"block")
												}
											})
									.bind(
											"dragleave",
											function(N) {
												window.clearTimeout(K
														.data("timer"));
												K
														.eq(0)
														.data(
																"timer",
																window
																		.setTimeout(
																				function() {
																					K
																							.css(
																									"backgroundPosition",
																									"0 0");
																					$(
																							"#sgcoll-dropimgcov")
																							.css(
																									"display",
																									"none")
																				},
																				100))
											})
									.bind("dragover", function(N) {
										N.preventDefault();
										N.stopPropagation();
										window.clearTimeout(K.data("timer"))
									})
									.bind(
											"drop",
											function(P) {
												P.preventDefault();
												P.stopPropagation();
												$("#sgcoll-dropimgcov").css(
														"display", "none");
												var O = P.originalEvent.dataTransfer.files;
												if (O.length) {
													var N = $(
															"#form-sgcoll-upic input[type=file]")
															.get(0);
													N.files = O
												}
											})
						}
						n.submit(function(N) {
							N.preventDefault();
							$.SGColl.doFetchPic()
						});
						$("#sgcoll-fetch-cancel").click(function(N) {
							N.preventDefault();
							$.SGColl.resetFetch()
						});
						x.focus(function(O) {
							var N = this;
							if ($.browser.webkit) {
								setTimeout(function() {
									N.select()
								}, 10)
							} else {
								N.select()
							}
						});
						$("#sgcoll-upbtn")
								.uploadpic(
										function(N, P, O) {
											if (N.success) {
												$.G.gaq("/_trc/Post/_/uppicok");
												$.SGColl.resetPost();
												f
														.html('<img id="sgcoll-upimg" data-iid="'
																+ N.picid
																+ '" src="'
																+ $.G
																		.dtImageTrans(
																				N.src,
																				true,
																				120,
																				120,
																				"c")
																+ '" />');
												y.val(N.picid);
												$("#sgcoll-up-in").addClass(
														"dn");
												$.SGColl.repop();
												if (p.tags) {
													t.val(p.tags), k.css(
															"display", "none")
												}
											} else {
												$.SGAlert.show(N.message, a);
												$.SGColl.resetFile();
												$(
														"#sgcoll-upbtn,#sgcoll-up-mess")
														.removeClass("dn")
											}
										},
										{
											onupload : function() {
												$.G
														.gaq("/_trc/Post/_/uppicsubmit");
												$.SGAlert.clean()
											},
											sel_holder : "#sgcoll-up",
											sel_form : "#form-sgcoll-upic",
											sel_normal : ".sgcoll-up-normal",
											sel_uploading : "#sgcoll-uploading",
											sel_uploaded : "#sgcoll-uploaded"
										});
						$("#sgcoll-up-cancel").click(function(N) {
							l.find("input[name=tid]").data("uploadpic-tid", "")
						});
						u = $("#sgcoll-albumsel").find("a").myalbums({
							sel_valueipt : $("#sgcoll-albumsel-v"),
							sel_holder : $("#sgcoll-uploaded")
						});
						mblogTagsInit([ "#sgcoll-tags-add", null, null,
								"#sgcoll-tags-sel", "#sgcoll-tags-inp",
								"#dopost-tags-reset", "" ]);
						q.bind("focus click", function(N) {
							N.stopPropagation();
							$.SGColl.showLabel(this, "#sgcoll-txa-lb", true)
						}).blur(function() {
							$.SGColl.showLabel(this, "#sgcoll-txa-lb")
						});
						var J = 300;
						function M(N) {
							keyupLenLimitForU(N.currentTarget, J, true, true)
						}
						q.keyup(M).blur(M).focus(M);
						keyupLenLimitForU(q[0], J, true, true);
						q.keydown(function(N) {
							if (N.metaKey && N.which == 13) {
								c.submit()
							}
						});
						$.fn.at && q.at({
							isFixed : true,
							upper : true
						});
						t.bind("focus click", function(N) {
							N.stopPropagation();
							window.clearTimeout(z);
							$.SGColl.showTagLabel(b, k, true)
						}).blur(function(N) {
							z = window.setTimeout(function() {
								$.SGColl.showTagLabel(b, k)
							}, 100)
						});
						t.bind("focus", function(N) {
							if ($.browser.msie && $.browser.version === "6.0") {
								g.css({
									display : "block",
									visibility : "hidden"
								});
								g.css({
									top : -g.outerHeight() + 1,
									bottom : "auto",
									visibility : "visible"
								})
							} else {
								g.css({
									top : "auto",
									bottom : b.outerHeight() - 1,
									display : "block"
								})
							}
						});
						s.add($(document)).click(function() {
							g.css("display", "none")
						});
						b.add(g).click(function(N) {
							N.stopPropagation()
						});
						c.submit(function(N) {
							N.preventDefault();
							$.SGColl.doPost()
						})
					}
				}
				I.resetType(I.type, true);
				I.repop()
			},
			repop : function() {
				SUGAR.PopOut.alert([ D[this.type], l, "" ], "m");
				if (x.filter(":visible").length) {
					var F = x.val();
					x.focus().val("").val(F).focus()
				}
			},
			checkFetchUrl : function(F) {
				if (!$.G.isLink(F)) {
					$.SGAlert.show("请输入正确的网址", a);
					return false
				} else {
					var G = F.split("://")[1].split("/")[0];
					if (G.match(/\bduitang\.com/ig)) {
						$.SGAlert.show("仅支持外站网址，站内请直接收集", a);
						return false
					}
					return true
				}
			},
			isPicUrl : function(G) {
				var F = G.lastIndexOf("."), H = F > -1 ? G.substr(F + 1) : "";
				if (H && H.match(/^(jpg|png|gif)$/ig)) {
					return true
				} else {
					return false
				}
			},
			doFetchPic : function() {
				var G = this;
				$.G.gaq("/_trc/Post/_/dofetch");
				$.SGAlert.clean();
				var F = $.trim(x.val());
				if (!F.match(/^http(?:s)?:\/\//ig)) {
					F = "http://" + F;
					x.val(F)
				}
				F = taobaoThumbPic(F);
				if (G.isPicUrl(F)) {
					G.afterFetch(F, true);
					return
				}
				if (!G.checkFetchUrl(F)) {
					return
				}
				x.blur();
				$("#sgcoll-fetching").removeClass("dn");
				$("#sgcoll-fetch-in").find(".sgcoll-fetch-normal").addClass(
						"dn");
				$.ajax({
					url : n.getFormAction(),
					data : n.paramForm(getToken(2)),
					mysuccess : function(H, I) {
						if (!$("#sgcoll-fetch-cancel:visible").length) {
							return
						}
						G.afterFetch(F, false, H.data)
					},
					myfailure : function(H, I) {
						if (!$("#sgcoll-fetch-cancel:visible").length) {
							return
						}
						G.resetFetch();
						$.SGAlert.show(mergeServerMessage(H.message), a)
					},
					myerror : function() {
						G.resetFetch();
						$.SGAlert.show("网络出问题了，请稍后再试", a)
					}
				})
			},
			afterFetch : function(H, F, J) {
				var I = this;
				if (F) {
					J = {
						images : [ H ],
						title : "图片"
					}
				}
				var K = J.images;
				if (K.length) {
					if (!f.data("choose")) {
						f.data("choose", true).delegate(
								".vm",
								"click",
								function(L) {
									L.stopPropagation();
									L.preventDefault();
									var M = $(this);
									f.find(".cur").removeClass("cur");
									y.val(M.addClass("cur").find("img").attr(
											"src"))
								})
					}
					I.resetPost();
					$("#sgcoll-sourcelink").val(H);
					$("#sgcoll-sourcetitle").val(J.title);
					var G = K.length < 10 ? K.length : 10;
					f
							.html([
									'<div class="sgcoll-finfo"><div><span>来源：</span>'
											+ J.title.cut(60, "…")
											+ "</div><div><span>链接：</span>"
											+ H.cut(60, "…")
											+ '</div></div><div id="sgcoll-picselect" class="sgcoll-picselect" ',
									(G > 3 ? 'style="overflow-x:scroll;"' : ""),
									'><div class="sgcoll-piclist clr" style="width:',
									(147 * G - 13),
									'px;"><!-- 循环单元开始 -->',
									(function() {
										var M = "";
										for (var L = 0; L < G; L++) {
											var N = K[L], N = N.charAt(0) === "/" ? "http://"
													+ window.location.hostname
													+ N
													: N;
											M += '<div class="vm ct l '
													+ (L === G - 1 ? "last"
															: "")
													+ " "
													+ (L === 0 ? "cur" : "")
													+ '"><div class="vma"><div class="vmb"> <img src="'
													+ N
													+ '" /></div></div></div>'
										}
										return M
									})(), "<!-- 循环单元结束 --></div></div>", ]
									.join(""));
					$("#sgcoll-picselect").scrollTop(0);
					y.val(f.find("img:first").attr("src"));
					$("#sgcoll-fetch-in").addClass("dn");
					$("#sgcoll-uploaded").removeClass("dn");
					I.repop();
					if (p.tags) {
						t.val(p.tags), k.css("display", "none")
					}
					$.G.gaq("/_trc/Post/_/dofetchok")
				} else {
					I.resetFetch();
					$.SGAlert.show("很抱歉，未能抓取到合适图片", a)
				}
			},
			doPost : function() {
				var I = this;
				if (!q.val()) {
					$.G.blinkIt(function() {
						q.css({
							backgroundColor : "#ffffcc"
						})
					}, function() {
						q.css({
							backgroundColor : "transparent"
						})
					}, function() {
						q.focus()
					}, 4, 200);
					return
				}
				if (!y.val()) {
					$.SGAlert.show("没有图片无法发布哟", a)
				}
				var H = m.closest(".abtn");
				if (H.hasClass("abtn-no")) {
					return
				}
				H.addClass("abtn-no");
				$.SGAlert.show("正在提交，请稍候");
				if (window.location.pathname.indexOf("/collect/") === 0) {
					$.G.gaq("/_trc/Post/_/dopost_outside")
				} else {
					$.G.gaq("/_trc/Post/_/dopost")
				}
				var G = [], F = $.trim(t.val());
				b.find(".added-tag").each(function(K, L) {
					var J = $(L);
					G.push($.trim(J.text()))
				});
				if ($.inArray(F, G) === -1) {
					G.push(F)
				}
				o.val(G.join(" "));
				$
						.ajax(
								{
									url : c.getFormAction(),
									data : c.paramForm(getToken(2)),
									mysuccess : function(L, M) {
										$.G.gaq("/_trc/Post/_/dopostok");
										var Q = v.find("[name=album]").val(), O = v
												.find(".sgcoll-shw").html(), J;
										if (Q && Q != "0") {
											$.Bom.removeCookie("sgt");
											$.Bom.setSubCookie("sgt", "ai"
													+ $.G.getUSERID(), Q, {
												expires : 30
											});
											$.Bom.setSubCookie("sgt", "an"
													+ $.G.getUSERID(), O, {
												expires : 30
											})
										}
										C.unshift({
											id : L.data.id,
											val : q.val().cut(10, "…")
										});
										C = C.slice(0, 5);
										var R = Q && Q != "0" ? "/album/" + Q
												+ "/" : "/album/people/"
												+ $.G.getUSERID() + "/";
										var N = I.type === "upload" ? '<a id="sgcoll-continue" href="javascript:;">继续上传</a><span>&nbsp;|&nbsp;</span><a href="/about/collectit/?from=postup" target="_blank">使用堆糖收集工具</a>'
												: '<a href="/about/collectit/?from=postcoll" target="_blank">安装糖收集工具, 帮你轻松保存图片</a>';
										var K = '<div id="sgcoll-over"><div class="prompt prompt-success"><h3>收集成功！<a href="'
												+ R
												+ '" target="_blank">进入专辑查看 &gt;</a></h3><p></p></div><div class="sgcoll-over-bot lkl"><span>或：</span>'
												+ N + "</div></div>";
										SUGAR.PopOut.alert(
												[ D[I.type], K, "" ], "m");
										$("#sgcoll-continue").click(
												function(S) {
													I.resetType(I.type, true);
													I.repop()
												});
										if ($.isFunction(A)) {
											A(L)
										} else {
											if ($("#dymcare").length) {
												var P = $.History.getHash();
												if (P != "" && P != "!dym") {
													$.History.setHash("!dym")
												} else {
													$("#dymcare").click()
												}
											}
										}
									},
									myfailure : function(J, L) {
										var K = mergeServerMessage(J.message);
										$.G.gaq("/_trc/Post/_/" + K);
										$.SGAlert.show(K)
									},
									myerror : function() {
										$.SGAlert.show("网络出问题了，请稍后再试")
									}
								}).always(function() {
							H.removeClass("abtn-no")
						})
			},
			showLabel : function(I, G, F) {
				var J = $(I), H = $(G);
				H
						.css("display", $.trim(J.val()) !== "" || F ? "none"
								: "block")
			},
			showTagLabel : function(H, G, F) {
				var J = $(H), K = J.find("input"), I = $(G);
				I.css("display", J.find(".added-tag").length || $.trim(K.val())
						|| F ? "none" : "block")
			},
			resetPost : function() {
				var F = this;
				f.html("");
				q.val("");
				d.css("display", "block");
				b.find(".added-tag").remove();
				o.val("");
				t.val("");
				k.css("display", "block");
				g.find(".locked").removeClass("locked");
				$("#sgcoll-sourcetitle").val("");
				$("#sgcoll-sourcelink").val("");
				if (F.type === "upload") {
					y.attr("name", "photo_id")
				} else {
					if (F.type === "fetch") {
						y.attr("name", "image_src")
					}
				}
				y.val("");
				c.find("[name=source]").attr("value", F.type);
				B.click()
			},
			resetType : function(F, H) {
				var G = this;
				if (F === "upload") {
					G.resetUpload()
				} else {
					if (F === "fetch") {
						G.resetFetch(H)
					}
				}
			},
			resetFetch : function(F) {
				this.type = "fetch";
				$("#sgcoll-up-in,#sgcoll-uploaded,#sgcoll-fetching").addClass(
						"dn");
				$("#sgcoll-fetch-in").removeClass("dn").find(
						".sgcoll-fetch-normal").removeClass("dn");
				if (F) {
					x.val("http://")
				}
			},
			resetUpload : function() {
				this.type = "upload";
				$("#sgcoll-fetch-in,#sgcoll-uploaded,#sgcoll-uploading")
						.addClass("dn");
				$("#sgcoll-up-in,#sgcoll-upbtn,#sgcoll-up-mess").removeClass(
						"dn abtn-no");
				this.resetFile()
			},
			resetFile : function() {
				var F = $("#form-sgcoll-upic input[type=file]");
				F.after(F.clone(true).val(""));
				F.remove()
			}
		}
	}()
})();
$(function() {
});
$(function() {
	var b = $.G.store();
	$(document).delegate("#mynavtools-create,#createalbum-pp,#createalbum",
			"click", function(g) {
				f()
			});
	function f() {
		var g = $("#popcreatealbum");
		if (!g.length) {
			g = $(
					'<div id="popcreatealbum" class="popcreatealbum"> <form id="form-popcreatealbum" method="post" action="/album/add/"> <table cellspacing="0" cellpadding="0"> <tr> <td width="60" align="right">专辑名</td> <td><input class="ipt" type="text" name="name" value="" maxlength="40"/></td> <td rowspan="4"> <h6>常用标签</h6> <div class="usetag da" id="popal-mbaddtagsel"> </div> </td> </tr> <tr> <td align="right">描述</td> <td><textarea class="txa" name="desc" maxlength="600" data-optional="1"></textarea></td> </tr> <tr> <td align="right">标签</td> <td> <div class="pr"> <div class="divipt clr"><input id="popal-mbaddtagipt" class="l ipt mr8" autocomplete="off" type="text" name="tags" value=""  maxlength="100" data-optional="1"/></div> <label for="popal-mbaddtagipt" id="popal-mbaddtag-lb">多个标签用空格隔开</label> </div> </td> </tr> <tr> <td>&nbsp;</td> <td><a class="abtn l" href="javascript:;" target="_self"><button type="submit"><u>创建</u></button></a></td> </tr> </table> </form> </div>')
					.appendTo(b);
			if ($.fn.comtags) {
				$("#popal-mbaddtagsel").html(function() {
					var k = "", h = $.fn.comtags.tags;
					for (var j = 0; j < h.length; j++) {
						k += '<a href="#">' + h[j] + "</a>"
					}
					return k
				})
			}
			tagSelectBind("#popal-mbaddtagsel", "#popal-mbaddtagipt", 5);
			setLabelIptFocus("#popal-mbaddtagipt", "#popal-mbaddtag-lb");
			g.find("[name=name],[name=desc]").lengthLimit();
			$("#form-popcreatealbum").safeSubmit(
					function(l) {
						if (!$.G.getUSERID()) {
							return
						}
						var h = $(this), k = h.find("a.abtn"), j = k
								.find("[type=submit]");
						if (k.hasClass("abtn-no")) {
							return
						}
						k.addClass("abtn-no");
						$.ajax({
							url : h.getFormAction(),
							data : h.paramForm($.G.getToken(2)),
							mysuccess : function(m, n) {
								location.href = "/album/" + m.data.id
							},
							myfailure : function(m, n) {
								if (m.data && m.data.robot_check) {
									j.verif({
										w : 1
									})
								} else {
									this.wrongmsg(m)
								}
							},
							myerror : function() {
								this.errormsg()
							}
						}).always(function() {
							k.removeClass("abtn-no")
						})
					})
		}
		g.find("[name=name],[name=desc]").val("");
		SUGAR.PopOut.alert([ "创建专辑", g, "" ], 2)
	}
	var d = null;
	$("#woo-holder").delegate("a.blockthisalbum", "click", function(j) {
		var h = $(this), g = h.hasClass("ohblocked") ? "pass" : "blocked";
		j.preventDefault();
		d = this;
		a(g)
	});
	$("#woo-holder").delegate("a.delthisalbum", "click", function(g) {
		g.preventDefault();
		d = this;
		c()
	});
	$("#albumdelbtn").click(function(g) {
		g.preventDefault();
		d = this;
		c()
	});
	function a(j) {
		var h = $("#popalbumblock"), k = (j === "pass" ? "解屏" : "屏蔽"), g = (j === "pass" ? "/operate/audit/unblock_album/"
				: "/operate/audit/block_album/");
		if (!h.length) {
			h = $(
					'<div id="popalbumblock" class="prompt"><form id="form-albumblock" method="post" action="'
							+ g
							+ '"><p class="albumconfirm" >将<span class="albumbock-sw">'
							+ k
							+ '</span>该专辑以及其中的图片。</p><div class="album-pop-action clr"><a class="abtn abtn-w4 l" href="javascript:;" target="_self"><button type="submit"><u>确定<span class="albumbock-sw">'
							+ k + "</span></u></button></a></div></form></div>")
					.appendTo(b);
			$("#form-albumblock").delegate(".cancel", "click", function(l) {
				SUGAR.PopOut.closeMask(0)
			});
			$("#form-albumblock").safeSubmit(
					function(n) {
						if (!$.G.getUSERID()) {
							return
						}
						var l = $(this), m = l.find('button[type="submit"]')
								.closest(".abtn");
						if (m.hasClass("abtn-no")) {
							return
						}
						m.addClass("abtn-no");
						$.ajax(
								{
									type : "POST",
									cache : false,
									url : l.getFormAction(),
									data : {
										album_id : d.title
									},
									mysuccess : function(p) {
										var o = $(d).closest(".woo");
										if (o.length) {
											if ($(d).hasClass("ohblocked")) {
												$(d).removeClass("ohblocked")
														.text("屏蔽")
											} else {
												$(d).addClass("ohblocked")
														.text("解屏")
											}
										}
										if ($("#albumblockbtn").length
												&& d.title == $(
														"#albumblockbtn").attr(
														"title")) {
										}
									}
								}).always(function() {
							SUGAR.PopOut.closeMask();
							m.removeClass("abtn-no")
						})
					})
		} else {
			h.find("form").attr("action", g);
			h.find(".albumbock-sw").text(k)
		}
		SUGAR.PopOut.alert([ k + "专辑", h, "" ])
	}
	function c() {
		var g = $("#popalbumdel");
		if (!g.length) {
			g = $(
					'<div id="popalbumdel" class="prompt"><form id="form-albumdel" method="post" action="/album/delete/"><p class="albumconfirm" >将删除该专辑以及其中的图片。</p><div class="album-pop-action clr"><a class="abtn abtn-w4 l" href="javascript:;" target="_self"><button type="submit"><u>确定删除</u></button></a></div></form></div>')
					.appendTo(b);
			$("#form-albumdel").delegate(".cancel", "click", function(h) {
				SUGAR.PopOut.closeMask(0)
			});
			$("#form-albumdel")
					.safeSubmit(
							function(k) {
								if (!$.G.getUSERID()) {
									return
								}
								var h = $(this), j = h.find(
										'button[type="submit"]').closest(
										".abtn");
								if (j.hasClass("abtn-no")) {
									return
								}
								j.addClass("abtn-no");
								$
										.ajax(
												{
													cache : false,
													url : h.getFormAction()
															+ d.title + "/",
													data : h
															.paramForm(getToken(2)),
													mysuccess : function(l) {
														SUGAR.PopOut
																.alert('<div class="prompt prompt-success"><h3>删除成功！</h3></div>');
														if ($("#albumdelbtn").length
																&& d.title == $(
																		"#albumdelbtn")
																		.attr(
																				"title")) {
															$({})
																	.delay(1000)
																	.queue(
																			function() {
																				SUGAR.PopOut
																						.closeMask(0);
																				var n = "/people/"
																						+ $.G
																								.getUSERID()
																						+ "/#album", m = $("#ppuserlnk");
																				if (m.length) {
																					n = m
																							.attr("href")
																				}
																				window.location.href = n
																			})
														} else {
															$({})
																	.delay(1000)
																	.queue(
																			function() {
																				SUGAR.PopOut
																						.closeMask(0)
																			});
															$(d).closest(
																	"div.woo")
																	.remove()
														}
													}
												}).always(function() {
											j.removeClass("abtn-no")
										})
							})
		}
		SUGAR.PopOut.alert([ "删除专辑", g, "" ])
	}
});
