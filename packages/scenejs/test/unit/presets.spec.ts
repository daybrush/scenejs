import Scene, { animate, animateItem, SceneItem, EASE_IN } from "../../src";

describe("presets Test", () => {
    it("test animate method", () => {
        //  Given, When
        const scene = animate({
            ".item": {
                0: {
                    a: 0,
                },
                1: {
                    a: 1,
                },
            },
        });
        const playState = scene.getPlayState();

        scene.pause();
        const frame = scene.getItem<SceneItem>(".item").getNowFrame(0.5);
        const playState2 = scene.getPlayState();
        // Then
        expect(playState).to.be.equals("running");
        expect(playState2).to.be.equals("paused");
        expect(frame.get("a")).to.be.equals(0.5);
    });
    it("test animate method with easing", () => {
        //  Given, When
        const scene = animate({
            ".item": {
                0: {
                    a: 0,
                },
                1: {
                    a: 1,
                },
            },
        }, {
            easing: "ease-in",
        });
        const playState = scene.getPlayState();

        scene.pause();
        const frame = scene.getItem<SceneItem>(".item").getNowFrame(0.5, EASE_IN);
        const playState2 = scene.getPlayState();
        // Then
        expect(playState).to.be.equals("running");
        expect(playState2).to.be.equals("paused");
        expect(scene.getEasingName()).to.be.equals("cubic-bezier(0.42,0,1,1)");
        expect(frame.get("a")).to.be.not.equals(0.5);
    });
    it("test animateItem method", () => {
        //  Given, When
        const item = animateItem({
            0: {
                a: 0,
            },
            1: {
                a: 1,
            },
        });
        const playState = item.getPlayState();

        item.pause();
        const frame = item.getNowFrame(0.5);
        const playState2 = item.getPlayState();
        // Then
        expect(playState).to.be.equals("running");
        expect(playState2).to.be.equals("paused");
        expect(frame.get("a")).to.be.equals(0.5);
    });
    it("test animateItem method with easing", () => {
        //  Given, When
        const item = animateItem({
            0: {
                a: 0,
            },
            1: {
                a: 1,
            },
        }, {
            easing: "ease-in",
        });
        const playState = item.getPlayState();

        item.pause();
        const frame = item.getNowFrame(0.5);
        const playState2 = item.getPlayState();
        // Then
        expect(playState).to.be.equals("running");
        expect(playState2).to.be.equals("paused");
        expect(frame.get("a")).to.be.not.equals(0.5);
    });
});
