ig.module(
	'game.entities.king'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityKing = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/King.png', 16, 16 ),
    size: {x: 8, y:12},
    offset: {x: 4, y: 2},
    maxVel: {x: 100, y: 100},
    flip: false,
	burned: false,
    friction: {x: 150, y: 0},
    speed: 25,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0,1,2,3,4,5]);
    },
	
	burn: function(){
			this.burned = true;
	},
	
    update: function() {
		
    	// near an edge? return!
    	if( this.burned){
			this.health = this.health - 10;
			if(this.health < 0)
			this.kill();
    	}
    	
    },
	
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
		ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 2, colorOffset: 1});
    },
    kill: function(){
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }
	
	
});
});
