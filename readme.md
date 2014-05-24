#Demo app for WWX 2014 talk on a development workflow with Cocktail and NME

@author Thomas Fétiveau, @zab0jad, www.tokom.fr

##Useful info

###Urls

* [Haxe website](http://www.haxe.org)
* [Cocktail repo](https://github.com/silexlabs/Cocktail)
* [NME repo](https://github.com/haxenme/nme)

##How to

###Setup your environment

Prerequisite :

* [node.js](http://nodejs.org/) installed
* [NPM](https://npmjs.org/) installed
* [Haxe compiler](http://haxe.org/download) installed

Run:

```
git clone git@bitbucket.org:zabojad/wwx2014-demo-cocktail-nme.git
```

And:

```
npm install
```

###Build and run the app

####Flash & js

Run:

```
haxe build.hxml
```

And: 

```
grunt
```

And then open your web browser on the [web demo page](http://127.0.0.1:9000/).

####iOS

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
