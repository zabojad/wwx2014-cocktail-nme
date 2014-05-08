package myapp.view;

import js.html.Element;

class Button {

	public function new(elt : Element) {

		this.elt = elt;
		
		elt.addEventListener("click", function(?_){ onClicked(); });
	}

	var elt : Element;

	///
	// API
	//

	public dynamic function onClicked() : Void { }
}