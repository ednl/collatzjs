const N = 10000;
const branch = 15;
const angle = 0.15;
const alph = 20;
const perframe = 25;

const tree = new Array(N + 1);  // element 0 not used
let countdown = N;

function setup() {
  createCanvas(1200, 1100);
  background(51);
  stroke(255, alph);
  strokeWeight(3);
  noFill();

  // Initialise array
  for (let i = 0; i <= N; ++i)
    tree[i] = 0;

  // Populate tree according to Collatz
  // Result: every n <= N reduces to tree[n], e.g.:
  //   tree[5] = 8 because (5*3+1)/2 == 8
  //   tree[8] = 4 because 8/2 == 4
  for (let i = 1; i <= N; ++i) {
    let up = i * 2;
    if (up <= N)
      tree[up] = i;
    if (--up % 3 == 0) {
      up /= 3;
      if (up > 1)
        tree[up] = i;
    }
  }
}

function draw() {
  // Origin near the bottom, slightly right of the middle
  translate(width / 30 * 16, height - 50);
  scale(1, -1);

  // Draw multiple branches every frame
  for (let dummy = 0; dummy < perframe; ++dummy) {
    // Check every tree index from N downto 2
    if (countdown > 1) {
      let leaf = countdown--;

      // Some indices don't reduce inside the range 1..N
      if (tree[leaf]) {

        // Follow the path all the way down and reverse it
        const path = [];
        while (leaf) {
          path.push(leaf);
          leaf = tree[leaf];
        }
        path.reverse();

        // Draw the path from the ground up
        push();
        // Element 0 is always 1, so start at element 1
        for (let i = 1; i < path.length; ++i) {

          // Veer left or right
          rotate(path[i] % 2 ? -angle : angle);
          
          // Draw branch straight up (with current rotation)
          // Minus 2 to minimise overlap
          line(0, 0, 0, branch - 2);
          
          // Climb up the branch
          translate(0, branch);
        }
        pop();
      }
    }
  }

  // Progress bar
  resetMatrix();
  line(3, 3, map(countdown, N, 1, 0, width), 3);

  if (countdown < 2) {
    // Erase progress bar and stop
    stroke(51);
    strokeWeight(6);
    line(0, 3, width, 3);
    noLoop();
  }
}
