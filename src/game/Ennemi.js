import Phaser from '../lib/phaser.js'

export default class Ennemi extends Phaser.GameObjects.Sprite{

	constructor(scene, x, y, image){
        super(scene, x, y, image);

        scene.add.existing(this);
        scene.ennemis.add(this)
    }

    movement(player){
        let vectorX = Math.abs(player.x-this.x);
        let vectorY = Math.abs(player.y-this.y);

        let percentX = vectorX/(vectorX+vectorY);
        let percentY = vectorY/(vectorX+vectorY);

        this.body.setVelocity((50 *percentX)*((player.x-this.x)/vectorX), (50 *percentY)*((player.y-this.y)/vectorY));
        return this.x;
    }
}