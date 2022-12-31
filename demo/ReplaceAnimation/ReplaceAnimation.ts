import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import mechaSkeJson from '../resource/mecha_2903/mecha_2903_ske.json?url';
import mechaTexJson from '../resource/mecha_2903/mecha_2903_tex.json?url';
import mechaTexPng from '../resource/mecha_2903/mecha_2903_tex.png';

import { BaseDemo } from "../BaseDemo";

class ReplaceAnimation extends BaseDemo {
    private _armatureDisplayA: PixiArmatureDisplay | null = null;
    private _armatureDisplayB: PixiArmatureDisplay | null = null;
    private _armatureDisplayC: PixiArmatureDisplay | null = null;
    private _armatureDisplayD: PixiArmatureDisplay | null = null;

    public constructor() {
        super();

        this._resources.push(
            mechaSkeJson,
            mechaTexJson,
            mechaTexPng
        );
    }

    protected _onStart(): void {
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources[mechaSkeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[mechaTexJson].data, this._pixiResources[mechaTexPng].texture);

        this._armatureDisplayA = factory.buildArmatureDisplay("mecha_2903");
        this._armatureDisplayB = factory.buildArmatureDisplay("mecha_2903b");
        this._armatureDisplayC = factory.buildArmatureDisplay("mecha_2903c");
        this._armatureDisplayD = factory.buildArmatureDisplay("mecha_2903d");

        const sourceArmatureData = factory.getArmatureData("mecha_2903d");

        if (sourceArmatureData === null) {
            throw new Error(`sourceArmatureData is null.`);
        }

        if (this._armatureDisplayA === null) {
            throw new Error(`this._armatureDisplayA is null.`);
        }

        if (this._armatureDisplayB === null) {
            throw new Error(`this._armatureDisplayB is null.`);
        }

        if (this._armatureDisplayC === null) {
            throw new Error(`this._armatureDisplayC is null.`);
        }

        factory.replaceAnimation(this._armatureDisplayA.armature, sourceArmatureData);
        factory.replaceAnimation(this._armatureDisplayB.armature, sourceArmatureData);
        factory.replaceAnimation(this._armatureDisplayC.armature, sourceArmatureData);

        if (this._armatureDisplayD === null) {
            throw new Error(`this._armatureDisplayD is null.`);
        }

        this.addChild(this._armatureDisplayD);
        this.addChild(this._armatureDisplayA);
        this.addChild(this._armatureDisplayB);
        this.addChild(this._armatureDisplayC);

        this._armatureDisplayA.x = 0.0 - 350.0;
        this._armatureDisplayA.y = 0.0 + 150.0;
        this._armatureDisplayB.x = 0.0;
        this._armatureDisplayB.y = 0.0 + 150.0;
        this._armatureDisplayC.x = 0.0 + 350.0;
        this._armatureDisplayC.y = 0.0 + 150.0;
        this._armatureDisplayD.x = 0.0;
        this._armatureDisplayD.y = 0.0 - 50.0;
        //
        this.interactive = true;
        const touchHandler = () => {
            this._changeAnimation();
        };
        this.addListener("touchstart", touchHandler, this);
        this.addListener("mousedown", touchHandler, this);
        //
        this.createText("Touch to change animation.");
    }

    private _changeAnimation(): void {
        if (this._armatureDisplayD === null) {
            throw new Error(`this._armatureDisplayD is null.`);
        }

        let animationName = this._armatureDisplayD.animation.lastAnimationName;
        if (animationName) {
            const animationNames = this._armatureDisplayD.animation.animationNames;
            const animationIndex = (animationNames.indexOf(animationName) + 1) % animationNames.length;
            this._armatureDisplayD.animation.play(animationNames[animationIndex]);
        }
        else {
            this._armatureDisplayD.animation.play();
        }

        animationName = this._armatureDisplayD.animation.lastAnimationName;

        if (this._armatureDisplayA === null) {
            throw new Error(`this._armatureDisplayA is null.`);
        }

        if (this._armatureDisplayB === null) {
            throw new Error(`this._armatureDisplayB is null.`);
        }

        if (this._armatureDisplayC === null) {
            throw new Error(`this._armatureDisplayC is null.`);
        }


        this._armatureDisplayA.animation.play(animationName);
        this._armatureDisplayB.animation.play(animationName);
        this._armatureDisplayC.animation.play(animationName);
    }
}

new ReplaceAnimation();
