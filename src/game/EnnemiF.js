import Phaser from '../lib/phaser.js'

export default class Ennemi extends Phaser.GameObjects.Sprite{

	constructor(scene, x, y, image){
        super(scene, x, y, image);

        scene.add.existing(this);
        scene.ennemis.add(this)
    }
}