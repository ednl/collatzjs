// The Collatz Conjecture
// As seen on The Coding Train by Daniel Shiffman
// https://youtu.be/EYLWxwo1Ed8
// https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html

const N = 10000;
const len = 11;
const thick = 3;
const branch = len - thick + 1;
const angle = 0.15;
const soft = 10;
const batch = 50;
const fg = 255;
const bg = 51;
let n = 2;  // n=1 is the root of the tree, first branch is from 1 to 2

function setup() {
	createCanvas(1500, 1000);
	background(bg);
	stroke(fg, soft);
	strokeWeight(thick);
}

function draw() {

	// Origin near the bottom
	translate(width / 2, height - 25);
	scale(1, -1);

	// Draw multiple branches every frame
	for (let dummy = 0; dummy < batch; ++dummy) {

		if (n <= N) {

			// Calculate sequence of n downto 1
			const seq = [];
			let i = n++;
			while (i != 1) {
				seq.push(i);
				i = i % 2 ? (i * 3 + 1) / 2 : i / 2;  // (i*3+1)/2 for fewer even numbers
			}

			// Draw the complete branch bottom up
			seq.reverse();
			push();
			for (const i of seq) {
				rotate(i % 2 ? angle : -angle);
				line(0, 0, 0, branch);
				translate(0, len);
			}
			pop();
		}
	}

	// Progress bar
	resetMatrix();
	if (n <= N) {
		line(thick, thick, map(n, 0, N, 0, width), thick);
	} else {
		// Erase and stop
		stroke(bg);
		strokeWeight(thick * 2);
		line(0, thick, width, thick);
		noLoop();
	}
}
