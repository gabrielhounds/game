$(document).ready(function(){
	init();
});

function init() {
	var log = console.log;
	log('init');
	
	var t = TweenMax;
	
	var Application = PIXI.Application,
	loader 			= PIXI.loader,
	resources 		= PIXI.loader.resources,
	Sprite 			= PIXI.Sprite;
	
	var ticker = new PIXI.ticker.Ticker({ autoStart : false});
	
	var nautTextures, astro, bg
	
	var fg_scrollRate = 0.15;
	var mg_scrollRate = 0.05;
	
	var stageW = 960;
	var stageH = 512;
	
	var gameHolder = $('.gameHolder');
	
	var app = new Application({ width : 960, height : 512 });
	
	app.renderer.backgroundColor = 0x007b96;
	
	$(app.view).appendTo(gameHolder);
	
	var loadingText = new PIXI.Text('LOADING      ');
	//app.stage.addChild(loadingText);
	
	function bgScroll(delta) {
		fg.tilePosition.x -= fg_scrollRate;
		mg.tilePosition.x -= mg_scrollRate;
	}
	
	function setUp() {
		
		bg = new PIXI.extras.TilingSprite(resources['images/sky.png'].texture, 240, 176);		
		bg.width = stageW;
		bg.height = stageH - 100;
		app.stage.addChild(bg);
		
		mg = new PIXI.extras.TilingSprite(resources['images/mountains.png'].texture, 320, 304);		
		mg.width = stageW;
		mg.height = 304;
		mg.position.set(0, stageH - 400);
		app.stage.addChild(mg);
		
		fg = new PIXI.extras.TilingSprite(resources['images/woods.png'].texture, 144, 176);		
		fg.width = stageW;
		fg.height = 176;
		fg.position.set(0, stageH - 220);
		app.stage.addChild(fg);
		
		nautTextures = [resources['images/CHAR_astronaut_00001.png'].texture, resources['images/CHAR_astronaut_00002.png'].texture, resources['images/CHAR_astronaut_00003.png'].texture, resources['images/CHAR_astronaut_00004.png'].texture, resources['images/CHAR_astronaut_00005.png'].texture, resources['images/CHAR_astronaut_00006.png'].texture, resources['images/CHAR_astronaut_00007.png'].texture, resources['images/CHAR_astronaut_00008.png'].texture, resources['images/CHAR_astronaut_00009.png'].texture, resources['images/CHAR_astronaut_00010.png'].texture, resources['images/CHAR_astronaut_00011.png'].texture, resources['images/CHAR_astronaut_00012.png'].texture];
		
		astro = new PIXI.extras.AnimatedSprite(nautTextures);
		astro.scale.set(1.2);
		astro.position.set(stageW / 2 - astro.width /2, stageH - 90)
		app.stage.addChild(astro);
		astro.animationSpeed = 0.15;	
		astro.play();
		
		ticker.start();
		
	}
	
	function loadProgressHandler() {
		loadingText.text = 'LOADING ' + Math.round(loader.progress) + '%';
	}
	
	loader.add([
		
		'images/CHAR_astronaut_00000.png',
		'images/CHAR_astronaut_00001.png',
		'images/CHAR_astronaut_00002.png',
		'images/CHAR_astronaut_00003.png',
		'images/CHAR_astronaut_00004.png',
		'images/CHAR_astronaut_00005.png',
		'images/CHAR_astronaut_00006.png',
		'images/CHAR_astronaut_00007.png',
		'images/CHAR_astronaut_00008.png',
		'images/CHAR_astronaut_00009.png',
		'images/CHAR_astronaut_00010.png',
		'images/CHAR_astronaut_00011.png',
		'images/CHAR_astronaut_00012.png',
		'images/background.png',
		'images/mountains.png',
		'images/woods.png',
		'images/sky.png',
		
	]).on('progress', loadProgressHandler).load(setUp);
	
	ticker.add( function(delta){
		bgScroll(delta);
	})
	
	
}