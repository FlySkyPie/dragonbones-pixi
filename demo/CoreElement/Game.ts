import * as PIXI from 'pixi.js'

import { PixiFactory } from "@dragonbones-pixi";

import mechaSkeJson from '../resource/mecha_1502b/mecha_1502b_ske.json?url';
import mechaTexJson from '../resource/mecha_1502b/mecha_1502b_tex.json?url';
import mechaTexPng from '../resource/mecha_1502b/mecha_1502b_tex.png';
import skinSkeJson from '../resource/skin_1502b/skin_1502b_ske.json?url';
import skinTexJson from '../resource/skin_1502b/skin_1502b_tex.json?url';
import skinTexPng from '../resource/skin_1502b/skin_1502b_tex.png';
import weaponSkeJson from '../resource/weapon_1000/weapon_1000_ske.json?url';
import weaponTexJson from '../resource/weapon_1000/weapon_1000_tex.json?url';
import weaponTexPng from '../resource/weapon_1000/weapon_1000_tex.png';

import { BaseDemo } from "../BaseDemo";
import { Mecha } from './Mecha';
import { Bullet } from './Bullet';

export class Game extends BaseDemo {
    public static GROUND: number;
    public static G: number = 0.6;
    public static instance: Game;

    private _left: boolean = false;
    private _right: boolean = false;
    private _player: Mecha | null = null;
    private readonly _bullets: Array<Bullet> = [];

    public constructor() {
        super();

        this._resources.push(
            mechaSkeJson,
            mechaTexJson,
            mechaTexPng,
            skinSkeJson,
            skinTexJson,
            skinTexPng,
            weaponSkeJson,
            weaponTexJson,
            weaponTexPng
        );
    }

    protected _onStart(): void {
        Game.GROUND = this.stageHeight * 0.5 - 150.0;
        Game.instance = this;
        //
        this.interactive = true;
        this.addListener('touchstart', this._touchHandler, this);
        this.addListener('touchend', this._touchHandler, this);
        this.addListener('touchmove', this._touchHandler, this);
        this.addListener('mousedown', this._touchHandler, this);
        this.addListener('mouseup', this._touchHandler, this);
        this.addListener('mousemove', this._touchHandler, this);
        PIXI.ticker.shared.add(this._enterFrameHandler, this);
        document.addEventListener("keydown", this._keyHandler);
        document.addEventListener("keyup", this._keyHandler);
        //
        this.createText("Press W/A/S/D to move. Press Q/E/SPACE to switch weapons and skin. Touch to aim and fire.");
        //
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources[mechaSkeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[mechaTexJson].data, this._pixiResources[mechaTexPng].texture);
        factory.parseDragonBonesData(this._pixiResources[skinSkeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[skinTexJson].data, this._pixiResources[skinTexPng].texture);
        factory.parseDragonBonesData(this._pixiResources[weaponSkeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[weaponTexJson].data, this._pixiResources[weaponTexPng].texture);
        //
        this._player = new Mecha();
    }

    private _touchHandler(event: PIXI.interaction.InteractionEvent): void {
        if (this._player === null) {
            throw new Error(`this._player is null.`);
        }

        this._player.aim(event.data.global.x - this.x, event.data.global.y - this.y);

        if (event.type === 'touchstart' || event.type === 'mousedown') {
            this._player.attack(true);
        }
        else if (event.type === 'touchend' || event.type === 'mouseup') {
            this._player.attack(false);
        }
    }

    private _keyHandler(event: KeyboardEvent): void {
        const isDown = event.type === "keydown";
        switch (event.keyCode) {
            case 37:
            case 65:
                Game.instance._left = isDown;
                Game.instance._updateMove(-1);
                break;

            case 39:
            case 68:
                Game.instance._right = isDown;
                Game.instance._updateMove(1);
                break;

            case 38:
            case 87:
                if (isDown) {
                    Game.instance._player?.jump();
                }
                break;

            case 83:
            case 40:
                Game.instance._player?.squat(isDown);
                break;

            case 81:
                if (isDown) {
                    Game.instance._player?.switchWeaponR();
                }
                break;

            case 69:
                if (isDown) {
                    Game.instance._player?.switchWeaponL();
                }
                break;

            case 32:
                if (isDown) {
                    Game.instance._player?.switchSkin();
                }
                break;
        }
    }

    private _enterFrameHandler(deltaTime: number): void { // Make sure game update before dragonBones update.
        if (this._player) {
            this._player.update();
        }

        let i = this._bullets.length;
        while (i--) {
            const bullet = this._bullets[i];
            if (bullet.update()) {
                this._bullets.splice(i, 1);
            }
        }
    }

    private _updateMove(dir: number): void {
        if (this._player === null) {
            throw new Error(`this._player is null.`);
        }

        if (this._left && this._right) {
            this._player.move(dir);
        }
        else if (this._left) {
            this._player.move(-1);
        }
        else if (this._right) {
            this._player.move(1);
        }
        else {
            this._player.move(0);
        }
    }

    public addBullet(bullet: Bullet): void {
        this._bullets.push(bullet);
    }
}
