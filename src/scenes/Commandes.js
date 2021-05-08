import Phaser from '../lib/phaser.js'

export default class Commandes extends Phaser.Scene {
    constructor() {
        super('commandes')
    }
    preload()
	{
		this.load.image('commandes', 'assets/Icons/commandesScheme.png')	
	}
    create()
	{

        this.add.image(0, 0, 'commandes').setOrigin(0).setDepth(0);

        this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('menu')
		})
	}
}