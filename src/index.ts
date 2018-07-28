#!/usr/bin/env node

import logger from './logger';
import runCommandSelectPrompt from "./prompts/commandSelect";

async function run() {
  try {
    await runCommandSelectPrompt();
  } catch(e) {
    logger.error({
      message: e.message
    });
  }
}

run();
