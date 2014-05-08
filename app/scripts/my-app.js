(function () { "use strict";
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var myapp = {};
myapp.App = function() { };
myapp.App.__name__ = true;
myapp.App.main = function() {
	var $window = window;
	if($window.document.getElementsByTagName("body").length > 0) new myapp.Controller($window); else $window.addEventListener("load",function(_) {
		new myapp.Controller($window);
	});
};
myapp.Controller = function(window) {
	this.state = new myapp.State();
	this.application = new myapp.view.Application(window);
	this.initMvc();
};
myapp.Controller.__name__ = true;
myapp.Controller.prototype = {
	initMvc: function() {
		var _g = this;
		this.state.onPlayingChanged = function() {
			if(_g.state.playing) _g.application.play(); else _g.application.pause();
		};
		this.state.onPositionChanged = function() {
			if(_g.state.duration > 0) _g.application.timeline.setPosition(100 * _g.state.position / _g.state.duration);
		};
		this.state.onSoundOnChanged = function() {
			_g.application.setSoundOn(_g.state.soundOn);
		};
		this.application.playBtn.onClicked = function() {
			_g.state.set_playing(true);
		};
		this.application.plauseBtn.onClicked = function() {
			_g.state.set_playing(false);
		};
		this.application.soundBtn.onClicked = function() {
			_g.state.set_soundOn(!_g.state.soundOn);
		};
		this.application.onVideoPlay = function() {
			_g.application.setPlaying(true);
		};
		this.application.onVideoPause = function() {
			_g.application.setPlaying(false);
		};
		this.application.onVideoEnded = function() {
			_g.state.set_playing(false);
		};
		this.application.onPositionChanged = function(p) {
			_g.state.set_position(p);
		};
		this.application.onDurationChanged = function(d) {
			_g.state.set_duration(d);
		};
		this.application.timeline.onSeekRequest = function(s) {
			if(_g.state.duration > 0) _g.application.seek(s * _g.state.duration);
		};
	}
};
myapp.State = function() {
	this.duration = -1;
	this.position = -1;
	this.soundOn = true;
	this.playing = false;
};
myapp.State.__name__ = true;
myapp.State.prototype = {
	onPlayingChanged: function() {
	}
	,onSoundOnChanged: function() {
	}
	,onPositionChanged: function() {
	}
	,onDurationChanged: function() {
	}
	,set_playing: function(v) {
		if(v == this.playing) return this.playing;
		this.playing = v;
		this.onPlayingChanged();
		return this.playing;
	}
	,set_soundOn: function(v) {
		if(v == this.soundOn) return this.soundOn;
		this.soundOn = v;
		this.onSoundOnChanged();
		return this.soundOn;
	}
	,set_position: function(v) {
		if(v == this.position) return this.position;
		this.position = v;
		this.onPositionChanged();
		return this.position;
	}
	,set_duration: function(v) {
		if(v == this.duration) return this.duration;
		this.duration = v;
		this.onDurationChanged();
		return this.duration;
	}
};
myapp.view = {};
myapp.view.Application = function(window) {
	var _g = this;
	this.elt = window.document.getElementById("my-app");
	this.playBtn = new myapp.view.Button(this.elt.querySelector(".playBtn"));
	this.plauseBtn = new myapp.view.Button(this.elt.querySelector(".pauseBtn"));
	this.soundBtn = new myapp.view.Button(this.elt.querySelector(".soundBtn"));
	this.timeline = new myapp.view.Timeline(this.elt.querySelector(".timeline"));
	this.videoElt = this.elt.querySelector("video");
	this.videoElt.addEventListener("ended",function(_) {
		_g.onVideoEnded();
	});
	this.videoElt.addEventListener("timeupdate",function(_1) {
		_g.onPositionChanged(_g.videoElt.currentTime);
	});
	this.videoElt.addEventListener("durationchange",function(_2) {
		_g.onDurationChanged(_g.videoElt.duration);
	});
	this.videoElt.addEventListener("playing",function(_3) {
		_g.onVideoPlay();
	});
	this.videoElt.addEventListener("pause",function(_4) {
		_g.onVideoPause();
	});
};
myapp.view.Application.__name__ = true;
myapp.view.Application.prototype = {
	onVideoEnded: function() {
	}
	,onVideoPlay: function() {
	}
	,onVideoPause: function() {
	}
	,onPositionChanged: function(t) {
	}
	,onDurationChanged: function(d) {
	}
	,setPlaying: function(v) {
		if(v) this.elt.className = this.elt.className.split(" ").filter(function(c) {
			return c != "pausing";
		}).concat(["playing"]).join(" "); else this.elt.className = this.elt.className.split(" ").filter(function(c1) {
			return c1 != "playing";
		}).concat(["pausing"]).join(" ");
	}
	,seek: function(v) {
		this.videoElt.currentTime = v;
	}
	,play: function() {
		this.videoElt.play();
	}
	,pause: function() {
		this.videoElt.pause();
	}
	,setSoundOn: function(v) {
		if(v) this.videoElt.volume = 1.0; else this.videoElt.volume = 0.0;
		if(v) this.elt.className = this.elt.className.split(" ").filter(function(c) {
			return c != "sound-off";
		}).join(" "); else this.elt.className = this.elt.className.split(" ").filter(function(c1) {
			return c1 != "sound-off";
		}).concat(["sound-off"]).join(" ");
	}
};
myapp.view.Button = function(elt) {
	var _g = this;
	this.elt = elt;
	elt.addEventListener("click",function(_) {
		_g.onClicked();
	});
};
myapp.view.Button.__name__ = true;
myapp.view.Button.prototype = {
	onClicked: function() {
	}
};
myapp.view.Timeline = function(elt) {
	this.active = false;
	this.elt = elt;
	this.sliderElt = elt.querySelector(".slider");
	this.cursorElt = elt.querySelector(".slider div");
	elt.addEventListener("mousedown",$bind(this,this.onHold));
	elt.ownerDocument.addEventListener("mousemove",$bind(this,this.onMove));
	elt.ownerDocument.addEventListener("mouseup",$bind(this,this.onRelease));
};
myapp.view.Timeline.__name__ = true;
myapp.view.Timeline.prototype = {
	onSeekRequest: function(v) {
	}
	,setPosition: function(p) {
		this.cursorElt.style.marginLeft = Std.string(Math.round(p)) + "%";
	}
	,onHold: function(e) {
		this.active = true;
		e.preventDefault();
		this.onMove(e);
	}
	,onMove: function(e) {
		if(!this.active) return;
		var value = (e.clientX - this.sliderElt.offsetLeft) / this.sliderElt.clientWidth;
		if(value < 0) value = 0;
		if(value > 1) value = 1;
		this.onSeekRequest(value);
	}
	,onRelease: function(e) {
		this.onMove(e);
		this.active = false;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
myapp.App.appUrl = "my-app.html";
myapp.view.Application.SELECTOR_APPLICATION = ".application";
myapp.view.Application.SELECTOR_PLAY_BTN = ".playBtn";
myapp.view.Application.SELECTOR_PAUSE_BTN = ".pauseBtn";
myapp.view.Application.SELECTOR_SOUND_BTN = ".soundBtn";
myapp.view.Application.SELECTOR_TIMELINE_BTN = ".timeline";
myapp.view.Application.SELECTOR_VIDEO_BTN = "video";
myapp.view.Application.STATE_PLAYING = "playing";
myapp.view.Application.STATE_PAUSING = "pausing";
myapp.view.Application.STATE_SOUNDOFF = "sound-off";
myapp.view.Timeline.SELECTOR_SLIDER = ".slider";
myapp.view.Timeline.SELECTOR_CURSOR = ".slider div";
myapp.App.main();
})();
