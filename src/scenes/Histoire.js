import Phaser from '../lib/phaser.js'

export default class Histoire extends Phaser.Scene {
    constructor() {
        super('histoire')
    }
    preload()
	{
		this.load.image('histoire', 'assets/Icons/NVL.png')	
	}
    create()
	{
        this.entryForest = false;
        this.attack = false;
        this.life = 3;
        this.add.image(0, 0, 'histoire').setOrigin(0).setDepth(0);

        this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('village' , {entryForest:this.entryForest, attack:this.attack , health:this.life,x:1760,y:896,speed : 175})
		})
	}
}