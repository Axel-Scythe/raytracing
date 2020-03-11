let walls = [];
let ray;
let particle;

let xoff = 0;
let yoff = 0;

const sceneW = 400;
const sceneH = 400;

function setup() {
  createCanvas(800, 400);
  for(let i = 0; i < 5; i++){
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
}

function draw() {
  background(0);

    if(keyIsDown(65)){
      particle.rotate(0.1);
    }else if (keyIsDown(68)){
      particle.rotate(-0.1);
    }

  for(let wall of walls){
    wall.show();
  }
  // particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
  particle.update(mouseX, mouseY);
  particle.show();

  xoff += random(0.01);
  yoff += random(0.01);

  const scene = particle.look(walls);
  const w = sceneW / scene.length;

  push();
  translate(sceneW, 0);
  for(let i = 0; i < scene.length; i++){
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;

    const b = map(sq, 0, wSq, 255, 0);
    const h = map(scene[i], 0, sceneH, sceneH, 0);
    noStroke();
    fill(b);
    rectMode(CENTER);
    rect(i * w + w/2, sceneH/2, w + 1, h);
  }
  pop();
}
