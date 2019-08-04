#!/usr/bin/env node

const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();
const path = require('path');
const { parse } = require('himalaya');
const dinoql = require('dinoql')


program.version('1.0.0');

program
  .option('-p, --path <path>', 'path of the file')
  .option('-d, --dest <dest>', 'destination of the output')
  .action(readFile)

program.parse(process.argv);

function readFile(args) {
  const cwd = process.cwd();

  if(!args.path && !args.dest) {
    throw new Error(`Expected to have the path and the destination of the file
    instead got path: ${args.path} | dest: ${args.dest}`)
  }

  const resolvedPath = path.resolve(cwd, args.path);
  const resolvedDest = path.resolve(cwd, args.dest)
  console.log(resolvedPath, resolvedDest)

  try {
    const file = fs.readFileSync(args.path, { encoding: "utf8" });
    const json = parse(file)

    formatJson(json.filter(f => f.tagName === 'html')[0].children.filter(f => f.tagName === 'body')[0])

  } catch (err) {
    console.log(err);
  }
}

function formatJson(json) {
  console.log(json)
}

module.exports = program;
