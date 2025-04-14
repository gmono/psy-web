"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// 示例用法
function runSimulation() {
    const engine = new _1.PhysicsEngine();
    // 创建一些粒子
    engine.addParticle(new _1.Particle(100, 100, 1));
    engine.addParticle(new _1.Particle(120, 120, 1));
    engine.addParticle(new _1.Particle(80, 90, 1));
    engine.addParticle(new _1.Particle(110, 80, 1));
    engine.onUpdated.subscribe(v => {
        console.log(v.particles.map(p => `(${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)})`));
    });
    engine.startSim();
}
// 运行模拟
runSimulation();
