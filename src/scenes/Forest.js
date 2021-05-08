import Phaser from '../lib/phaser.js'

import EnnemiF from '../game/EnnemiF.js'

export default class Forest extends Phaser.Scene {
    constructor() {
        super('forest')
    }
	init(data){
		this.life = data.health
		this.speed = data.speed
	}
	preload(){

        //Images Preloaders
		this.load.image('ennemy','assets/Monstres&Ennemis/CraneDeFeu.png')


        this.load.image('Tileset', 'assets/TilesetVillage.png')

        this.load.tilemapTiledJSON('Forest', 'assets/Forest.json');

		this.cursors = this.input.keyboard.createCursorKeys()
		this.boutonAttaque = this.input.keyboard.addKey('A');

		this.load.image('PowerUp','assets/Collectibles/powerUp.png')
		this.load.image('Attaque','assets/Collectibles/attaque.png')
		this.load.image('argent','assets/Collectibles/Argent.png')
    }

    create(){

		this.attaque = false

		this.immune = true

		if (this.life == 3){
			this.health1 = this.add.image(32,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
			this.health2 = this.add.image(64,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
			this.health3 = this.add.image(96,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
		}
	
		else if (this.life == 2){
			this.health1 = this.add.image(32,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
			this.health2 = this.add.image(64,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
		}
		else if (this.life == 1){
			this.health1 = this.add.image(32,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
		}

        //Mapping
        this.Forest = this.make.tilemap({key:'Forest'});

        let Terrain = this.Forest.addTilesetImage('TilesetVillage','Tileset');

        let Background = this.Forest.createLayer('Foret', Terrain, 0, 0);
        let Layer1 = this.Forest.createLayer('Foret1', Terrain, 0, 0);
        let Layer2 = this.Forest.createLayer('Foret2', Terrain, 0, 0);
		let Layer3 = this.Forest.createLayer('Foret3', Terrain, 0, 0);
		let Layer4 = this.Forest.createLayer('DecorForet', Terrain, 0, 0);

		this.powerup = this.physics.add.image(768, 32, 'PowerUp');

		this.player = this.physics.add.sprite(1344,1024, 'hero').setDepth(1).setSize(37,7).setOffset(1,30);


		this.ennemis = this.physics.add.group();

		new EnnemiF(this,800,768,'ennemy').setDepth(0);
		new EnnemiF(this,1024,480,'ennemy').setDepth(0);
		new EnnemiF(this,1536,192,'ennemy').setDepth(0);
		new EnnemiF(this,1696,512,'ennemy').setDepth(0);

		this.Forest.setTileLocationCallback(41, 33, 4, 1, ()=>{
			this.scene.start('village',{x:1344, y:96, attaque: this.attaque, health: this.life, speed: this.speed})}
	)

	this.argent = this.physics.add.group();
	this.sword = this.physics.add.group();

        //Animations
        
        this.anims.create({
			key: 'normal',
			frames: [ { key: 'hero', frame: 0 } ],
			frameRate: 10
		});
		
		this.anims.create({
			key:'up',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 1, 5, 9, 13 ] }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key:'down',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 0, 4, 8, 12 ] }),
			frameRate: 8,
			repeat: -1
		})
		

		this.anims.create({
			key:'right',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 3, 7, 11, 15 ] }),
			frameRate: 8,
			repeat: -1
		})
		this.anims.create({
			key:'left',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 2, 6, 10, 14 ] }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key: 'attackr',
			frames: [ { key: 'hero', frame: 19 } ],
			frameRate: 10
		});

		this.anims.create({
			key: 'attackl',
			frames: [ { key: 'hero', frame: 18 } ],
			frameRate: 8
		});

		this.anims.create({
			key: 'attacku',
			frames: [ { key: 'hero', frame: 17 } ],
			frameRate: 8
		});
		this.anims.create({
			key: 'attackd',
			frames: [ { key: 'hero', frame: 16 } ],
			frameRate: 8
		});

		//Colliders

        this.physics.add.collider(this.player, Background);
        
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer1);
        
        Layer1.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer2);
        
        Layer2.setCollisionByProperty({collides:true});

		this.physics.add.collider(this.player, Layer3);
        
        Layer3.setCollisionByProperty({collides:true});

		this.physics.add.collider(this.player, Layer4);
        
        Layer4.setCollisionByProperty({collides:true});

		this.physics.add.overlap(this.player, this.ennemis, this.hitEnnemi, null, this);
		this.physics.add.overlap(this.player, this.powerup, this.getSword, null, this);
		this.physics.add.overlap(this.sword, this.ennemis, this.killMonster, null,this);
		this.physics.add.overlap(this.player, this.argent, this.MOONEY, null,this);

		  //Camera
		  this.cameras.main.startFollow(this.player);
		  this.cameras.main.setBounds(0,0,this.Forest.widthInPixels, this.Forest.heightInPixels);
		  this.cameras.main.setZoom(1.5);
		  this.physics.world.setBounds(0,0, this.Forest.widthInPixels, this.Forest.heightInPixels);
		  this.player.setCollideWorldBounds(true);

        //Variables
		var test = this;

		this.ennemis.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-200,
				duration: 5000,
				ease: 'Power2',
				yoyo: true,
				delay: 100,
				loop: 10
			});
		})

        

        //Manette

        this.paddleConnected=false;

		this.input.gamepad.once('connected', function (pad) {
			this.paddleConnected = true;
			paddle = pad;
			});


    }
    update(t,dt){

        if (!this.player)
		{
			return
		}

        //KeyEvents

		this.player.setVelocity(0)
		this.player.anims.play('normal')

        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(this.speed);
            	this.player.anims.play('right');
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-this.speed);
            	this.player.anims.play('left');
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-this.speed);
            	this.player.anims.play('up');
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(this.speed);
            	this.player.anims.play('down');
        	}

			if (this.attaque && paddle.A){
				this.attaquer(this.player);
			}

		}

		else if (this.cursors.up.isDown)
		{
			this.player.direction='up';
			this.player.setVelocityY(-this.speed)
			this.player.anims.play('up');
		}


		else if (this.cursors.left.isDown)
		{
			this.player.direction='left';
            this.player.setVelocityX(-this.speed)
			this.player.anims.play('left')
		}

		else if (this.cursors.right.isDown)
		{
			this.player.direction='right';
            this.player.setVelocityX(this.speed)
			this.player.anims.play('right')	
		}
        else if (this.cursors.down.isDown)
		{
			this.player.direction='down';
            this.player.setVelocityY(this.speed)
			this.player.anims.play('down')	
		}	
		
		if (this.attaque && Phaser.Input.Keyboard.JustDown(this.boutonAttaque)){
			this.player.setVelocity(0,0)
			this.attaquer(this.player);
		}

    }

	getSword(player, sword){
        this.attaque = true
		sword.destroy();
    }

	hitEnnemi(){
		if (this.immune){
			this.life -= 1;
			this.immune = false;
			
			if(this.life > 0){
				this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
			}

			this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immune = true}, callbackScope: this});

		}

		if (this.life == 2){
			this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.health3.visible = !this.health3.visible;}, callbackScope: this});
			this.health3.destroy()
		}
		if (this.life == 1){
			this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.health2.visible = !this.health2.visible;}, callbackScope: this});
			this.health2.destroy()
		}
		
		
		if(this.life == 0){
			this.scene.start('game-over')
		}
	}

	attaquer(player) {
        
           var coefDirx = 0;
           var coefDiry = 0;
             this.attaque = false;
             this.time.addEvent({delay: 300, callback: function(){this.attaque= true;}, callbackScope: this}); 
	         if (player.direction == 'left') { coefDirx = -1; } 
             else if(player.direction == 'right') { coefDirx = 1 } 
			 else{coefDirx = 0}

             if(player.direction == 'up') { coefDiry = -1 } 
             else if(player.direction == 'down') { coefDiry = 1 } 
			 else{coefDiry = 0}

             var sword = this.sword.create(player.x + (25 * coefDirx), player.y + (25 * coefDiry), 'Attaque');
			 this.time.addEvent({delay: 300, callback: function(){sword.destroy()}, callbackScope: this});
    }

	killMonster(sword, monstres)
    {
		sword.destroy();
		monstres.destroy();
    	var money = this.argent.create(monstres.x,monstres.y,'argent')
    }
	MOONEY(player, argent)
    {
        argent.destroy();
    }
}