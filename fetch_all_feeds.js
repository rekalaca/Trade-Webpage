import https from 'https';
import fs from 'fs';

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      if (res.statusCode !== 200) {
        return resolve('');
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  let allFeedItems = [];
  console.log('Fetching ALL feed pages from demotrade.hu...');

  for (let page = 1; page <= 25; page++) {
    const url = `https://www.demotrade.hu/feed/?paged=${page}`;
    const xml = await fetchUrl(url);
    if (!xml || !xml.includes('<item>')) {
      console.log(`Page ${page} returned empty or no items. Stopping.`);
      break;
    }
    const matches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    console.log(`Page ${page}: found ${matches.length} items.`);
    allFeedItems.push(...matches);
  }

  console.log(`Total items collected across all pages: ${allFeedItems.length}`);
  fs.writeFileSync('all_raw_feed_items.json', JSON.stringify(allFeedItems, null, 2));
}

run();
