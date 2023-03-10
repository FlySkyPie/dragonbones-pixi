import * as PIXI from 'pixi.js'
import { AnimationState, Bone, Transform } from "@flyskypie/dragonbones-js";

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import mechaSkeJson from '../resource/mecha_1406/mecha_1406_ske.json?url';
import mechaTexJson from '../resource/mecha_1406/mecha_1406_tex.json?url';
import mechaTexPng from '../resource/mecha_1406/mecha_1406_tex.png';
import floorSkeJson from '../resource/floor_board/floor_board_ske.json?url';
import floorTexJson from '../resource/floor_board/floor_board_tex.json?url';
import floorTexPng from '../resource/floor_board/floor_board_tex.png';

import { BaseDemo } from "../BaseDemo";
import { DragHelper } from '../DragHelper';

class InverseKinematics extends BaseDemo {
    private _faceDir: number = 0;
    private _aimRadian: number = 0.0;
    private _offsetRotation: number = 0.0;
    private readonly _target: PIXI.Point = new PIXI.Point();
    private _armatureDisplay: PixiArmatureDisplay | null = null;
    private _floorBoard: PixiArmatureDisplay | null = null;
    private _chestBone: Bone | null = null;
    private _leftFootBone: Bone | null = null;
    private _rightFootBone: Bone | null = null;
    private _circleBone: Bone | null = null;
    private _floorBoardBone: Bone | null = null;
    private _aimState: AnimationState | null = null;

    public constructor() {
        super();

        this._resources.push(
            mechaSkeJson,
            mechaTexJson,
            mechaTexPng,
            floorSkeJson,
            floorTexJson,
            floorTexPng
        );
    }

    protected _onStart(): void {
        //
        this.interactive = true;
        const touchHandler = (event: PIXI.interaction.InteractionEvent) => {
            this._target.x = event.data.global.x - this.x;
            this._target.y = event.data.global.y - this.y;
        };
        this.addListener("touchmove", touchHandler, this);
        this.addListener("mousemove", touchHandler, this);
        PIXI.ticker.shared.add(this._enterFrameHandler, this);
        //
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources[mechaSkeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[mechaTexJson].data, this._pixiResources[mechaTexPng].texture);
        factory.parseDragonBonesData(this._pixiResources[floorSkeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[floorTexJson].data, this._pixiResources[floorTexPng].texture);
        //
        this._armatureDisplay = factory.buildArmatureDisplay("mecha_1406");
        this._floorBoard = factory.buildArmatureDisplay("floor_board");

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        if (this._floorBoard === null) {
            throw new Error(`this._floorBoard is null.`);
        }

        //
        this._chestBone = this._armatureDisplay.armature.getBone("chest");
        this._leftFootBone = this._armatureDisplay.armature.getBone("foot_l");
        this._rightFootBone = this._armatureDisplay.armature.getBone("foot_r");
        this._circleBone = this._floorBoard.armature.getBone("circle");
        this._floorBoardBone = this._floorBoard.armature.getBone("floor_board");
        //
        this._armatureDisplay.animation.play("idle");
        this._aimState = this._armatureDisplay.animation.fadeIn("aim", 0.1, 1, 0, "aim_group");

        if (this._aimState === null) {
            throw new Error(`this._aimState is null.`);
        }

        this._aimState.resetToPose = false;
        this._aimState.stop();
        //
        this._floorBoard.animation.play("idle");

        const slot = this._floorBoard.armature.getSlot("player");

        if (slot === null) {
            throw new Error(`slot is null.`);
        }

        slot.display = this._armatureDisplay;
        this._floorBoard.x = 0.0;
        this._floorBoard.y = 50.0;
        this.addChild(this._floorBoard);
        //
        DragHelper.getInstance().stage = this;
        DragHelper.getInstance().enableDrag(this._floorBoard.armature.getSlot("circle")?.display);
        //
        this.createText("Touch to drag circle to modify IK bones.");
    }

    private _enterFrameHandler(deltaTime: number): void { // Make sure game update before dragonBones update.
        this._updateAim();
        this._updateFoot();
    }

    private _updateAim(): void {
        if (this._floorBoard === null) {
            throw new Error(`this._floorBoard is null.`);
        }

        if (this._chestBone === null) {
            throw new Error(`this._chestBone is null.`);
        }

        const positionX = this._floorBoard.x;
        const positionY = this._floorBoard.y;
        const aimOffsetY = this._chestBone.global.y * this._floorBoard.scale.y;

        this._faceDir = this._target.x > 0.0 ? 1 : -1;

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        this._armatureDisplay.armature.flipX = this._faceDir < 0;

        if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(this._target.y - positionY - aimOffsetY, this._target.x - positionX);
        }
        else {
            this._aimRadian = Math.PI - Math.atan2(this._target.y - positionY - aimOffsetY, this._target.x - positionX);
            if (this._aimRadian > Math.PI) {
                this._aimRadian -= Math.PI * 2.0;
            }
        }

        // Calculate progress.
        const progress = Math.abs((this._aimRadian + Math.PI / 2) / Math.PI);

        if (this._aimState === null) {
            throw new Error(`this._aimState is null.`);
        }

        // Set currentTime.
        this._aimState.currentTime = progress * (this._aimState.totalTime);
    }

    private _updateFoot(): void {
        // Set floor board bone offset.
        const minRadian = -25 * Transform.DEG_RAD;
        const maxRadian = 25.0 * Transform.DEG_RAD;

        if (this._circleBone === null) {
            throw new Error(`this._circleBone is null.`);
        }

        let circleRadian = Math.atan2(this._circleBone.global.y, this._circleBone.global.x);

        if (this._circleBone.global.x < 0.0) {
            circleRadian = Transform.normalizeRadian(circleRadian + Math.PI);
        }

        this._offsetRotation = Math.min(Math.max(circleRadian, minRadian), maxRadian);

        if (this._floorBoardBone === null) {
            throw new Error(`this._floorBoardBone is null.`);
        }

        this._floorBoardBone.offset.rotation = this._offsetRotation;
        this._floorBoardBone.invalidUpdate();
        // Set foot bone offset.
        const tan = Math.tan(this._offsetRotation);
        const sinR = 1.0 / Math.sin(Math.PI * 0.5 - this._offsetRotation) - 1.0;

        if (this._leftFootBone === null) {
            throw new Error(`this._leftFootBone is null.`);
        }

        if (this._leftFootBone.origin === null) {
            throw new Error(`this._leftFootBone.origin is null.`);
        }

        this._leftFootBone.offset.y = tan * this._leftFootBone.global.x + this._leftFootBone.origin.y * sinR;
        this._leftFootBone.offset.rotation = this._offsetRotation * this._faceDir;
        this._leftFootBone.invalidUpdate();

        if (this._rightFootBone === null) {
            throw new Error(`this._rightFootBone is null.`);
        }

        if (this._rightFootBone.origin === null) {
            throw new Error(`this._rightFootBone.origin is null.`);
        }

        this._rightFootBone.offset.y = tan * this._rightFootBone.global.x + this._rightFootBone.origin.y * sinR;
        this._rightFootBone.offset.rotation = this._offsetRotation * this._faceDir;
        this._rightFootBone.invalidUpdate();
    }
}

new InverseKinematics();
