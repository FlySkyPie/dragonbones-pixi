import { EventObject } from "@flyskypie/dragonbones-js";

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import mechaSkeJson from '../resource/mecha_1004d/mecha_1004d_ske.json?url';
import mechaTexJson from '../resource/mecha_1004d/mecha_1004d_tex.json?url';
import mechaTexPng from '../resource/mecha_1004d/mecha_1004d_tex.png';

import { BaseDemo } from "../BaseDemo";

class DragonBonesEvent extends BaseDemo {
    private _armatureDisplay: PixiArmatureDisplay | null = null;

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
        factory.soundEventManager.on(EventObject.SOUND_EVENT, this._soundEventHandler, this);

        this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        this._armatureDisplay.on(EventObject.COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("walk");

        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 100.0;
        this.addChild(this._armatureDisplay);
        //
        this.interactive = true;
        const touchHandler = () => {
            if (this._armatureDisplay === null) {
                throw new Error(`this._armatureDisplay is null.`);
            }

            this._armatureDisplay.animation.fadeIn("skill_03", 0.2);
        };
        this.addListener("mousedown", touchHandler, this);
        this.addListener("touchstart", touchHandler, this);
        //
        this.createText("Touch to play animation.");
    }

    private _soundEventHandler(event: EventObject): void {
        console.log(event.name);
    }

    private _animationEventHandler(event: EventObject): void {
        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        if (event.animationState === null) {
            throw new Error(`event.animationState is null.`);
        }

        if (event.animationState.name === "skill_03") {
            this._armatureDisplay.animation.fadeIn("walk", 0.2);
        }
    }
}

new DragonBonesEvent();
