#!/usr/bin/env node
/*
  Node.js CLI Calculator

  Supported operations:
  - addition (add, +)
  - subtraction (subtract, -)
  - multiplication (multiply, *, x)
  - division (divide, /)

  Usage:
    node src/calculator.js add 2 3
    node src/calculator.js + 2 3
    node src/calculator.js interactive   # starts interactive prompt
*/

const readline = require('readline');

// Basic math functions (exported for reuse/testing)
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Divide by zero');
  return a / b;
}

// Additional operations requested in issue #3
function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

// CLI helpers
function isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n);
}

function parseNum(str) {
  const v = Number(str);
  if (!isNumber(v)) throw new Error(`Invalid number: ${str}`);
  return v;
}

function compute(op, a, b) {
  switch (op) {
    case 'add': case '+': return add(a, b);
    case 'subtract': case '-': return subtract(a, b);
    case 'multiply': case '*': case 'x': case 'X': return multiply(a, b);
    case 'divide': case '/': return divide(a, b);
    case 'mod': case '%': return modulo(a, b);
    case 'pow': case '^': return power(a, b);
    case 'sqrt': return squareRoot(a);
    default: throw new Error(`Unknown operation: ${op}`);
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <a> <b>');
  console.log('Operations: add(+), subtract(-), multiply(* or x), divide(/), mod(%), pow(^), sqrt');
  console.log("Or run 'node src/calculator.js interactive' to use the prompt.");
}

// Interactive prompt
function startInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'calc> ' });
  console.log('Interactive calculator. Enter: <op> <a> <b>  (e.g. add 2 3)');
  console.log("Type 'help' for operations, or 'exit' to quit.");
  rl.prompt();
  rl.on('line', (line) => {
    const raw = line.trim();
    if (!raw) { rl.prompt(); return; }
    if (raw === 'exit' || raw === 'quit') { rl.close(); return; }
    if (raw === 'help') { printUsage(); rl.prompt(); return; }
    const parts = raw.split(/\s+/);
    const op = parts[0];
    try {
      if (op === 'sqrt') {
        if (parts.length < 2) { console.log('Expected: sqrt <n>'); rl.prompt(); return; }
        const a = parseNum(parts[1]);
        const res = compute(op, a);
        console.log(res);
        rl.prompt();
        return;
      }
      if (parts.length < 3) { console.log('Expected: <operation> <a> <b>'); rl.prompt(); return; }
      const a = parseNum(parts[1]);
      const b = parseNum(parts[2]);
      const res = compute(op, a, b);
      console.log(res);
    } catch (err) {
      console.error('Error:', err.message);
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye');
    process.exit(0);
  });
}

// CLI entry
if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    // No args -> interactive by default
    startInteractive();
  } else if (argv[0] === 'interactive') {
    startInteractive();
  } else {
    const op = argv[0];
    try {
      if (op === 'sqrt') {
        if (argv.length < 2) { console.error('Not enough arguments for sqrt.'); printUsage(); process.exit(1); }
        const a = parseNum(argv[1]);
        const res = compute(op, a);
        console.log(res);
        process.exit(0);
      }
      if (argv.length < 3) { console.error('Not enough arguments.'); printUsage(); process.exit(1); }
      const a = parseNum(argv[1]);
      const b = parseNum(argv[2]);
      const res = compute(op, a, b);
      console.log(res);
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message);
      printUsage();
      process.exit(1);
    }
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };