package myapp;

class App {

	static var appUrl : String = "my-app.html";

	static public function main() : Void {

#if !js
		var conf = cocktail.core.config.Config.getInstance();
		conf.updateConfig('useStageVideoIfAvailable' , 'true');

		var cocktail = new cocktail.api.CocktailView();
		
		cocktail.loadURL(appUrl);

		#if (flash || nme)
        	//for flash and openfl, attach to stage
        	flash.Lib.current.addChild(cocktail.root);
    	#end

		var window = cocktail.window;
#else
    	var window = js.Browser.window;
#end
		if (window.document.getElementsByTagName("body").length > 0) {

			new Controller(window);
		
		} else {
		
			window.addEventListener("load", function(?_){ new Controller(window); });
		}
	}
}