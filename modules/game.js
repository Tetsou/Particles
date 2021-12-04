// Game Classes
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        
        this.x += x;
        this.y += y;
        
    }
    // Static method to add to vectors
    static add (v1, v2) {
       const v3 = {x:0, y:0};
       v3.x = v1.x + v2.x;
       v3.y = v1.y + v2.y;
       return v3;
    }
    // add a vector
    addVector (v) {
        this.x += v.x;
        this.y += v.y;
    }
    // Multiply vector by scaler
    mult(s) {
        this.x *= s;
        this.y *= s;
    }
}
class Mouse {
    constructor(id) {
        this.docObj = document.getElementById(id);
        this.x = 0;
        this.y = 0;
        this.pressed = false;
        this.move();
        this.up();
        this.down();

    }
    
    move() {
        this.docObj.addEventListener('mousemove', e => {
            this.x = e.offsetX;
            this.y = e.offsetY;
            
        });
    }
    down() {
        this.docObj.addEventListener('mousedown', e => {
            this.pressed = true;
            
        });

    }
    up() {
        this.docObj.addEventListener('mouseup', e => {
            this.pressed = false;
            
        });

    }
    
}
class createCanvas {
    constructor(id, width=400, height=400) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        
    }
    getCtx() {
        
        return this.ctx;
    }
    getCanvas() {
        return this.canvas;
    }
    getWidth() {

        return this.width;
    }
    getHeight() {

        return this.height;
    }
    setWidth(x) {
        this.canvas.width = this.width = x;
    }
    setHeight(y) {
        this.canvas.height = this.height = y;

    }
    setDim(x,y) {
        this.canvas.width = this.width = x;
        this.canvas.height = this.height = y;
    }
    clear() {
        this.ctx.clearRect(0,0,this.width, this.height);
    }

}
// Class - general purpose animated image
class createImage {
    constructor() {
        this.image = new Image();
        this.src = null;
        this.absWidth = 0;
        this.absHeight = 0;
        this.dWidth = 0;
        this.dHeight = 0;
        this.isLoaded = false;
    }
    getImage() {
        return this.image;
    }
    setAbsDim(x,y) {
        this.image.width = x;
        this.image.height = y;
    }
    getAbsWidth() {
        return this.absWidth;
    }
    getAbsheight() {
        return this.absHeight;
    }
    loadImage(url) {
        // Note: the src image takes time to load so all draw functions my wait using the onload direction.
        this.absWidth = this.dWidth = this.image.width;
        this.absHeight = this.dHeight = this.image.height
        this.src = url;
        this.image.src = url;
        
        
       
    }
}
class Sprite extends createImage {
    constructor(ctx) {
        super();
        this.x = 0;
        this.y = 0;
        this.ctx = ctx;
    }
    // Update the sprite
    update() {
        this.x = this.x+1;
    }
    // Draw the sprite
    draw() {
        this.image.onload = () => {
            this.isLoaded = true;
            this.ctx.drawImage(this.image, this.x, this.y, this.dWidth, this.dHeight);
        }
        if(this.isLoaded){
            this.ctx.drawImage(this.image, this.x, this.y, this.dWidth, this.dHeight);
        } 
    }
    getWidth() {
        return this.dWidth;
    }
    getHeight() {
        return this.dHeight;
    }
    setWidth(x) {
        this.dWidth = x;
    }
    setHeight(y) {
        this.dHeight = y;
    }
    setDim(x,y){
        this.dWidth = x;
        this.dHeight = y;
    }
    setXY(xcoord, ycoord) {
        this.x = xcoord;
        this.y = ycoord;
    }


}
class Shape {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.isFill = false;
        this.isStroke = true;
        this.fColor = 'black';
        this.sColor = 'black';
    }
    setStroke(bool) {
        this.sStroke = bool;
    }
    setFill(bool) {
        this.isFill = bool;
    }
    setFillStyle(color){
        this.fColor = color;
    }
    setStrokeStyle(color){
        this.sColor = color;
    }
    setX(x){
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setXY(x,y) {
        this.x = x;
        this.y = y;
    }
}
class Circle extends Shape {
    constructor(ctx, x, y, radius=100) {
        super(ctx, x, y);
        this.radius = radius;
    }
    setRadius(r) {
        this.radius = r;
    }
    draw() {
        this.ctx.strokeStyle = this.sColor;
        this.ctx.fillStyle = this.fColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, true);
        if(this.isFill) {
            this.ctx.fill();
        }else {
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}
class Square extends Shape {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y);
        this.dWidth = width;
        this.dHeight = height;

    }
    draw() {
        this.ctx.fillStyle = this.fColor;
        this.ctx.strokeStyle = this.sColor;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.dWidth, this.dHeight);
        if(this.isFill){
            this.ctx.fill();
        }else{
            this.ctx.stroke();
            this.ctx.closePath();
        }
        
    }
}

export {createCanvas, createImage, Sprite, Circle, Square, Vector, Mouse};