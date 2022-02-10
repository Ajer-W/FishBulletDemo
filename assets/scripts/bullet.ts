// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    private currSpeed: number = 20;
    private currentAngel: number;
    private speedX: number;
    private speedY: number;

    init(angle: number) {
        this.currentAngel = angle;
        var radian = this.currentAngel * Math.PI / 180;
        this.speedX = Math.cos(radian) * this.currSpeed;
        this.speedY = Math.sin(radian) * this.currSpeed;
    }

    move(): void {
        this.borderRebound();
        var pos = cc.v2(this.node.x + this.speedX, this.node.y + this.speedY);
        this.node.setPosition(pos);
        this.node.angle = this.currentAngel;
    }

    /**
     * 计算角度
    */
    private caculateRotation() {
        var radian = Math.atan2(this.speedY, this.speedX)
        var angle = radian * 180 / Math.PI;
        return angle
    }

    private borderRebound() {
        var worldPos = this.node.getPosition();
        var isborder: boolean = false;
        if (worldPos.x < 0 || worldPos.x > cc.winSize.width) {
            this.currentAngel = -this.currentAngel + 180;
            this.node.angle = this.currentAngel;
            if (worldPos.x < 0) {
                worldPos.x = 0;
            }
            else if (worldPos.x > cc.winSize.width) {
                worldPos.x = cc.winSize.width;
            }
            this.speedX = -this.speedX;
            isborder = true;
        }
        if (worldPos.y < 0 || worldPos.y > cc.winSize.height) {
            this.currentAngel = -this.currentAngel;
            this.node.angle = this.currentAngel;
            if (worldPos.y < 0) {
                worldPos.y = 0;
            }
            else if (worldPos.y > cc.winSize.height) {
                worldPos.y = cc.winSize.height;
            }
            this.speedY = -this.speedY;
            isborder = true;
        }

        if (isborder) {
            this.node.setPosition(worldPos);
            // this.currentAngel = this.caculate_bullet_rotation(this.speedY, this.speedX);
        }
    }
}
