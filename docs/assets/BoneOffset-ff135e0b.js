import{B as d,P as m,L as f}from"./BaseDemo-21616005.js";const i=""+new URL("bullet_01_ske-baaba9dc.json",import.meta.url).href,l=""+new URL("bullet_01_tex-3a5f21ad.json",import.meta.url).href,h=""+new URL("bullet_01_tex-1d96f443.png",import.meta.url).href;class _ extends d{constructor(){super(),this._resources.push(i,l,h)}_onStart(){const t=m.factory;t.parseDragonBonesData(this._pixiResources[i].data),t.parseTextureAtlasData(this._pixiResources[l].data,this._pixiResources[h].texture);for(let a=0;a<100;++a){const o=t.buildArmatureDisplay("bullet_01");if(o===null)throw new Error("armatureDisplay is null.");o.on(f.COMPLETE,this._animationHandler,this),o.x=0,o.y=0,this.addChild(o),this._moveTo(o)}}_animationHandler(t){if(t.armature===null)throw new Error("event.armature is null.");this._moveTo(t.armature.display)}_moveTo(t){const a=t.x,o=t.y,u=Math.random()*this.stageWidth-this.stageWidth*.5,c=Math.random()*this.stageHeight-this.stageHeight*.5,r=u-a,n=c-o,e=t.armature.getBone("root"),s=t.armature.getBone("bullet");if(e===null)throw new Error("rootSlot is null.");if(s===null)throw new Error("bulletSlot is null.");e.offset.scaleX=Math.sqrt(r*r+n*n)/100,e.offset.rotation=Math.atan2(n,r),e.offset.skew=Math.random()*Math.PI-Math.PI*.5,s.offset.scaleX=.5+Math.random()*.5,s.offset.scaleY=.5+Math.random()*.5,e.invalidUpdate(),s.invalidUpdate(),t.animation.timeScale=.5+Math.random()*1,t.animation.play("idle",1)}}new _;
