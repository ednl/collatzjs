// The Collatz Conjecture
// As seen on The Coding Train by Daniel Shiffman
// https://youtu.be/EYLWxwo1Ed8
// https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html

// Collatz conjectured that any positive whole number n, repeatedly
// transformed as n/2 when even and 3n+1 when odd, will eventually go down to 1.
// E.g. starting with the number three: 3 - 10 - 5 - 16 - 8 - 4 - 2 - 1.
// The graph shows these sequences as lines that veer left to an odd number, right to even.

// From the early imbalance you can see that there is an abundance of even numbers
// near the root of the tree. That seems logical, as even numbers are the only way
// to go down. To get the wider spread, instead of 3n+1 which is even because n is
// odd, I took that down to (3n+1)/2.

// Which might be still be even! But at least it's one fewer even number. I also tried
// reducing 3n+1 all the way down to an odd number by factoring out not just the first
// but all 2s (if any), but that left the tree properly imbalanced to the left. It's
// good now, looks a bit like a Caribean dividivi tree (NL: "waaiboom").

// It's a conjecture, by the way, and not a theorem or law because it remains unproven.
// So far, no counterexamples have been found; all the numbers anyone has ever tried
// *have* gone down to 1, but a proof seems far away. More at Numberphile:
// https://youtu.be/5mFpVDpKX70

const N = 10000;   // highest starting number of the sequences
const batch = 20;  // draw how many complete sequences per animation frame
const angle = 0.15;
const len = 11;
const weight = 3;
const branch = len - weight + 1;  // approx of non-overlapping length
const alph = 0.03;
let fg, bg, h, dh;

// n=1 is the root of the tree, first branch is always from 1 to 2, so start at 2
let n = 2;

// Collatz transformation of a positive whole number
// Factor out 2 from the odd case, to balance the graph
function collatz(num) {
  return num % 2 ? (num * 3 + 1) / 2 : num / 2;
}

function mousePressed() {
  background(bg);
  strokeWeight(weight);
  n = 2;
  h = random(1);
  dh = random(2) < 1 ? -0.002 : 0.002;
  loop();
}

function setup() {
  colorMode(RGB, 255);
  bg = color(51);
  fg = color(255, 51, 102, alph);  // reddish pink

  createCanvas(1500, 1000);
  colorMode(HSB, 1);
  mousePressed();
}

function draw() {

  // Place origin (root of the tree) near the bottom
  translate(width / 2, height - 25);
  // Positive y going up
  scale(1, -1);
  stroke(color(h, 1, 1, alph));
  h += dh;
  if (h >= 1)
    h = 0;
  else if (h <= 0)
    h = 1;

  // Draw multiple branches in every frame to speed things up
  for (let dummy = 0; dummy < batch; ++dummy) {

    // Check boundary because probably (N-1) % batch != 0
    if (n > N)
      break;

    // Collatz sequence of n downto 2
    const seq = [];
    let i = n++;  // start with n, and increase n for the next draw loop
    // Do not add the last step n=1 because drawing always starts there
    while (i != 1) {
      seq.push(i);
      i = collatz(i);
    }

    // Draw the branch from the root up
    seq.reverse();
    push();
    for (const i of seq) {
      rotate(i % 2 ? angle : -angle);
      line(0, 0, 0, branch);
      translate(0, len);
    }
    pop();
  }

  // Progress bar
  resetMatrix();
  if (n <= N) {
    stroke(255);
    line(weight, height - weight, map(n, 2, N, weight, width - weight), height - weight);
  } else {
    // Erase and stop
    stroke(bg);
    strokeWeight(weight * 2);
    line(0, height - weight, width, height - weight);
    noLoop();
  }
}
