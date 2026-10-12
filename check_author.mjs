import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'n5x0r77i',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const author = await client.fetch('*[_type == "author"][0]');
console.log('Author in Sanity:');
console.log(JSON.stringify(author, null, 2));

const assets = await client.fetch('*[_type == "sanity.imageAsset"]{ _id, originalFilename, url }');
console.log('Total image assets:', assets.length);
console.log(JSON.stringify(assets.slice(0, 10), null, 2));
