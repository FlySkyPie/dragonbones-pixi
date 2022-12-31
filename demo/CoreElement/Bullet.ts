import * as PIXI from 'pixi.js'

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import { Game } from './Game';

type PointType = PIXI.Point;
type ArmatureDisplayType = PixiArmatureDisplay;

export class Bullet {
    private _speedX: number = 0.0;
    private _speedY: number = 0.0;

    private _armatureDisplay: ArmatureDisplayType;
    private _effecDisplay: ArmatureDisplayType | null = null;

    public constructor(armatureName: string, effectArmatureName: string | null, radian: number, speed: number, position: PointType) {
        this._speedX = Math.cos(radian) * speed;
        this._speedY = Math.sin(radian) * speed;

        this._armatureDisplay = PixiFactory.factory.buildArmatureDisplay(armatureName)!;
        this._armatureDisplay.x = position.x + Math.random() * 2 - 1;
        this._armatureDisplay.y = position.y + Math.random() * 2 - 1;
        this._armatureDisplay.rotation = radian;

        if (effectArmatureName !== null) {
            this._effecDisplay = PixiFactory.factory.buildArmatureDisplay(effectArmatureName);

            if (this._effecDisplay === null) {
                throw new Error(`this._effecDisplay is null.`);
            }

            this._effecDisplay.rotation = radian;
            this._effecDisplay.x = this._armatureDisplay.x;
            this._effecDisplay.y = this._armatureDisplay.y;
            this._effecDisplay.scale.x = 1.0 + Math.random() * 1.0;
            this._effecDisplay.scale.y = 1.0 + Math.random() * 0.5;

            if (Math.random() < 0.5) {
                this._effecDisplay.scale.y *= -1.0;
            }

            Game.instance.addChild(this._effecDisplay);
            this._effecDisplay.animation.play("idle");
        }

        Game.instance.addChild(this._armatureDisplay);
        this._armatureDisplay.animation.play("idle");
    }

    public update(): boolean {
        this._armatureDisplay.x += this._speedX;
        this._armatureDisplay.y += this._speedY;

        if (
            this._armatureDisplay.x < -Game.instance.stageWidth * 0.5 - 100.0 || this._armatureDisplay.x > Game.instance.stageWidth * 0.5 + 100.0 ||
            this._armatureDisplay.y < -Game.instance.stageHeight * 0.5 - 100.0 || this._armatureDisplay.y > Game.instance.stageHeight * 0.5 + 100.0
        ) {
            Game.instance.removeChild(this._armatureDisplay);
            this._armatureDisplay.dispose();

            if (this._effecDisplay !== null) {
                Game.instance.removeChild(this._effecDisplay);
                this._effecDisplay.dispose();
            }

            return true;
        }

        return false;
    }
}