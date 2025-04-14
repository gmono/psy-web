import { PhysicsEngine, Particle } from ".";

// 示例用法
function runSimulation() {
  const engine = new PhysicsEngine();

  // 创建一些粒子
  engine.addParticle(new Particle(100, 100, 1));
  engine.addParticle(new Particle(120, 120, 1));
  engine.addParticle(new Particle(80, 90, 1));
  engine.addParticle(new Particle(110, 80, 1));
  engine.onUpdated.subscribe(v => {
    console.log(v.particles.map(p => `(${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)})`));
  })
  engine.startSim();

}

// 运行模拟
runSimulation();