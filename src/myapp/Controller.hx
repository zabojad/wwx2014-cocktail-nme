package myapp;

import myapp.view.Application;

class Controller {

	public function new(window : js.html.DOMWindow) {

		this.state = new State();

		this.application = new Application(window);

		initMvc();
	}

	var state : State;

	var application : Application;

	function initMvc() : Void {

		state.onPlayingChanged = function() {
trace("state.playing= "+state.playing);
				if (state.playing) {

					application.play();

				} else {

					application.pause();
				}
			}

		state.onPositionChanged = function() {

				if (state.duration > 0) {

					application.timeline.setPosition(100 * state.position / state.duration);
				}
			}

		state.onSoundOnChanged = function() {

				application.setSoundOn(state.soundOn);
			}

		application.playBtn.onClicked = function() {

				state.playing = true;
			}

		application.plauseBtn.onClicked = function() {

				state.playing = false;
			}

		application.soundBtn.onClicked = function() {

				state.soundOn = !state.soundOn;
			}

		application.onVideoPlay = function() {

				application.setPlaying(true);
			}

		application.onVideoPause = function() {

				application.setPlaying(false);
			}

		application.onVideoEnded = function() {

				state.playing = false;
			}

		application.onPositionChanged = function(p : Float) {
				
				state.position = p;
			}

		application.onDurationChanged = function(d : Float) {

				state.duration = d;
			}

		application.timeline.onSeekRequest = function(s : Float) {

				if (state.duration > 0) {

					application.seek(s * state.duration);
				}
			}
trace("initMvc done");
	}
}