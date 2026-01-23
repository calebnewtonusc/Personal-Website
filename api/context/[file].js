/**
 * Vercel Serverless Function: Context Storage API
 * Stores context uploaded from Mac, serves to any Claude session
 */

// In-memory storage (Vercel serverless - resets on cold start)
// For production, use Vercel KV, Redis, or database
let contextStorage = {};
let lastUpdate = null;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { file } = req.query;

  // GET: Retrieve context file
  if (req.method === 'GET') {
    if (file === 'all') {
      // Return all context
      return res.json({
        context: contextStorage,
        lastUpdate,
        files: Object.keys(contextStorage).length
      });
    }

    if (file && contextStorage[file]) {
      return res.json({
        file,
        content: contextStorage[file],
        lastUpdate
      });
    }

    return res.status(404).json({ error: 'File not found' });
  }

  // POST: Update context from Mac
  if (req.method === 'POST') {
    const { files, timestamp } = req.body;

    if (!files || typeof files !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Update storage
    Object.assign(contextStorage, files);
    lastUpdate = timestamp || new Date().toISOString();

    console.log(`[Context Updated] ${Object.keys(files).length} files, ${lastUpdate}`);

    return res.json({
      success: true,
      updated: Object.keys(files).length,
      total: Object.keys(contextStorage).length,
      timestamp: lastUpdate
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
