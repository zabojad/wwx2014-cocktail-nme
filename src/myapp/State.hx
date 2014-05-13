package myapp;

class State {

	public function new() { }

	public var playing (default, set) : Null<Bool> = null;

	public var soundOn (default, set) : Bool = true;

	public var position (default, set) : Float = -1;

	public var duration (default, set) : Float = -1;

	public dynamic function onPlayingChanged() : Void { }

	public dynamic function onSoundOnChanged() : Void { }

	public dynamic function onPositionChanged() : Void { }

	public dynamic function onDurationChanged() : Void { }

	public function set_playing(v : Null<Bool>) : Null<Bool> {

		if (v == playing) {

			return playing;
		}

		playing = v;

		onPlayingChanged();

		return playing;
	}

	public function set_soundOn(v : Bool) : Bool {

		if (v == soundOn) {

			return soundOn;
		}

		soundOn = v;

		onSoundOnChanged();

		return soundOn;
	}

	public function set_position(v : Float) : Float {

		if (v == position) {

			return position;
		}

		position = v;

		onPositionChanged();

		return position;
	}

	public function set_duration(v : Float) : Float {

		if (v == duration) {

			return duration;
		}

		duration = v;

		onDurationChanged();

		return duration;
	}
}