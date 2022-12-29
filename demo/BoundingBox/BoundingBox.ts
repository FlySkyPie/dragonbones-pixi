import * as PIXI from 'pixi.js'
import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";
import { Bone, OffsetMode } from "dragonbones-js";

import { BaseDemo } from "../BaseDemo";
import { DragHelper } from "../DragHelper";

class BoundingBox extends BaseDemo {
    private readonly _helpPointA: PIXI.Point = new PIXI.Point();
    private readonly _helpPointB: PIXI.Point = new PIXI.Point();
    private readonly _helpPointC: PIXI.Point = new PIXI.Point();

    private _armatureDisplay: PixiArmatureDisplay | null = null;
    private _boundingBoxTester: PixiArmatureDisplay | null = null;
    private _targetA: PixiArmatureDisplay | null = null;
    private _targetB: PixiArmatureDisplay | null = null;
    private _line: Bone | null = null;
    private _pointA: Bone | null = null;
    private _pointB: Bone | null = null;

    public constructor() {
        super();

        this._resources.push(
            "/resource/mecha_2903/mecha_2903_ske.json",
            "/resource/mecha_2903/mecha_2903_tex.json",
            "/resource/mecha_2903/mecha_2903_tex.png",
            "/resource/bounding_box_tester/bounding_box_tester_ske.json",
            "/resource/bounding_box_tester/bounding_box_tester_tex.json",
            "/resource/bounding_box_tester/bounding_box_tester_tex.png"
        );
    }

