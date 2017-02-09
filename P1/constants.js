//------------
//System Values
//------------
var color = 0;
var pos = 0;
var HP = 100;
var secret = "off";

var STAGE_WIDTH = 900,
	STAGE_HEIGHT = 600,
	//TIME_PER_FRAME = 33, //this equates to 30 fps
	TIME_PER_FRAME = 100, //this equates to 30 fps

	GAME_FONTS = "bold 20px sans-serif";

//paths to sprite sheets
var PATH_CHAR = "img/Skeleton.png";
var PATH_CHAR2 = "img/knightAttack.png";
var PATH_CHAR3 = "img/secretBoss.png"

//576 for walking left, 704 for walking right
//Settings for player
var CHAR_WIDTH = 64,
	CHAR_HEIGHT = 64,
	CHAR_START_X = STAGE_WIDTH/2,
	CHAR_START_Y = STAGE_HEIGHT-64,
	IMAGE_START_X = 0,
	IMAGE_START_Y = 576,
	//IMAGE_START_Y = 0, // 96 2nd row

	SPRITE_WIDTH = 216,
	direction = 0;
	
//Settings for attack animation
var CHAR_WIDTH2 = 118,
	CHAR_HEIGHT2 = 76,
	CHAR_START_X2 = CHAR_START_X - 64,
	CHAR_START_Y2 = CHAR_START_Y,
	IMAGE_START_X2 = 781, //781
	IMAGE_START_Y2 = 1601,
	//IMAGE_START_Y = 0, // 96 2nd row

	SPRITE_WIDTH = 216;
//Settings for boss
var CHAR_WIDTH3 = 64,
	CHAR_HEIGHT3 = 64,
	CHAR_START_X3 = STAGE_WIDTH - 64,
	CHAR_START_Y3 = STAGE_HEIGHT-64,
	IMAGE_START_X3 = 0,
	IMAGE_START_Y3 = 576,
	bossHP = 500;
	//IMAGE_START_Y = 0, // 96 2nd row
//Checks if the boss is airborne
var inAirBoss = "N";

//Skeleton object
var skeleton = {
	create: function() {
		var body = Object.create(this);
		body.CHAR_WIDTH = 64;
		body.CHAR_HEIGHT = 64;
		body.CHAR_START_X = STAGE_WIDTH-32;
		body.CHAR_START_Y = STAGE_HEIGHT-64;
		body.IMAGE_START_X = 0;
		body.IMAGE_START_Y = 576;

		body.SPRITE_WIDTH = 216;
		body.currX = IMAGE_START_X;
		body.currY = IMAGE_START_Y;
		body.direction = 0;
		body.spawned = 0;
		body.alive = 1;
		
		return body;
	}
}
//Array for skeletons
var army = new Array();

	
var TEXT_PRELOADING = "Loading ...", 
	TEXT_PRELOADING_X = 200, 
	TEXT_PRELOADING_Y = 200;
	
	
	
	
	