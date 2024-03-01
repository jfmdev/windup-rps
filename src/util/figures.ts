import { Throw } from '../util/misc.js';

// FIXME: A base class should be defined to avoid copy/pasted code between Mannequin and Robot. 

export class Mannequin {
  private scene: Phaser.Scene;

  private arm: Phaser.GameObjects.Sprite;
  private body: Phaser.GameObjects.Sprite;
  private container: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // Define group.
    this.container = scene.add.container();
    this.container.setPosition(200, 240);

    // Add robot body.
    this.body = scene.add.sprite(0, 0, 'mannequin');
    this.body.setOrigin(0.5, 0.5);
    this.container.add(this.body);

    // Add robot arm.
    this.arm = scene.add.sprite(0, -50, 'mannequin-arm');
    this.arm.setOrigin(0.08, 0.5);
    this.arm.angle = -120;
    this.container.add(this.arm);
  }

  isArmDown() {
    return this.arm.angle > -60;
  }

  animateArm(count: number, result: Throw, callback: Function | null = null) {
    // Reset arm frame.
    this.arm.setFrame(0);

    // Validate parameters.
    if(count < 0) count = 0;

    // If the arm is up, then first I must lower it, and then animate it.
    const newAngle = this.isArmDown()? -120 : 30;
    const duration = 200;
    const delay = 50;
    const repeat = this.isArmDown()? count : 0;
    const yoyo = this.isArmDown();
    const wasArmDown = this.isArmDown();

    this.scene.add.tween({
      targets: this.arm,
      angle: newAngle,
      duration,
      delay,
      repeat,
      yoyo,
      ease: Phaser.Math.Easing.Quadratic,
      onComplete: () => {
        // Verify if the arm was originally down.
        if(wasArmDown) {
          // Set result and invoke callback.
          this.arm.setFrame(result + 1);
          if(callback) { callback(); }
        } else {
          // This tween only lowered the arm, now do the animation.
          this.animateArm(count-1, result, callback);
        }
      }
    });
  }
}

export class Robot {
  private scene: Phaser.Scene;

  private container: Phaser.GameObjects.Container;

  private arm: Phaser.GameObjects.Sprite;
  private body: Phaser.GameObjects.Sprite;
  private windupKey: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, level: number) {
    this.scene = scene;

    // Define group.
    this.container = scene.add.container();
    this.container.setPosition(440, 250);

    // Add windup key.
    this.windupKey = scene.add.sprite(50, -20, 'windup-key');
    this.windupKey.setOrigin(0.5, 0.5);
    this.windupKey.setScale(0.5, 0.5); 
    this.container.add(this.windupKey);

    // Define windup key animation.
    this.windupKey.anims.create({ key: 'rotate', frames: scene.anims.generateFrameNumbers('windup-key', { start: 0, end: 23 }), frameRate: 10, repeat: -1 })

    // Add robot body.
    const number = (level && level > 0)? (level%4 + 1) : (Math.floor(Math.random()*4) + 1);
    this.body = scene.add.sprite(-2, -8, 'robot-'+number);
    this.body.setOrigin(0.5, 0.5);
    this.container.add(this.body);

    // Add robot arm.
    this.arm = scene.add.sprite(0, -20, 'robot-arm');
    this.arm.setOrigin(0.90, 0.5);
    this.arm.angle = 120;
    this.container.add(this.arm);
  }

  rotateKey(doit: boolean) {
    if(doit) {
      this.windupKey.anims.play('rotate');
    } else {
      this.windupKey.anims.stop();
    }
  }

  isArmDown() {
    return this.arm.angle < 60;
  }

  animateArm(count: number, result: Throw, callback: Function | null = null) {
    // Reset arm frame.
    this.arm.setFrame(0);

    // Validate parameters.
    if(count < 0) count = 0;

    // If the arm is up, then first I must lower it, and then animate it.
    const newAngle = this.isArmDown()? 120 : -30;
    const duration = 200;
    const delay = 50;
    const repeat = this.isArmDown()? count : 0;
    const yoyo = this.isArmDown();
    const wasArmDown = this.isArmDown();

    this.scene.add.tween({
      targets: this.arm,
      angle: newAngle,
      duration,
      delay,
      repeat,
      yoyo,
      ease: Phaser.Math.Easing.Quadratic,
      onComplete: () => {
        // Verify if the arm was originally down.
        if(wasArmDown) {
          // Set result and invoke callback.
          this.arm.setFrame(result + 1);
          if(callback) { callback(); }
        } else {
          // This tween only lowered the arm, now do the animation.
          this.animateArm(count-1, result, callback);
        }
      }
    });
  }
}
