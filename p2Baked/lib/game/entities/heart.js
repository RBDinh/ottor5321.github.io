ig.module(
	'game.entities.heart'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHeart = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/heart.png', 25, 25 ),
    size: {x: 25, y:25},
    maxVel: {x: 100, y: 100},
    flip: false,
	burned: false,
    friction: {x: 150, y: 0},
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
		this.addAnim('walk', .07, [0]);
    },
    burn: function(){
			this.burned = true;
	},
	
	update: function() {
		
    	// near an edge? return!
    	if( this.burned){
			this.health = this.health - 1;
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
		ig.game.lives ++;
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }
});
});
