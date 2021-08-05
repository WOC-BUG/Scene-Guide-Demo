import Guide from "./Guide";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PreLoad extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    progressBarLabel: cc.Label = null;

    onLoad() {
        this.preloadPanel();
    }

    preloadPanel() {
        let NextScene: string = Guide.sceneName.substr(0, 5) + (Number(Guide.sceneName.substr(5, 6)) + 1).toString();
        console.log(NextScene);
        this.progressBar.node.active = true;
        let onProgress = (completeCount, totalCount, item) => {
            let progress = completeCount / totalCount;
            this.progressBar.progress = progress;
            this.progressBarLabel.string = Math.floor(progress * 100).toString() + "%";
        }
        cc.director.preloadScene(NextScene, onProgress, () => {
            cc.director.loadScene(NextScene);
        });
    }
}