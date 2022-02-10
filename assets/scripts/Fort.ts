// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Fort extends cc.Component {
    @property(cc.Node)
    gunbarrel: cc.Node = null;

    @property(cc.Node)
    bulletPoint: cc.Node = null;

    private aimPos: cc.Vec2 = cc.v2();
    aimAt(pos: cc.Vec2) {
        var dir = pos.sub(this.node.getPosition());
        var angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI
        this.gunbarrel.angle = angle - 90;

        // this.node.getParent().convertToNodeSpaceAR(pos, this.aimPos);
        // var currPos = this.node.getPosition();
        // var dirVec = this.aimPos.sub(currPos);

        // //计算方向向量和y轴的夹角
        // var comVec = new cc.Vec2(0, 1);
        // var radian = dirVec.signAngle(comVec);
        // var angle = -(radian * 180 / Math.PI);

        // // 将角度限制在-85 到85之间
        // angle = cc.misc.clampf(angle, -85, 85);
        // this.gunbarrel.angle = angle;

        return this.bulletPoint.convertToWorldSpaceAR(cc.Vec2.ZERO);
    }

    getAngle() {
        return this.gunbarrel.angle + 90;
    }
}
