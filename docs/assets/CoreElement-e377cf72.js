var I=Object.defineProperty;var M=(o,t,a)=>t in o?I(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a;var e=(o,t,a)=>(M(o,typeof t!="symbol"?t+"":t,a),a);import{P as l,l as m,L as h,B as x}from"./BaseDemo-21616005.js";const y=""+new URL("mecha_1502b_ske-58e311cc.json",import.meta.url).href,D=""+new URL("mecha_1502b_tex-8163604e.json",import.meta.url).href,A=""+new URL("mecha_1502b_tex-96620c26.png",import.meta.url).href,E=""+new URL("skin_1502b_ske-1acd8961.json",import.meta.url).href,w=""+new URL("skin_1502b_tex-e59c31bd.json",import.meta.url).href,R=""+new URL("skin_1502b_tex-377ae6f0.png",import.meta.url).href,O=""+new URL("weapon_1000_ske-9752e628.json",import.meta.url).href,P=""+new URL("weapon_1000_tex-0ae3e0b6.json",import.meta.url).href,k=""+new URL("weapon_1000_tex-d59bb81f.png",import.meta.url).href;class S{constructor(t,a,r,p,u){e(this,"_speedX",0);e(this,"_speedY",0);e(this,"_armatureDisplay");e(this,"_effecDisplay",null);if(this._speedX=Math.cos(r)*p,this._speedY=Math.sin(r)*p,this._armatureDisplay=l.factory.buildArmatureDisplay(t),this._armatureDisplay.x=u.x+Math.random()*2-1,this._armatureDisplay.y=u.y+Math.random()*2-1,this._armatureDisplay.rotation=r,a!==null){if(this._effecDisplay=l.factory.buildArmatureDisplay(a),this._effecDisplay===null)throw new Error("this._effecDisplay is null.");this._effecDisplay.rotation=r,this._effecDisplay.x=this._armatureDisplay.x,this._effecDisplay.y=this._armatureDisplay.y,this._effecDisplay.scale.x=1+Math.random()*1,this._effecDisplay.scale.y=1+Math.random()*.5,Math.random()<.5&&(this._effecDisplay.scale.y*=-1),s.instance.addChild(this._effecDisplay),this._effecDisplay.animation.play("idle")}s.instance.addChild(this._armatureDisplay),this._armatureDisplay.animation.play("idle")}update(){return this._armatureDisplay.x+=this._speedX,this._armatureDisplay.y+=this._speedY,this._armatureDisplay.x<-s.instance.stageWidth*.5-100||this._armatureDisplay.x>s.instance.stageWidth*.5+100||this._armatureDisplay.y<-s.instance.stageHeight*.5-100||this._armatureDisplay.y>s.instance.stageHeight*.5+100?(s.instance.removeChild(this._armatureDisplay),this._armatureDisplay.dispose(),this._effecDisplay!==null&&(s.instance.removeChild(this._effecDisplay),this._effecDisplay.dispose()),!0):!1}}const i=class{constructor(){e(this,"_isJumpingA",!1);e(this,"_isSquating",!1);e(this,"_isAttackingA",!1);e(this,"_isAttackingB",!1);e(this,"_weaponRIndex",0);e(this,"_weaponLIndex",0);e(this,"_skinIndex",0);e(this,"_faceDir",1);e(this,"_aimDir",0);e(this,"_moveDir",0);e(this,"_aimRadian",0);e(this,"_speedX",0);e(this,"_speedY",0);e(this,"_armature",null);e(this,"_armatureDisplay",null);e(this,"_weaponL",null);e(this,"_weaponR",null);e(this,"_aimState",null);e(this,"_walkState",null);e(this,"_attackState",null);e(this,"_target",new m.Point);e(this,"_helpPoint",new m.Point);var t,a;if(this._armatureDisplay=l.factory.buildArmatureDisplay("mecha_1502b"),this._armatureDisplay===null)throw new Error("this._armatureDisplay is null.");if(this._armatureDisplay.x=0,this._armatureDisplay.y=s.GROUND,this._armature=this._armatureDisplay.armature,this._armatureDisplay.on(h.FADE_IN_COMPLETE,this._animationEventHandler,this),this._armatureDisplay.on(h.FADE_OUT_COMPLETE,this._animationEventHandler,this),this._armatureDisplay.on(h.COMPLETE,this._animationEventHandler,this),this._weaponL=((t=this._armature.getSlot("weapon_l"))==null?void 0:t.childArmature)??null,this._weaponR=((a=this._armature.getSlot("weapon_r"))==null?void 0:a.childArmature)??null,this._weaponL===null)throw new Error("this._weaponL is null.");if(this._weaponR===null)throw new Error("this._weaponR is null.");this._weaponL.display.on(h.FRAME_EVENT,this._frameEventHandler,this),this._weaponR.display.on(h.FRAME_EVENT,this._frameEventHandler,this),s.instance.addChild(this._armatureDisplay),this._updateAnimation()}move(t){this._moveDir!==t&&(this._moveDir=t,this._updateAnimation())}jump(){if(!this._isJumpingA){if(this._armature===null)throw new Error("this._armature is null.");this._isJumpingA=!0,this._armature.animation.fadeIn("jump_1",-1,-1,0,i.NORMAL_ANIMATION_GROUP).resetToPose=!1,this._walkState=null}}squat(t){this._isSquating!==t&&(this._isSquating=t,this._updateAnimation())}attack(t){this._isAttackingA!==t&&(this._isAttackingA=t)}switchWeaponL(){this._weaponL.display.off(h.FRAME_EVENT,this._frameEventHandler,this),this._weaponLIndex++,this._weaponLIndex%=i.WEAPON_L_LIST.length;const t=i.WEAPON_L_LIST[this._weaponLIndex];this._weaponL=l.factory.buildArmature(t),this._armature.getSlot("weapon_l").childArmature=this._weaponL,this._weaponL.display.off(h.FRAME_EVENT,this._frameEventHandler,this)}switchWeaponR(){this._weaponR.display.off(h.FRAME_EVENT,this._frameEventHandler,this),this._weaponRIndex++,this._weaponRIndex%=i.WEAPON_R_LIST.length;const t=i.WEAPON_R_LIST[this._weaponRIndex];this._weaponR=l.factory.buildArmature(t),this._armature.getSlot("weapon_r").childArmature=this._weaponR,this._weaponR.display.on(h.FRAME_EVENT,this._frameEventHandler,this)}switchSkin(){this._skinIndex++,this._skinIndex%=i.SKINS.length;const t=i.SKINS[this._skinIndex],a=l.factory.getArmatureData(t).defaultSkin;l.factory.replaceSkin(this._armature,a,!1,["weapon_l","weapon_r"])}aim(t,a){this._target.x=t,this._target.y=a}update(){this._updatePosition(),this._updateAim(),this._updateAttack()}_animationEventHandler(t){switch(t.type){case h.FADE_IN_COMPLETE:t.animationState.name==="jump_1"&&(this._speedY=-i.JUMP_SPEED,this._moveDir!==0&&(this._moveDir*this._faceDir>0?this._speedX=i.MAX_MOVE_SPEED_FRONT*this._faceDir:this._speedX=-i.MAX_MOVE_SPEED_BACK*this._faceDir),this._armature.animation.fadeIn("jump_2",-1,-1,0,i.NORMAL_ANIMATION_GROUP).resetToPose=!1);break;case h.FADE_OUT_COMPLETE:t.animationState.name==="attack_01"&&(this._isAttackingB=!1,this._attackState=null);break;case h.COMPLETE:t.animationState.name==="jump_4"&&(this._isJumpingA=!1,this._updateAnimation());break}}_frameEventHandler(t){t.name==="fire"&&(this._helpPoint.x=t.bone.global.x,this._helpPoint.y=t.bone.global.y,t.armature.display.toGlobal(this._helpPoint,this._helpPoint),this._helpPoint.x-=s.instance.x,this._helpPoint.y-=s.instance.y,this._fire(this._helpPoint))}_fire(t){const a=this._faceDir<0?Math.PI-this._aimRadian:this._aimRadian,r=new S("bullet_01","fire_effect_01",a+Math.random()*.02-.01,40,t);s.instance.addBullet(r)}_updateAnimation(){if(!this._isJumpingA){if(this._isSquating){this._speedX=0,this._armature.animation.fadeIn("squat",-1,-1,0,i.NORMAL_ANIMATION_GROUP).resetToPose=!1,this._walkState=null;return}this._moveDir===0?(this._speedX=0,this._armature.animation.fadeIn("idle",-1,-1,0,i.NORMAL_ANIMATION_GROUP).resetToPose=!1,this._walkState=null):(this._walkState===null&&(this._walkState=this._armature.animation.fadeIn("walk",-1,-1,0,i.NORMAL_ANIMATION_GROUP),this._walkState.resetToPose=!1),this._moveDir*this._faceDir>0?this._walkState.timeScale=i.MAX_MOVE_SPEED_FRONT/i.NORMALIZE_MOVE_SPEED:this._walkState.timeScale=-i.MAX_MOVE_SPEED_BACK/i.NORMALIZE_MOVE_SPEED,this._moveDir*this._faceDir>0?this._speedX=i.MAX_MOVE_SPEED_FRONT*this._faceDir:this._speedX=-i.MAX_MOVE_SPEED_BACK*this._faceDir)}}_updatePosition(){this._speedX!==0&&(this._armatureDisplay.x+=this._speedX,this._armatureDisplay.x<-s.instance.stageWidth*.5?this._armatureDisplay.x=-s.instance.stageWidth*.5:this._armatureDisplay.x>s.instance.stageWidth*.5&&(this._armatureDisplay.x=s.instance.stageWidth*.5)),this._speedY!==0&&(this._speedY<5&&this._speedY+s.G>=5&&(this._armature.animation.fadeIn("jump_3",-1,-1,0,i.NORMAL_ANIMATION_GROUP).resetToPose=!1),this._speedY+=s.G,this._armatureDisplay.y+=this._speedY,this._armatureDisplay.y>s.GROUND&&(this._armatureDisplay.y=s.GROUND,this._speedY=0,this._armature.animation.fadeIn("jump_4",-1,-1,0,i.NORMAL_ANIMATION_GROUP).resetToPose=!1))}_updateAim(){this._faceDir=this._target.x>this._armatureDisplay.x?1:-1,this._armatureDisplay.armature.flipX!==this._faceDir<0&&(this._armatureDisplay.armature.flipX=!this._armatureDisplay.armature.flipX,this._moveDir!==0&&this._updateAnimation());const t=this._armature.getBone("chest").global.y*this._armatureDisplay.scale.y;this._faceDir>0?this._aimRadian=Math.atan2(this._target.y-this._armatureDisplay.y-t,this._target.x-this._armatureDisplay.x):(this._aimRadian=Math.PI-Math.atan2(this._target.y-this._armatureDisplay.y-t,this._target.x-this._armatureDisplay.x),this._aimRadian>Math.PI&&(this._aimRadian-=Math.PI*2));let a=0;this._aimRadian>0?a=-1:a=1,(this._aimState===null||this._aimDir!==a)&&(this._aimDir=a,this._aimDir>=0?this._aimState=this._armature.animation.fadeIn("aim_up",-1,-1,0,i.AIM_ANIMATION_GROUP):this._aimState=this._armature.animation.fadeIn("aim_down",-1,-1,0,i.AIM_ANIMATION_GROUP),this._aimState.resetToPose=!1),this._aimState.weight=Math.abs(this._aimRadian/Math.PI*2),this._armature.invalidUpdate()}_updateAttack(){!this._isAttackingA||this._isAttackingB||(this._isAttackingB=!0,this._attackState=this._armature.animation.fadeIn("attack_01",-1,-1,0,i.ATTACK_ANIMATION_GROUP),this._attackState.resetToPose=!1,this._attackState.autoFadeOutTime=.1)}};let n=i;e(n,"JUMP_SPEED",20),e(n,"NORMALIZE_MOVE_SPEED",3.6),e(n,"MAX_MOVE_SPEED_FRONT",i.NORMALIZE_MOVE_SPEED*1.4),e(n,"MAX_MOVE_SPEED_BACK",i.NORMALIZE_MOVE_SPEED*1),e(n,"NORMAL_ANIMATION_GROUP","normal"),e(n,"AIM_ANIMATION_GROUP","aim"),e(n,"ATTACK_ANIMATION_GROUP","attack"),e(n,"WEAPON_L_LIST",["weapon_1502b_l","weapon_1005","weapon_1005b","weapon_1005c","weapon_1005d","weapon_1005e"]),e(n,"WEAPON_R_LIST",["weapon_1502b_r","weapon_1005","weapon_1005b","weapon_1005c","weapon_1005d"]),e(n,"SKINS",["mecha_1502b","skin_a","skin_b","skin_c"]);const _=class extends x{constructor(){super();e(this,"_left",!1);e(this,"_right",!1);e(this,"_player",null);e(this,"_bullets",[]);this._resources.push(y,D,A,E,w,R,O,P,k)}_onStart(){_.GROUND=this.stageHeight*.5-150,_.instance=this,this.interactive=!0,this.addListener("touchstart",this._touchHandler,this),this.addListener("touchend",this._touchHandler,this),this.addListener("touchmove",this._touchHandler,this),this.addListener("mousedown",this._touchHandler,this),this.addListener("mouseup",this._touchHandler,this),this.addListener("mousemove",this._touchHandler,this),m.ticker.shared.add(this._enterFrameHandler,this),document.addEventListener("keydown",this._keyHandler),document.addEventListener("keyup",this._keyHandler),this.createText("Press W/A/S/D to move. Press Q/E/SPACE to switch weapons and skin. Touch to aim and fire.");const a=l.factory;a.parseDragonBonesData(this._pixiResources[y].data),a.parseTextureAtlasData(this._pixiResources[D].data,this._pixiResources[A].texture),a.parseDragonBonesData(this._pixiResources[E].data),a.parseTextureAtlasData(this._pixiResources[w].data,this._pixiResources[R].texture),a.parseDragonBonesData(this._pixiResources[O].data),a.parseTextureAtlasData(this._pixiResources[P].data,this._pixiResources[k].texture),this._player=new n}_touchHandler(a){if(this._player===null)throw new Error("this._player is null.");this._player.aim(a.data.global.x-this.x,a.data.global.y-this.y),a.type==="touchstart"||a.type==="mousedown"?this._player.attack(!0):(a.type==="touchend"||a.type==="mouseup")&&this._player.attack(!1)}_keyHandler(a){var p,u,c,d,f;const r=a.type==="keydown";switch(a.keyCode){case 37:case 65:_.instance._left=r,_.instance._updateMove(-1);break;case 39:case 68:_.instance._right=r,_.instance._updateMove(1);break;case 38:case 87:r&&((p=_.instance._player)==null||p.jump());break;case 83:case 40:(u=_.instance._player)==null||u.squat(r);break;case 81:r&&((c=_.instance._player)==null||c.switchWeaponR());break;case 69:r&&((d=_.instance._player)==null||d.switchWeaponL());break;case 32:r&&((f=_.instance._player)==null||f.switchSkin());break}}_enterFrameHandler(a){this._player&&this._player.update();let r=this._bullets.length;for(;r--;)this._bullets[r].update()&&this._bullets.splice(r,1)}_updateMove(a){if(this._player===null)throw new Error("this._player is null.");this._left&&this._right?this._player.move(a):this._left?this._player.move(-1):this._right?this._player.move(1):this._player.move(0)}addBullet(a){this._bullets.push(a)}};let s=_;e(s,"GROUND"),e(s,"G",.6),e(s,"instance");new s;