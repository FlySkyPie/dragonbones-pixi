import{B as o,P as i}from"./BaseDemo-21616005.js";const s=""+new URL("mecha_1002_101d_show_ske-8774bf25.dbbin",import.meta.url).href,t=""+new URL("mecha_1002_101d_show_tex-9132c2e7.json",import.meta.url).href,r=""+new URL("mecha_1002_101d_show_tex-b49adc42.png",import.meta.url).href;class n extends o{constructor(){super(),this._resources.push(s,t,r)}_onStart(){const a=i.factory;a.parseDragonBonesData(this._pixiResources[s].data),a.parseTextureAtlasData(this._pixiResources[t].data,this._pixiResources[r].texture);const e=a.buildArmatureDisplay("mecha_1002_101d","mecha_1002_101d_show");if(e===null)throw new Error("armatureDisplay is null.");e.animation.play("idle"),e.x=0,e.y=200,this.addChild(e)}}new n;