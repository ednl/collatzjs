// The Collatz Conjecture
// As seen on The Coding Train by Daniel Shiffman
// https://youtu.be/EYLWxwo1Ed8
// https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html

// Enhancement: live drawing, prettier drawing, correct boundaries

const N = 10000;
const batch = 40;
const angle = 0.15;
const len = 11;
const thick = 3;
const branch = len - thick + 1;
const soft = 10;
const bg = 51;
let n = 2;  // n=1 is the root of the tree, first branch is from 1 to 2

function setup() {
	createCanvas(1500, 1000);
	background(bg);
	stroke(color(255, 51, 102, soft));
	strokeWeight(thick);
}

function draw() {

	// Origin near the bottom
	translate(width / 2, height - 25);
	scale(1, -1);

	// Draw multiple branches in every frame to speed things up
	for (let dummy = 0; dummy < batch; ++dummy) {

		// Check boundary because (N-1) % batch != 0
		if (n <= N) {

			// Collatz sequence of n downto 1 (maybe; it's still a conjecture)
			const seq = [];
			let i = n++;
			while (i != 1) {
				seq.push(i);
				i = i % 2 ? (i * 3 + 1) / 2 : i / 2;  // extra division by 2 for fewer even numbers
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
