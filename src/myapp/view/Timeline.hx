package myapp.view;

import js.html.Element;
import js.html.MouseEvent;

class Timeline {

	static inline var SELECTOR_SLIDER : String = ".slider";
	static inline var SELECTOR_CURSOR : String = ".slider div";

	public function new(elt : Element) {

		this.elt = elt;

		this.sliderElt = elt.querySelector(SELECTOR_SLIDER);
		this.cursorElt = elt.querySelector(SELECTOR_CURSOR);

		elt.addEventListener("mousedown", onHold);

		elt.ownerDocument.addEventListener("mousemove", onMove);

		elt.ownerDocument.addEventListener("mouseup", onRelease);
	}

	var elt : Element;
	var sliderElt : Element;
	var cursorElt : Element;

	var active : Bool = false;

	///
	// API
	//

	public dynamic function onSeekRequest(v : Float) { }

	public function setPosition(p : Float) : Void {

		cursorElt.style.marginLeft = Std.string(Math.fround(p)) + "%";
	}

	///
	// Internals
	//

	function onHold(e:MouseEvent) : Void {

		active = true;
		// preventing drag 'n drop in HTML
		e.preventDefault();

		onMove(e);
	}

	function onMove(e:MouseEvent) : Void {
				
		if (!active) {
			return;
		}
		var value = (e.clientX - sliderElt.offsetLeft) / sliderElt.clientWidth;

		if(value < 0) value = 0;
		if(value > 1) value = 1;

		onSeekRequest( value );
	}

	function onRelease(e:MouseEvent) : Void {

		onMove(e);

		active = false;
	}
}