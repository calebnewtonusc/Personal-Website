/**
 * Cloud Sync Agent
 * Syncs local context to cloud (runs on Mac, syncs to website)
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const CONTEXT_DIR = '/Users/joelnewton/Desktop/2026 Code/Caleb-Context';
const API_URL = process.env.WEBSITE_URL || 'http://localhost:3001';

async function syncToCloud() {
  console.log('🔄 Syncing context to cloud...');

  try {
    // Read all context files
    const files = await fs.readdir(CONTEXT_DIR);
    const contextFiles = {};

    for (const file of files) {
      if (file.endsWith('_CONTEXT.md') || file === 'WHO_IS_CALEB.md') {
        const content = await fs.readFile(path.join(CONTEXT_DIR, file), 'utf-8');
        contextFiles[file] = content;
      }
    }

    // Send to cloud
    const response = await axios.post(`${API_URL}/api/context/sync/mac`, {
      files: contextFiles,
      timestamp: new Date().toISOString()
    });

    console.log(`✅ Synced ${response.data.updated} files to cloud`);
    return response.data;
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    return { error: error.message };
  }
}

// Run sync every 5 minutes if called as main script
if (require.main === module) {
  console.log('🤖 Cloud Sync Agent Starting...');
  console.log(`Syncing to: ${API_URL}`);
  console.log('');

  // Initial sync
  syncToCloud();

  // Sync every 5 minutes
  setInterval(syncToCloud, 5 * 60 * 1000);
}

module.exports = { syncToCloud };
