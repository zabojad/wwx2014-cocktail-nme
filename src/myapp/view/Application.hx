package myapp.view;

import js.html.DOMWindow;
import js.html.Element;
import js.html.VideoElement;

using Lambda;

class Application {

	static inline var SELECTOR_APPLICATION : String = ".application";
	static inline var SELECTOR_PLAY_BTN : String = ".playBtn";
	static inline var SELECTOR_PAUSE_BTN : String = ".pauseBtn";
	static inline var SELECTOR_SOUND_BTN : String = ".soundBtn";
	static inline var SELECTOR_TIMELINE_BTN : String = ".timeline";
	static inline var SELECTOR_VIDEO_BTN : String = "video";

	static inline var STATE_PLAYING : String = "playing";
	static inline var STATE_PAUSING : String = "pausing";
	static inline var STATE_SOUNDOFF : String = "sound-off";

	public function new(window : DOMWindow) {

		this.elt = window.document.getElementById("my-app");

		this.playBtn = new Button(elt.querySelector(SELECTOR_PLAY_BTN));
		this.plauseBtn = new Button(elt.querySelector(SELECTOR_PAUSE_BTN));
		this.soundBtn = new Button(elt.querySelector(SELECTOR_SOUND_BTN));
		this.timeline = new Timeline(elt.querySelector(SELECTOR_TIMELINE_BTN));

		this.videoElt = cast elt.querySelector(SELECTOR_VIDEO_BTN);

		videoElt.addEventListener("ended", function(?_){ onVideoEnded(); });
		videoElt.addEventListener("timeupdate", function(?_){ onPositionChanged(videoElt.currentTime); });
		videoElt.addEventListener("durationchange", function(?_){ onDurationChanged(videoElt.duration); });
		videoElt.addEventListener("playing", function(?_){ onVideoPlay(); });
		videoElt.addEventListener("pause", function(?_){ onVideoPause(); });
	}

	var elt : Element;

	var videoElt : VideoElement;


	///
	// API
	//

	public var playBtn (default, null) : Button;

	public var plauseBtn (default, null) : Button;

	public var soundBtn (default, null) : Button;

	public var timeline (default, null) : Timeline;

	public dynamic function onVideoEnded() : Void { }

	public dynamic function onVideoPlay() : Void { }

	public dynamic function onVideoPause() : Void { }

	public dynamic function onPositionChanged(t : Float) : Void { }

	public dynamic function onDurationChanged(d : Float) : Void { }

	public function setPlaying(v : Bool) : Void {

		if (v) {

			elt.className = elt.className.split(" ").filter(function(c:String){ return c != STATE_PAUSING; }).concat([STATE_PLAYING]).join(" ");
		
		} else {

			elt.className = elt.className.split(" ").filter(function(c:String){ return c != STATE_PLAYING; }).concat([STATE_PAUSING]).join(" ");
		}
	}

	public function seek(v : Float) : Void {

		videoElt.currentTime = v;
	}

	public function play() : Void {

		videoElt.play();
	}

	public function pause() : Void {

		videoElt.pause();
	}

	public function setSoundOn(v : Bool) : Void {

		videoElt.volume = v ? 1.0 : 0.0;

		if (v) {

			elt.className = elt.className.split(" ").filter(function(c:String){ return c != STATE_SOUNDOFF; }).join(" ");

		} else {

			elt.className = elt.className.split(" ").filter(function(c:String){ return c != STATE_SOUNDOFF; }).concat([STATE_SOUNDOFF]).join(" ");
		}
	}
}