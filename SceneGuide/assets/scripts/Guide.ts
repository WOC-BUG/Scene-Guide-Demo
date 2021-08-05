// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Guide extends cc.Component {

    @property(cc.Node)
    mask: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    block: cc.Node = null;

    @property(cc.Node)
    loadingPanel: cc.Node = null;

    public static sceneName: string = null;
    deepth: number = 10;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Guide.sceneName = cc.director.getScene().name;
        this.node.children.some((value) => {
            if (value.name == "guide0") {
                this.guide(value);
                return true;
            }
        });
    }

    start() {
        console.log("1");
        setTimeout(() => {
            console.log("2");
        }, 0);
        new Promise((resolve, reject) => { resolve("3") }).then((data) => {
            console.log(data);
            console.log("4");
        }).then(() => {
            console.log("5");
        }).catch(() => {
            console.log("出现异常");
        })
        console.log("6");
    }

    onClick(e) {
        if (e.target.children[0] != null && e.target.children[0].children[0].getComponent(cc.Label).string == "Next") {
            if (Guide.sceneName == "Scene3") {
                cc.director.end();
                cc.game.end();
            }
            this.loadingPanel.setSiblingIndex(this.deepth);
            this.loadingPanel.active = true;
        }
        let targetName = e.target.name; // 当前名字
        let nextNumber: number = Number(targetName.substr(5, targetName.length)) + 1; // 下一个编号
        this.node.children.some((value) => {
            if (value.name == "guide" + nextNumber.toString()) {
                this.guide(value);
                return true;
            }
        });
    }

    // update (dt) {}
    guide(node: cc.Node) {
        this.block.setSiblingIndex(this.deepth); //  禁止操控面板
        node.setSiblingIndex(this.deepth);
        this.block.active = true;

        if (node.getComponent(cc.Sprite) != null) {    // Sprite
            console.log("sprite!");
            this.mask.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
            this.mask.getComponent(cc.Mask).alphaThreshold = 0.4;
            this.mask.getComponent(cc.Mask).spriteFrame = node.getComponent(cc.Sprite).spriteFrame;
        }
        else if (node.getComponent(cc.Button) != null) {  // Button
            console.log("button!");
            // console.log(node.children[0].children[0].getComponent(cc.Label));
            this.mask.getComponent(cc.Mask).type = cc.Mask.Type.RECT;
        }

        this.mask.width = node.width * 10;
        this.mask.height = node.height * 10;
        let pos = this.mask.parent.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        this.mask.setPosition(pos);
        this.bg.setPosition(-this.mask.position.x, -this.mask.position.y);
        cc.tween(this.mask)
            .to(1, { width: node.width, height: node.height }, { easing: "sineIn" })
            .call(() => {
                this.deepth++;
            })
            .start();
    }
}
