/**
 * Requires a square with a known distance to center. Theoretically this can be used to rotate around in any reference frame with a square boundary. 
 * 
 * 
 * Takes a position and rotates it PI/4 about axis. After rotation projects line past
 * to wall(at the end of closest axis to rotated point). 
 * 
 * One potential problem with this algorithm is that it doesn't account for pass through
 * 3 quadrants, which is theoretically possible. It assumes that the vector position relative
 * to the axis would be the closest to the rotated point, which might not be the case.
 * @param x Vector'r x position relative to center.
 * @param y Vector'r y position relative to center.
 * @param c The distance from either plane'r axis to the center.
 * @returns Vector describing the difference in position between the projected vector'r head and the starting vector'r.
*/
function rotateAndProject(x:number, y:number, c:number): Vector{
    let t = new Vector(x-c, y-c); //turtle'r position rel. center
    let a = new Vector(-t.y, t.x); //turtle'r pos rotated about center
    let d_ta = new Vector(a.x-t.x, a.y-t.y); //distance from pos to rotated pos
    let angleTA = d_ta.a;
    let p: Vector;
    // Number that represents closest axis
    const wall = (Math.abs(Math.cos(2*angleTA+Math.PI))/(2*Math.cos(2*angleTA+Math.PI))+1.5);
    if(wall % 2 !== 0){ //closer to x plane, px = C * sign of d_ta.x
        //y is opp x is adj
        let pax = Math.sign(d_ta.x)*c - a.x; // sign(x)*c will determine which side of axis
        let pay = pax * Math.tan(d_ta.a);    // angle of TA === angle of PA, by definition
        p = new Vector(pax + a.x, pay+a.y); //distance from a to projected vector
    } else { //closer to y plane, py = C
        //y is adj x is opp
        let pay = Math.sign(d_ta.x)*c - a.y;
        let pax = pay * Math.tan(d_ta.a);
        p = new Vector(pax + a.x, pay+a.y);
    }
    let d = new Vector(p.x-t.x, p.y-t.y); //the distance from turtle to projected vector
    return d;
}
/**
 * Container for the simulation of vectors in 2d space. Can be built with either scalar(x,y) components, or polar components(r, a). Supports scalar addition.
 * 
 * Will support the following in the future: Scalar multiplication, dot product, cross product, and probably a lot more as time goes on.
 * @param {number} x Position in the y direction.
 * @param {number} y Position in the y direction.
 * @param {number} r Length of vector.
 * @param {number} a Angle of vector.
 */
class Vector{
    _x: number; _y: number; _r: number; _a: number;
    constructor(x:number, y:number){
        this.setComponents(x,y);
    }
    get x(){return this._x;} get y(){return this._y;} get r(){return this._r;} get a(){return this._a;}
    setComponents(x:number, y:number){
        this._x = x;
        this._y = y;
        this._a = x === 0 ? 0 : Math.atan(y/x);
        this._r = x === 0 ? 0 : x/Math.cos(this._a);
    }
    setPolar(r: number, a:number){
        this._r = r;
        this._a = a;
        this._x = r * Math.cos(a);
        this._y = r * Math.sin(a);
    }
    normalized(): Vector{
        const r = 1;
        return this.x===0 && this.y === 0 ? new Vector(this.x, this.y) : this.buildPolar(r, this.a);
    }
    add(x:number, y:number){
        return new Vector(this.x + x, this.y + y);
    }
    buildPolar(r: number, a:number){
        return new Vector(r * Math.cos(a), r*Math.sin(a));
    }
    scaled(r: number){
        const vector = this.buildPolar(r, this.a);
        return vector;
    }
    rotate(a: number){
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        return new Vector(this.x * cos + this.y * -sin, this.x * sin + this.y * cos)
    }
}


const vector = new Vector(1,1);
console.log(vector.rotate(90));