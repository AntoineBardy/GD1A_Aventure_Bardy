import Phaser from '../lib/phaser.js'

export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }
    init() {
    }

    preload()
	{
		this.load.image('logo', 'assets/Icons/logo.png')
        this.load.image('playbutton', 'assets/Icons/play.png')
        this.load.image('menu', 'assets/Icons/MenuScreen.png')
        this.load.image('commandesbutton', 'assets/Icons/gamepad.png')	
	}

    create() { //creating the menu screen

        //create images (z order)

        this.add.image(100 , this.game.renderer.height * 0.10, 'logo').setDepth(1).setScale(0.2);

        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'playbutton').setDepth(1);

        let commandButton = this.add.image(this.game.renderer.width -100 , this.game.renderer.height * 0.10, 'commandesbutton').setDepth(1).setScale(0.7);


        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('histoire');
        })

        commandButton.setInteractive();

        commandButton.on("pointerup", () => {
            this.scene.start('commandes');
        })

    }
}