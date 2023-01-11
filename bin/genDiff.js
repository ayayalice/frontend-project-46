#!/usr/bin/env node
import { Command } from 'commander';
import { gendiff } from '../src/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format', '<type>  output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
program.parse();
