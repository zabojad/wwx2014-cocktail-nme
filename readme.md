#TF1 Player

Cross platform video player for TF1

N'oubliez pas 

* de remplir le readme au fur et à mesure : notes de dev, comment compiler/tester/releaser, les urls utiles
* de compter le temps effectif passé, notez le dans un doc à vous les dates, nombre d'heures et le lieu

##Useful info

###Urls

* repo https://bitbucket.org/im-paris/tf1-player

##How to

SETUP YOUR DEV ENVIRONMENT
--------------------------

1 - NME for iOS
---------------

Update your haxelib
```
haxelib selfupdate
```

Install the following modules from haxelib
```
haxelib install nme-state
haxelib install svg
haxelib install format
```

Download and install the latest hxcpp from http://nmehost.com/releases/hxcpp/
```
haxelib local hxcpp-3.1.1.zip
```

Get the latest NME sources:
```
cd your-source-area
git clone https://github.com/nmehost/nme.git
```

Ensure the nme/ndll/Linux64 exist to avoid running into a current haxelib bug
```
cd nme
mkdir ndll/Linux64
```

Point haxelib at the new area
```
haxelib dev nme your-source-area/nme
```

Rebuild the "run.n":
```
cd nme/tools/command-line/
haxe Compile.hxml
```

Now your haxelib list output should look like this
```
haxelib list
format: [3.0.4]
haxelib_client: [3.1.0-rc.3]
hxcpp: [3.1.1]
nme: 5.0.2 5.0.2369 [dev:/Users/thomas/your-source-area/nme]
nme-state: [1.0.0]
svg: [1.0.7]
```

Build the nddl files:
```
cd nme/project
haxelib run hxcpp Build.xml
```

On Mac 64 only:
```
haxelib run hxcpp Build.xml -DHXCPP_M64
```

Note: later, when you'll have to recompile nme after having pulled a new master version, clean your previously compiled file prior to compiling the nddl files:
```
rm -rf nme/project/obj
rm -rf nme/project/all_objs
```

If all goes well, you can add:
```
haxelib run hxcpp Build.xml -Dandroid
```

And on Mac:
```
haxelib run hxcpp Build.xml -Diphoneos
haxelib run hxcpp Build.xml -Diphonesim
haxelib run hxcpp Build.xml -Diphoneos -DHXCPP_ARMV7
```


2 - GRUNT
---------

Récupération du projet
```
git clone ...
npm install
```

Update du projet
```
git pull
```

3 - HXCPP (OPTIONAL)
--------------------

If you need to compile hxcpp from source, follow those steps:

```
git clone https://github.com/HaxeFoundation/hxcpp.git
```

Ensure the two below variable are set:
```
export NEKO_INSTALL_PATH=/usr/lib/neko
export DYLD_LIBRARY_PATH=$DYLD_LIBRARY_PATH:{src_loc}/hxcpp/bin/Mac:{src_loc}/nekonme/ndll/Mac:.
```

Set your haxelib hxcpp dev location
```
haxelib dev hxcpp {src_loc}/hxcpp
```

Now execute the compilation commands:
```
cd hxcpp/runtime/
rm -rf obj
rm -rf all_objs
haxelib run hxcpp BuildLibs.xml
```
```
rm -rf obj
rm -rf all_objs
haxelib run hxcpp BuildLibs.xml -DHXCPP_M64
```
```
rm -rf obj
rm -rf all_objs
haxelib run hxcpp BuildLibs.xml -Diphoneos
```
```
rm -rf obj
rm -rf all_objs
haxelib run hxcpp BuildLibs.xml -Diphonesim
```
```
rm -rf obj
rm -rf all_objs
haxelib run hxcpp BuildLibs.xml -Diphoneos -DHXCPP_ARMV7
```
```
rm -rf obj
rm -rf all_objs
haxelib run hxcpp BuildLibs.xml -Dandroid
```

NOTE: you need to recompile NME after having recompiled HXCPP


###Compile

Prior to any compilation to a given target is the compilation of assets and css:
```
grunt
```

1 - FLASH AND JS
----------------

`haxe build.hxml`

2 - iOS
-------

Before any compilation with NME, remove any previous export directory:
```
rm -rf bin/export
```

Test in the simulator:
```
haxelib run nme test iphonesim
```

Builds as a standalone app:
```
haxelib run nme build iphoneos
```

Builds as a SDK library:
```
haxelib run nme test iosview
```

###Tests

`grunt server`

ensuite l'app est testable sur

http://localhost:9000/

`grunt test`

http://localhost:9000/

contient les tests

###Release

##Dev notes

###EStat library for Flash

The EStat swc has class names starting with a lower case letter. Accessing them via the Flash magic oddly doesn't workaround the problem. I thus decompiled the swc, fixed it (see /src_as) and recompiled it with the following command:

```
[PATH_TO_FLEX_SDK]/flex_sdk_4.6/bin/compc -source-path src_as -include-classes EStatNativeFlashTag -output lib/eStatNativeFlashTag-TF1_3.13-patched.swc
```

###Compiling to iOS view (ios-view)

Unfortunately, I haven't found a way to set a relative path to the eStat .h file in the api/ios-view/FrameworkInterface.mm file:

```
#import </Users/thomasfetiveau/wksp_tf1/tf1-player/api/ios-view/eStatTag.h>
```

So before compiling to the ios-view target, edit/update this path to match your local absolute path to this file.


###Delivering the iOS and Android SDK

The SDKs should be delivered along with the eStat lib:

 - for iOS, add the following file to the XPlayer generated folder:

     libestat_device.a
     libestat_simu.a

 - for Android, add the following jar file to your ADT project lib directory:

     MediametrieEstatTagsAndroid.jar

     




