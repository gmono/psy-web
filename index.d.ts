import { Subject } from "rxjs";
export declare class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(other: Vector2D): Vector2D;
    subtract(other: Vector2D): Vector2D;
    scale(scalar: number): Vector2D;
    magnitude(): number;
    normalize(): Vector2D;
}
export interface IPositionObject {
    x: number;
    y: number;
}
export declare class Particle {
    position: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    mass: number;
    obj?: IPositionObject;
    bindToObject(o: IPositionObject): void;
    bindToElement(ele: HTMLElement, cont: HTMLElement): void;
    static createByElement(cont: HTMLElement, ele: HTMLElement): void;
    constructor(x: number, y: number, mass?: number);
    applyForce(force: Vector2D): void;
    update(dt: number): void;
}
export declare class PhysicsEngine {
    particles: Particle[];
    repulsionConstant: number;
    minDistance: number;
    addParticle(particle: Particle): void;
    calculateRepulsion(): void;
    step(dt: number): void;
    onUpdated: Subject<PhysicsEngine>;
    startSim(): void;
}