    protected _onStart(): void {
        //
        PIXI.ticker.shared.add(this._enterFrameHandler, this);
        //
        const factory = PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["/resource/mecha_2903/mecha_2903_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["/resource/mecha_2903/mecha_2903_tex.json"].data, this._pixiResources["/resource/mecha_2903/mecha_2903_tex.png"].texture);
        factory.parseDragonBonesData(this._pixiResources["/resource/bounding_box_tester/bounding_box_tester_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["/resource/bounding_box_tester/bounding_box_tester_tex.json"].data, this._pixiResources["/resource/bounding_box_tester/bounding_box_tester_tex.png"].texture);
        //
        this._armatureDisplay = factory.buildArmatureDisplay("mecha_2903d");
        this._boundingBoxTester = factory.buildArmatureDisplay("tester");

        if (this._boundingBoxTester === null) {
            throw new Error(`this._boundingBoxTester is null.`);
        }

        this._targetA = this._boundingBoxTester.armature.getSlot("target_a")?.display;
        this._targetB = this._boundingBoxTester.armature.getSlot("target_b")?.display;
        this._line = this._boundingBoxTester.armature.getBone("line");
        this._pointA = this._boundingBoxTester.armature.getBone("point_a");
        this._pointB = this._boundingBoxTester.armature.getBone("point_b");

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        if (this._targetA === null) {
            throw new Error(`this._targetA is null.`);
        }

        if (this._targetB === null) {
            throw new Error(`this._targetB is null.`);
        }

        if (this._line === null) {
            throw new Error(`this._line is null.`);
        }

        if (this._pointA === null) {
            throw new Error(`this._pointA is null.`);
        }

        if (this._pointB === null) {
            throw new Error(`this._pointB is null.`);
        }

        //
        this._armatureDisplay.debugDraw = true;
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 100.0;
        this._boundingBoxTester.x = 0.0;
        this._boundingBoxTester.y = 200.0;
        this._targetA.armature.inheritAnimation = false;
        this._targetB.armature.inheritAnimation = false;
        this._line.offsetMode = OffsetMode.Override;
        this._pointA.offsetMode = OffsetMode.Override;
        this._pointB.offsetMode = OffsetMode.Override;
        this._armatureDisplay.animation.play("walk");
        this._boundingBoxTester.animation.play("0");
        //
        this.addChild(this._armatureDisplay);
        this.addChild(this._boundingBoxTester);
        //
        this.interactive = true;
        DragHelper.getInstance().stage = this;
        DragHelper.getInstance().enableDrag(this._targetA);
        DragHelper.getInstance().enableDrag(this._targetB);
        //
        this.createText("Touch to drag bounding box tester.");
    }

    private _enterFrameHandler(deltaTime: number): void { // Make sure game update before dragonBones update.
        if (this._targetA === null) {
            throw new Error(`this._targetA is null.`);
        }

        if (this._targetB === null) {
            throw new Error(`this._targetB is null.`);
        }

        if (this._armatureDisplay === null) {
            throw new Error(`this._armatureDisplay is null.`);
        }

        if (this._boundingBoxTester === null) {
            throw new Error(`this._boundingBoxTester is null.`);
        }

        this._helpPointA.set(this._targetA.x, this._targetA.y);
        this._helpPointB.set(this._targetB.x, this._targetB.y);
        this._armatureDisplay.toLocal(this._helpPointA, this._boundingBoxTester, this._helpPointA);
        this._armatureDisplay.toLocal(this._helpPointB, this._boundingBoxTester, this._helpPointB);

        const containsSlotA = this._armatureDisplay.armature.containsPoint(this._helpPointA.x, this._helpPointA.y);
        const containsSlotB = this._armatureDisplay.armature.containsPoint(this._helpPointB.x, this._helpPointB.y);
        const intersectsSlots = this._armatureDisplay.armature.intersectsSegment(this._helpPointA.x, this._helpPointA.y, this._helpPointB.x, this._helpPointB.y, this._helpPointA, this._helpPointB, this._helpPointC);

        {
            const animationName = containsSlotA ? "1" : "0";
            if (this._targetA.animation.lastAnimationName !== animationName) {

                const fade = this._targetA.animation.fadeIn(animationName, 0.2);

                if (fade === null) {
                    throw new Error(`fade is null.`);
                }

                fade.resetToPose = false;
            }
        }

        {
            const animationName = containsSlotB ? "1" : "0";
            if (this._targetB.animation.lastAnimationName !== animationName) {
                const fade = this._targetB.animation.fadeIn(animationName, 0.2);

                if (fade === null) {
                    throw new Error(`fade is null.`);
                }

                fade.resetToPose = false;
            }
        }

        {
            const targetA = this._targetA.armature.parent?.parent ?? null;
            const targetB = this._targetB.armature.parent?.parent ?? null;

            if (targetB === null) {
                throw new Error(`targetB is null.`);
            }

            if (targetA === null) {
                throw new Error(`targetA is null.`);
            }

            const dX = targetB.global.x - targetA.global.x;
            const dY = targetB.global.y - targetA.global.y;

            if (this._line === null) {
                throw new Error(`this._line is null.`);
            }

            this._line.offset.x = targetA.global.x;
            this._line.offset.y = targetA.global.y;
            this._line.offset.scaleX = Math.sqrt(dX * dX + dY * dY) / 100.0;
            this._line.offset.rotation = Math.atan2(dY, dX);
            this._line.invalidUpdate();

            const animationName = intersectsSlots ? "1" : "0";
            if (this._boundingBoxTester.animation.lastAnimationName !== animationName) {
                const fade = this._boundingBoxTester.animation.fadeIn(animationName, 0.2);
                if (fade === null) {
                    throw new Error(`fade is null.`);
                }

                fade.resetToPose = false;
            }

            if (intersectsSlots) {
                this._boundingBoxTester.toLocal(this._helpPointA, this._armatureDisplay, this._helpPointA);
                this._boundingBoxTester.toLocal(this._helpPointB, this._armatureDisplay, this._helpPointB);

                if (this._pointA === null) {
                    throw new Error(`this._pointA is null.`);
                }

                if (this._pointB === null) {
                    throw new Error(`this._pointB is null.`);
                }

                this._pointA.visible = true;
                this._pointB.visible = true;
                this._pointA.offset.x = this._helpPointA.x;
                this._pointA.offset.y = this._helpPointA.y;
                this._pointB.offset.x = this._helpPointB.x;
                this._pointB.offset.y = this._helpPointB.y;
                this._pointA.offset.rotation = this._helpPointC.x;
                this._pointB.offset.rotation = this._helpPointC.y;
                this._pointA.invalidUpdate();
                this._pointB.invalidUpdate();
            }
            else {
                if (this._pointA === null) {
                    throw new Error(`this._pointA is null.`);
                }

                if (this._pointB === null) {
                    throw new Error(`this._pointB is null.`);
                }

                this._pointA.visible = false;
                this._pointB.visible = false;
            }
        }
    }
}

const _ = new BoundingBox();
