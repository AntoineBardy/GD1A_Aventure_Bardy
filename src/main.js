import Phaser from './lib/phaser.js'

import Menu from './scenes/Menu.js'
import GameOver from './scenes/gameover.js'
import Village from './scenes/Village.js'
import Commandes from './scenes/Commandes.js'
import Histoire from './scenes/Histoire.js'
import Forest from './scenes/Forest.js'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	scene: [Menu, Commandes, Histoire, GameOver, Village, Forest],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 0
			},
			debug: false
		}
	},
	input:{gamepad:true},
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
})