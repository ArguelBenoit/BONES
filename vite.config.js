import { defineConfig } from 'vite';
import {
  distGenerating,
  syncManifestAndPackage,
  configurationCreated
} from './vite.utils.js';


export default defineConfig(async (cmdInfo) => {
  const mode = cmdInfo.command === 'serve' ? 'development' : 'production';
  const browser = cmdInfo.mode;

  await distGenerating(browser);
  await syncManifestAndPackage(browser);

  return configurationCreated(mode, browser);
});