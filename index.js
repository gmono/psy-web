"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsEngine = exports.Particle = exports.Vector2D = void 0;
const rxjs_1 = require("rxjs");
// 向量类，用于表示位置、速度、加速度等
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // 向量加法
    add(other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }
    // 向量减法
    subtract(other) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }
    // 向量缩放
    scale(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }
    // 计算向量长度（模）
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    // 归一化向量
    normalize() {
        const mag = this.magnitude();
        return mag > 0 ? this.scale(1 / mag) : new Vector2D(0, 0);
    }
}
exports.Vector2D = Vector2D;
//
function getRelativePosition(element, container) {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
        x: elementRect.left - containerRect.left + container.scrollLeft,
        y: elementRect.top - containerRect.top + container.scrollTop,
    };
}
// 粒子类，表示物理引擎中的物体
class Particle {
    bindToObject(o) {
        this.obj =
        ;
    }
    bindToElement(ele, cont) {
    }
    static createByElement(cont, ele) {
    }
    constructor(x, y, mass = 1) {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);
        this.mass = mass;
    }
    // 施加力（F = ma）
    applyForce(force) {
        this.acceleration = this.acceleration.add(force.scale(1 / this.mass));
    }
    // 更新粒子状态（使用欧拉积分）
    update(dt) {
        // v = v + a * dt
        this.velocity = this.velocity.add(this.acceleration.scale(dt));
        // p = p + v * dt
        this.position = this.position.add(this.velocity.scale(dt));
        // 重置加速度
        this.acceleration = new Vector2D(0, 0);
    }
}
exports.Particle = Particle;
// 物理引擎类，管理粒子和斥力
class PhysicsEngine {
    constructor() {
        this.particles = [];
        this.repulsionConstant = 1000; // 斥力常数，调整强度
        this.minDistance = 10; // 最小距离，避免除零或过大斥力
        this.onUpdated = new rxjs_1.Subject();
    }
    // 添加粒子
    addParticle(particle) {
        this.particles.push(particle);
    }
    // 计算粒子间斥力（类似库仑力，F = k / r^2）
    calculateRepulsion() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                // 计算两粒子间的距离向量
                const delta = p2.position.subtract(p1.position);
                const distance = delta.magnitude();
                // 避免过近导致斥力过大
                const effectiveDistance = Math.max(distance, this.minDistance);
                // 计算斥力大小（反比平方律）
                const forceMagnitude = this.repulsionConstant / (effectiveDistance * effectiveDistance);
                // 计算斥力方向（归一化向量）
                const forceDirection = delta.normalize();
                // 对 p1 施加力（方向相反）
                const forceOnP1 = forceDirection.scale(forceMagnitude);
                p1.applyForce(forceOnP1);
                // 对 p2 施加等大反向力（牛顿第三定律）
                const forceOnP2 = forceDirection.scale(-forceMagnitude);
                p2.applyForce(forceOnP2);
            }
        }
    }
    // 模拟一步
    step(dt) {
        // 计算所有斥力
        this.calculateRepulsion();
        // 更新所有粒子状态
        for (const particle of this.particles) {
            particle.update(dt);
        }
    }
    startSim() {
        // 模拟循环
        const dt = 0.016; // 时间步长（约60fps）
        setInterval(() => {
            this.step(dt);
            // 输出粒子位置（可替换为渲染逻辑）
            // console.log(this.particles.map(p => `(${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)})`));
            this.onUpdated.next(this);
        }, dt * 1000);
    }
}
exports.PhysicsEngine = PhysicsEngine;
