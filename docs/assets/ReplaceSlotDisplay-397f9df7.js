var w=Object.defineProperty;var x=(o,a,t)=>a in o?w(o,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[a]=t;var s=(o,a,t)=>(x(o,typeof a!="symbol"?a+"":a,t),t);import{B as m,P as d,l as y}from"./BaseDemo-21616005.js";const n=""+new URL("mecha_1004d_show_ske-9e26e72d.json",import.meta.url).href,h=""+new URL("mecha_1004d_show_tex-73bc516b.json",import.meta.url).href,_=""+new URL("mecha_1004d_show_tex-d5bf47dd.png",import.meta.url).href,p=""+new URL("weapon_1004_show_ske-0aea6725.json",import.meta.url).href,u=""+new URL("weapon_1004_show_tex-7bb305ee.json",import.meta.url).href,c=""+new URL("weapon_1004_show_tex-b0b2568f.png",import.meta.url).href,l=class extends m{constructor(){super();s(this,"_leftWeaponIndex",0);s(this,"_rightWeaponIndex",0);s(this,"_factory",d.factory);s(this,"_armatureDisplay",null);s(this,"_logoText",null);this._resources.push(n,h,_,p,u,c)}_onStart(){if(this._factory.parseDragonBonesData(this._pixiResources[n].data),this._factory.parseTextureAtlasData(this._pixiResources[h].data,this._pixiResources[_].texture),this._factory.parseDragonBonesData(this._pixiResources[p].data),this._factory.parseTextureAtlasData(this._pixiResources[u].data,this._pixiResources[c].texture),this._armatureDisplay=this._factory.buildArmatureDisplay("mecha_1004d"),this._armatureDisplay===null)throw new Error("this._armatureDisplay is null.");this._armatureDisplay.animation.play(),this._armatureDisplay.x=100,this._armatureDisplay.y=200,this.addChild(this._armatureDisplay),this.interactive=!0;const t=e=>{const r=e.data.global.x-this.x;r<-150?this._replaceDisplay(-1):r>150?this._replaceDisplay(1):this._replaceDisplay(0)};this.addListener("touchstart",t,this),this.addListener("mousedown",t,this),this.createText("Touch screen left / center / right to relace slot display.")}_replaceDisplay(t){if(this._armatureDisplay===null)throw new Error("this._armatureDisplay is null.");if(t===-1){this._rightWeaponIndex++,this._rightWeaponIndex%=l.WEAPON_RIGHT_LIST.length;const e=l.WEAPON_RIGHT_LIST[this._rightWeaponIndex];if(this._armatureDisplay===null)throw new Error("this._armatureDisplay is null.");const r=this._armatureDisplay.armature.getSlot("weapon_hand_r");if(r===null)throw new Error("solot is null.");this._factory.replaceSlotDisplay("weapon_1004_show","weapon","weapon_r",e,r)}else if(t===1){this._leftWeaponIndex++,this._leftWeaponIndex%=5;const e=this._armatureDisplay.armature.getSlot("weapon_hand_l");if(e===null)throw new Error("slot is null.");e.displayIndex=this._leftWeaponIndex}else{const e=this._armatureDisplay.armature.getSlot("logo");if(e===null)throw new Error("logoSlot is null.");e.display===this._logoText?e.display=e.rawDisplay:(this._logoText||(this._logoText=new y.Text,this._logoText.text="Core Element",this._logoText.pivot.x=this._logoText.width*.5,this._logoText.pivot.y=this._logoText.height*.5),e.display=this._logoText)}}};let i=l;s(i,"WEAPON_RIGHT_LIST",["weapon_1004_r","weapon_1004b_r","weapon_1004c_r","weapon_1004d_r","weapon_1004e_r"]);new i;