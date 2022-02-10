// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Bullet from "./bullet";
import Fort from "./Fort";

const { ccclass, property } = cc._decorator;

@ccclass
export default class main extends cc.Component {

    @property(Fort)
    fort: Fort = null;

    @property(cc.Node)
    bulletLayer: cc.Node = null;

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    private bullets: Bullet[] = [];

    private bullet:cc.Node =null;

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    private touchEnd(event: cc.Event.EventTouch) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var bulletPos = this.fort.aimAt(pos);
        this.createBullet(bulletPos);
    }

    private createBullet(pos: cc.Vec2) {
        var bulletObj = cc.instantiate(this.bulletPrefab);
        bulletObj.setParent(this.bulletLayer);
        pos = this.bulletLayer.convertToNodeSpaceAR(pos);
        bulletObj.setPosition(pos)
        var angle = this.fort.getAngle();
        bulletObj.angle = angle;
        var bullet = bulletObj.getComponent(Bullet);
        bullet.init(angle);
        this.bullets.push(bullet);
    }

    protected update(dt: number): void {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move();
        }
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }
}
