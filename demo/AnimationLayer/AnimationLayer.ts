import { EventObject } from "@flyskypie/dragonbones-js";

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import { BaseDemo } from "../BaseDemo";

class AnimationLayer extends BaseDemo {
    private _armatureDisplay: PixiArmatureDisplay | null = null;

    public constructor() {
        super();

        this._resources.push(
            "/resource/mecha_1004d/mecha_1004d_ske.json",
            "/resource/mecha_1004d/mecha_1004d_tex.json",
            "/resource/mecha_1004d/mecha_1004d_tex.png"
        );
    }

    protected _onStart(): void {
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["/resource/mecha_1004d/mecha_1004d_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["/resource/mecha_1004d/mecha_1004d_tex.json"].data, this._pixiResources["/resource/mecha_1004d/mecha_1004d_tex.png"].texture);

        this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        this._armatureDisplay.on(EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("walk");

        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 100.0;
        this.addChild(this._armatureDisplay);
    }

    private _animationEventHandler(event: EventObject): void {
        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        let attackState = this._armatureDisplay.animation.getState("attack_01");


        if (!attackState) {
            attackState = this._armatureDisplay.animation.fadeIn("attack_01", 0.1, 1, 1);

            if (attackState === null) {
                throw new Error(`attackState is null.`);
            }

            attackState.resetToPose = false;
            attackState.autoFadeOutTime = 0.1;
            attackState.addBoneMask("chest");
            attackState.addBoneMask("effect_l");
            attackState.addBoneMask("effect_r");
        }
    }
}

new AnimationLayer();
