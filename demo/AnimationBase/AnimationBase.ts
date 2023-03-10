import { EventObject } from "@flyskypie/dragonbones-js";

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import skeJson from '../resource/progress_bar/progress_bar_ske.json?url';
import texJson from '../resource/progress_bar/progress_bar_tex.json?url';
import texPng from '../resource/progress_bar/progress_bar_tex.png';

import { BaseDemo } from "../BaseDemo";

class AnimationBase extends BaseDemo {
    private _armatureDisplay: PixiArmatureDisplay | null = null;

    public constructor() {
        super();

        this._resources.push(
            skeJson,
            texJson,
            texPng
        );
    }

    protected _onStart(): void {
        const factory = PixiFactory.factory;
        //console.log(this._pixiResources)
        factory.parseDragonBonesData(this._pixiResources[skeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[texJson].data, this._pixiResources[texPng].texture);
        //
        this._armatureDisplay = factory.buildArmatureDisplay("progress_bar");

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 0.0;
        this.addChild(this._armatureDisplay);
        // Add animation event listener.
        this._armatureDisplay.on(EventObject.START, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.FADE_IN, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.FADE_OUT, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(EventObject.FRAME_EVENT, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("idle");
        //
        this.interactive = true;
        this.addListener("touchstart", this._touchHandler, this);
        this.addListener("touchend", this._touchHandler, this);
        this.addListener("touchmove", this._touchHandler, this);
        this.addListener("mousedown", this._touchHandler, this);
        this.addListener("mouseup", this._touchHandler, this);
        this.addListener("mousemove", this._touchHandler, this);
        //
        this.createText("Touch to control animation play progress.");
    }

    private _isTouched: boolean = false;
    private _touchHandler(event: PIXI.interaction.InteractionEvent): void {
        const progress = Math.min(Math.max((event.data.global.x - this.x + 300.0) / 600.0, 0.0), 1.0);


        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }


        switch (event.type) {
            case "touchstart":
            case "mousedown":
                this._isTouched = true;
                this._armatureDisplay.animation.gotoAndStopByProgress("idle", progress);
                break;

            case "touchend":
            case "mouseup":
                this._isTouched = false;
                this._armatureDisplay.animation.play();
                break;

            case "touchmove":
            case "mousemove":
                if (this._isTouched) {
                    const animationState = this._armatureDisplay.animation.getState("idle");
                    if (animationState) {
                        animationState.currentTime = animationState.totalTime * progress;
                    }
                }
                break;
        }
    }

    private _animationEventHandler(event: EventObject): void {
        if (event.animationState === null) {
            throw new Error(`event.animationState is null.`);
        }

        console.log(event.animationState.name, event.type, event.name);
    }
}

new AnimationBase();