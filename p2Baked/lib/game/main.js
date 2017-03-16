ig.module( 
	'game.main' 
)
.requires(
    'impact.game',
	'impact.font',
    'game.levels.level1',
	'game.levels.level2',
	'game.levels.debugRoom'
)

.defines(function(){

MyGame = ig.Game.extend({
    gravity: 300,
	statText: new ig.Font( 'media/04b03.font.png' ),
	instructText: new ig.Font( 'media/04b03.font.png' ),
	lifeSprite: new ig.Image('media/smallHeart.png'),
	hGrabbed: 0,
	lives: 3,
	init: function() {
        this.loadLevel( LevelLevel1 );

        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'up' );
        ig.input.bind( ig.KEY.X, 'jump' );
        ig.input.bind( ig.KEY.C, 'shoot' );
        ig.input.bind( ig.KEY.TAB, 'switch' );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();	
		// Add your own, additional update code here
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if(player){
				this.screen.x = player.pos.x - ig.system.width/2;
				this.screen.y = player.pos.y - ig.system.height/2;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height - 10;
		this.instructText.draw(
		'Left/Right Moves, X Jumps, C Fires & Tab Switches Weapons.',
			x, y, ig.Font.ALIGN.CENTER );
		this.statText.draw("Lives: ", 1,5);
		for(var i=0; i < this.lives; i++)
			this.lifeSprite.draw(((this.lifeSprite.width + 2) * i)+25, 1);
		
	}
});

GameOverScreen = ig.Game.extend({
	instructText: new ig.Font( 'media/04b03.font.png' ),
	gameOver: new ig.Image('media/victory.png'),
	stats: {},
	init: function() {
		ig.input.bind( ig.KEY.SPACE, 'start');
		},
		update: function() {
			if(ig.input.pressed('start')){
				ig.system.setGame(StartScreen)
				}
		this.parent();
		},
				draw: function() {
					this.parent();
					this.background.draw(0,0);
					var x = ig.system.width/2;
					var y = ig.system.height/2 - 20;
					this.gameOver.draw(x - (this.gameOver.width * .5), y - 30);
				}
			});
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 412, 412, 2 );

});
