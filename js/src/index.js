import {
    Black,
    White
} from './side.js';

const app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
});

// koristi se za zoom na kraju intra (js/src/shape.js)
window.introStage = app.stage;

document.body.appendChild(app.view);

const black = new Black();
app.stage.addChild(black);

const white = new White();
app.stage.addChild(white);

app.renderer.autoResize = true;
window.addEventListener('resize', resize);
resize();

function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    black.resize(window.innerWidth, window.innerHeight);
    white.resize(window.innerWidth, window.innerHeight);
}

// gasi intro: zaustavlja ticker i oslobadja WebGL (poziva se iz js/src/shape.js kad intro zavrsi)
window.introDestroy = function () {
    window.removeEventListener('resize', resize);
    window.introStage = null;
    PIXI.ticker.shared.stop();
    if (window.TweenMax) TweenMax.killAll(false, true, false);
    app.destroy(true);
};
