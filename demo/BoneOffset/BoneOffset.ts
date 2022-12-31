import { EventObject } from "@flyskypie/dragonbones-js";

import { PixiArmatureDisplay, PixiFactory } from "@dragonbones-pixi";

import skeJson from '../resource/bullet_01/bullet_01_ske.json?url';
import texJson from '../resource/bullet_01/bullet_01_tex.json?url';
import texPng from '../resource/bullet_01/bullet_01_tex.png';

import { BaseDemo } from "../BaseDemo";

class BoneOffset extends BaseDemo {
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
        factory.parseDragonBonesData(this._pixiResources[skeJson].data);
        factory.parseTextureAtlasData(this._pixiResources[texJson].data, this._pixiResources[texPng].texture);

        for (let i = 0; i < 100; ++i) {
            const armatureDisplay = factory.buildArmatureDisplay("bullet_01");

            if (armatureDisplay === null) {
                throw new Error(`armatureDisplay is null.`);
            }

            armatureDisplay.on(EventObject.COMPLETE, this._animationHandler, this);
            armatureDisplay.x = 0.0;
            armatureDisplay.y = 0.0;
            this.addChild(armatureDisplay);
            //
            this._moveTo(armatureDisplay);
        }
    }

    private _animationHandler(event: EventObject): void {
        if (event.armature === null) {
            throw new Error(`event.armature is null.`);
        }
        this._moveTo(event.armature.display);
    }

    private _moveTo(armatureDisplay: PixiArmatureDisplay): void {
        const fromX = armatureDisplay.x;
        const fromY = armatureDisplay.y;
        const toX = Math.random() * this.stageWidth - this.stageWidth * 0.5;
        const toY = Math.random() * this.stageHeight - this.stageHeight * 0.5;
        const dX = toX - fromX;
        const dY = toY - fromY;
        const rootSlot = armatureDisplay.armature.getBone("root");
        const bulletSlot = armatureDisplay.armature.getBone("bullet");

        if (rootSlot === null) {
            throw new Error(`rootSlot is null.`);
        }

        if (bulletSlot === null) {
            throw new Error(`bulletSlot is null.`);
        }

        // Modify root and bullet bone offset.
        rootSlot.offset.scaleX = Math.sqrt(dX * dX + dY * dY) / 100; // Bullet translate distance is 100 px.
        rootSlot.offset.rotation = Math.atan2(dY, dX);
        rootSlot.offset.skew = Math.random() * Math.PI - Math.PI * 0.5; // Random skew.
        bulletSlot.offset.scaleX = 0.5 + Math.random() * 0.5; // Random scale.
        bulletSlot.offset.scaleY = 0.5 + Math.random() * 0.5;
        // Update root and bullet bone.
        rootSlot.invalidUpdate();
        bulletSlot.invalidUpdate();
        //
        armatureDisplay.animation.timeScale = 0.5 + Math.random() * 1.0; // Random animation speed.
        armatureDisplay.animation.play("idle", 1);
    }
}

new BoneOffset();
