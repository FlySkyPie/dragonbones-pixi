import * as PIXI from 'pixi.js'
import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import shizukuSkeJson from '../resource/shizuku/shizuku_ske.json?url';
import shizukuTex00Png from '../resource/shizuku/shizuku.1024/texture_00.png';
import shizukuTex01Png from '../resource/shizuku/shizuku.1024/texture_01.png';
import shizukuTex02Png from '../resource/shizuku/shizuku.1024/texture_02.png';
import shizukuTex03Png from '../resource/shizuku/shizuku.1024/texture_03.png';

import { BaseDemo } from "../BaseDemo";

class EyeTracking extends BaseDemo {
    private _scale: number = 0.3;
    private readonly _target: PIXI.Point = new PIXI.Point();
    private readonly _animationNames: string[] = [
        "PARAM_ANGLE_X",
        "PARAM_ANGLE_Y",
        "PARAM_ANGLE_Z",
        "PARAM_EYE_BALL_X",
        "PARAM_EYE_BALL_Y",
        "PARAM_BODY_X",
        "PARAM_BODY_Y",
        "PARAM_BODY_Z",
        "PARAM_BODY_ANGLE_X",
        "PARAM_BODY_ANGLE_Y",
        "PARAM_BODY_ANGLE_Z",
        "PARAM_BREATH",
    ];
    private _armatureDisplay: PixiArmatureDisplay | null = null;

    public constructor() {
        super();

        this._resources.push(
            shizukuSkeJson,
            shizukuTex00Png,
            shizukuTex01Png,
            shizukuTex02Png,
            shizukuTex03Png,
        );
    }

    protected _onStart(): void {
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources[shizukuSkeJson].data, "shizuku");
        factory.updateTextureAtlases(
            [
                this._pixiResources[shizukuTex00Png].texture,
                this._pixiResources[shizukuTex01Png].texture,
                this._pixiResources[shizukuTex02Png].texture,
                this._pixiResources[shizukuTex03Png].texture,
            ],
            "shizuku"
        );

        this._armatureDisplay = factory.buildArmatureDisplay("shizuku", "shizuku");

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        this._armatureDisplay.animation.play("idle_00");

        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 200.0;
        this._armatureDisplay.scale.set(this._scale);
        this.addChild(this._armatureDisplay);

        //
        this.interactive = true;
        this.addListener('touchmove', this._touchHandler, this);
        this.addListener('mousemove', this._touchHandler, this);
        PIXI.ticker.shared.add(this._enterFrameHandler, this);
    }

    private _touchHandler(event: PIXI.interaction.InteractionEvent): void {
        this._setTarget(event.data.global.x, event.data.global.y);
    }

    private _setTarget(x: number, y: number) {
        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        this._target.x += ((x - this.x - this._armatureDisplay.x) / this._scale - this._target.x) * 0.3;
        this._target.y += ((y - this.y - this._armatureDisplay.y) / this._scale - this._target.y) * 0.3;
    }

    protected _enterFrameHandler(deltaTime: number): void {
        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        const armature = this._armatureDisplay.armature;
        const animation = this._armatureDisplay.animation;
        const canvas = armature.armatureData.canvas;

        if (canvas === null) {
            throw new Error(`canvas is null.`);
        }

        let p = 0.0;
        const pX = Math.max(Math.min((this._target.x - canvas.x) / (canvas.width * 0.5), 1.0), -1.0);
        const pY = -Math.max(Math.min((this._target.y - canvas.y) / (canvas.height * 0.5), 1.0), -1.0);
        for (const animationName of this._animationNames) {
            if (!animation.hasAnimation(animationName)) {
                continue;
            }

            let animationState = animation.getState(animationName, 1);
            if (!animationState) {
                animationState = animation.fadeIn(animationName, 0.1, 1, 1, animationName);
                if (animationState) {
                    animationState.resetToPose = false;
                    animationState.stop();
                }
            }

            if (!animationState) {
                continue;
            }

            if (armature.clock === null) {
                throw new Error(`armature.clock is null.`);
            }

            switch (animationName) {
                case "PARAM_ANGLE_X":
                case "PARAM_EYE_BALL_X":
                    p = (pX + 1.0) * 0.5;
                    break;

                case "PARAM_ANGLE_Y":
                case "PARAM_EYE_BALL_Y":
                    p = (pY + 1.0) * 0.5;
                    break;

                case "PARAM_ANGLE_Z":
                    p = (-pX * pY + 1.0) * 0.5;
                    break;

                case "PARAM_BODY_X":
                case "PARAM_BODY_ANGLE_X":
                    p = (pX + 1.0) * 0.5;
                    break;

                case "PARAM_BODY_Y":
                case "PARAM_BODY_ANGLE_Y":
                    p = (-pX * pY + 1.0) * 0.5;
                    break;

                case "PARAM_BODY_Z":
                case "PARAM_BODY_ANGLE_Z":
                    p = (-pX * pY + 1.0) * 0.5;
                    break;

                case "PARAM_BREATH":
                    p = (Math.sin(armature.clock.time) + 1.0) * 0.5;
                    break;
            }

            animationState.currentTime = p * animationState.totalTime;
        }
    }
}

new EyeTracking();
