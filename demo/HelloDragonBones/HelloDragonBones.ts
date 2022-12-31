import { PixiFactory } from "@dragonbones-pixi";

import mechaSkeData from '../resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.dbbin?url';
import mechaTexJson from '../resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.json?url';
import mechaTexPng from '../resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.png';

import { BaseDemo } from "../BaseDemo";

/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */
class HelloDragonBones extends BaseDemo {
    public constructor() {
        super();

        this._resources.push(
            // "/resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json",
            mechaSkeData,
            mechaTexJson,
            mechaTexPng
        );
    }

    protected _onStart(): void {
        const factory = PixiFactory.factory;
        // factory.parseDragonBonesData(this._pixiResource["/resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json"].data);
        factory.parseDragonBonesData(this._pixiResources[mechaSkeData].data);
        factory.parseTextureAtlasData(this._pixiResources[mechaTexJson].data, this._pixiResources[mechaTexPng].texture);

        const armatureDisplay = factory.buildArmatureDisplay("mecha_1002_101d", "mecha_1002_101d_show");

        if (armatureDisplay === null) {
            throw new Error(`armatureDisplay is null.`);
        }

        armatureDisplay.animation.play("idle");

        armatureDisplay.x = 0.0;
        armatureDisplay.y = 200.0;
        this.addChild(armatureDisplay);
    }
}

new HelloDragonBones();
