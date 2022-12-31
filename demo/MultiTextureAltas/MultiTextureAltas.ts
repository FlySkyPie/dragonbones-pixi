import * as PIXI from 'pixi.js'

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import effectSkeJson from '../resource/effect/effect_ske.json?url';
import effectTexJson from '../resource/effect/effect_tex.json?url';
import effectTexPng from '../resource/effect/effect_tex.png';
import effectSdTexJson from '../resource/effect/effect_sd_tex.json?url';
import effectSdTexPng from '../resource/effect/effect_sd_tex.png';

import { BaseDemo } from "../BaseDemo";

class MultiTextureAltas extends BaseDemo {
    private _armatureDisplayA: PixiArmatureDisplay | null = null;
    private _armatureDisplayB: PixiArmatureDisplay | null = null;
    private _armatureDisplayC: PixiArmatureDisplay | null = null;
    private _armatureDisplayD: PixiArmatureDisplay | null = null;

    public constructor() {
        super();

        this._resources.push(
            effectSkeJson,
            effectTexJson,
            effectTexPng,
            effectSdTexJson,
            effectSdTexPng
        );
    }

    protected _onStart(): void {
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources[effectSkeJson].data, "hd", 1.0);
        factory.parseDragonBonesData(this._pixiResources[effectSkeJson].data, "sd", 0.5);
        factory.parseTextureAtlasData(this._pixiResources[effectTexJson].data, this._pixiResources[effectTexPng].texture, "hd", 1.0);
        factory.parseTextureAtlasData(this._pixiResources[effectSdTexJson].data, this._pixiResources[effectSdTexPng].texture, "sd", 2.0);

        this._armatureDisplayA = factory.buildArmatureDisplay("flower", "hd", undefined, "hd"); // HD Armature and HD TextureAtlas.
        this._armatureDisplayB = factory.buildArmatureDisplay("flower", "hd", undefined, "sd"); // HD Armature and SD TextureAtlas.
        this._armatureDisplayC = factory.buildArmatureDisplay("flower", "sd", undefined, "hd"); // SD Armature and HD TextureAtlas.
        this._armatureDisplayD = factory.buildArmatureDisplay("flower", "sd", undefined, "sd"); // SD Armature and SD TextureAtlas.

        if (this._armatureDisplayA === null) {
            throw new Error(`this._armatureDisplayA is null.`);
        }

        if (this._armatureDisplayB === null) {
            throw new Error(`this._armatureDisplayB is null.`);
        }

        if (this._armatureDisplayC === null) {
            throw new Error(`this._armatureDisplayC is null.`);
        }

        if (this._armatureDisplayD === null) {
            throw new Error(`this._armatureDisplayD is null.`);
        }

        this._armatureDisplayA.x = -250.0;
        this._armatureDisplayA.y = 0.0;
        this._armatureDisplayB.x = 250.0;
        this._armatureDisplayB.y = 0.0;
        this._armatureDisplayC.x = -250.0;
        this._armatureDisplayC.y = 200.0;
        this._armatureDisplayD.x = 250.0;
        this._armatureDisplayD.y = 200.0;

        this.addChild(this._armatureDisplayA);
        this.addChild(this._armatureDisplayB);
        this.addChild(this._armatureDisplayC);
        this.addChild(this._armatureDisplayD);
        //
        this.interactive = true;
        const touchHandler = (event: PIXI.interaction.InteractionEvent) => {
            this._changeAnimation();
        };
        this.addListener("touchstart", touchHandler, this);
        this.addListener("mousedown", touchHandler, this);
        //
        this._changeAnimation();
    }

    private _changeAnimation(): void {
        if (this._armatureDisplayA === null) {
            throw new Error(`this._armatureDisplayA is null.`);
        }

        if (this._armatureDisplayB === null) {
            throw new Error(`this._armatureDisplayB is null.`);
        }

        if (this._armatureDisplayC === null) {
            throw new Error(`this._armatureDisplayC is null.`);
        }

        if (this._armatureDisplayD === null) {
            throw new Error(`this._armatureDisplayD is null.`);
        }


        let animationName = this._armatureDisplayA.animation.lastAnimationName;
        if (animationName) {
            const animationNames = this._armatureDisplayA.animation.animationNames;
            const animationIndex = (animationNames.indexOf(animationName) + 1) % animationNames.length;
            this._armatureDisplayA.animation.play(animationNames[animationIndex])!.playTimes = 0;
        }
        else {
            this._armatureDisplayA.animation.play()!.playTimes = 0;
        }

        animationName = this._armatureDisplayA.animation.lastAnimationName;

    

        this._armatureDisplayB.animation.play(animationName)!.playTimes = 0;
        this._armatureDisplayC.animation.play(animationName)!.playTimes = 0;
        this._armatureDisplayD.animation.play(animationName)!.playTimes = 0;
    }
}

new MultiTextureAltas();
