// One-off script: seeds Sanity with the 14 projects that used to be hardcoded
// in app/data/projects.ts, uploading their local thumbnail/gallery images as
// real Sanity assets so every project is fully editable in Studio afterwards.
//
// Usage (from the repo root):
//   node --env-file=.env.local scripts/migrate-projects.mjs
//
// Requires SANITY_PROJECT_ID, SANITY_DATASET, and a write-capable
// SANITY_API_TOKEN (create one at sanity.io/manage -> API -> Tokens, Editor
// permissions) in .env.local. Safe to re-run — documents are upserted by a
// stable _id and each local image file is uploaded at most once.

import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const CATEGORIES = ['Design', 'Development', 'eCommerce', 'SEO & Optimisation', 'AI'];

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_API_TOKEN. Set them in .env.local and run with --env-file=.env.local.');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: SANITY_API_TOKEN,
  useCdn: false,
});

// Order carries gaps (0, 10, 20…) so reordering later in Studio doesn't
// require renumbering every project.
const SEED_PROJECTS = [
  {
    slug: 'mazda-south-africa', order: 0,
    title: 'Mazda South Africa', client: 'Mazda South Africa',
    categories: ['Development'], tags: ['Development', 'HubSpot', 'Migration'],
    shortDesc: 'Full WordPress to HubSpot CMS migration maintaining pixel-perfect design and all integrations.',
    fullDesc: 'One of the key projects involved a complete migration of a high-traffic website from WordPress to HubSpot CMS. The client required the exact same look, feel, and functionality, all within a tight deadline. Rather than relying on legacy WordPress code, we rebuilt the entire site from the ground up in HubSpot, ensuring pixel-perfect visual consistency and maintaining all dynamic behaviors and integrations. Project worked while working with MO Agency as a Senior Web Developer.',
    thumbnail: 'Mazda-Southern-Africa-1.png', images: ['Mazda-Southern-Africa-1.png'],
    siteUrl: 'https://mazda.co.za', siteText: 'mazda.co.za', gridSize: 'large',
  },
  {
    slug: 'absa-habari', order: 10,
    title: 'ABSA Habari', client: 'ABSA Habari',
    categories: ['Design', 'Development'], tags: ['CSS3', 'HTML', 'jQuery', 'PHP', 'WordPress'],
    shortDesc: 'Online magazine & blog website for ABSA built with a custom WordPress theme.',
    fullDesc: "Online magazine/blog website for ABSA. Made with a custom WordPress theme tailored to the editorial needs of one of South Africa's largest banks. The project required a fully responsive, fast-loading design with a clean reading experience.",
    thumbnail: 'Habari-scaled.jpg', images: ['Habari-scaled.jpg'],
    siteUrl: 'https://habari.absa.africa', siteText: 'habari.absa.africa', gridSize: 'medium',
  },
  {
    slug: 'ugrid', order: 20,
    title: 'Ugrid', client: 'Ugrid',
    categories: ['Design', 'Development', 'eCommerce'], tags: ['CSS3', 'WordPress', 'Creative', 'HTML', 'PHP', 'SASS'],
    shortDesc: 'Crowdfunding site for a smart home energy-saving product with custom WordPress theme.',
    fullDesc: 'Your home energy assistant. Take Back Control Of Your Energy & Get Rewarded. Without knowing how energy is distributed in your home, it is difficult to manage it. Ugrid is designed to give you peace of mind by breaking down your energy consumption from the highest to the lowest items, allowing you to control your energy distribution. Crowdfunding project for an energy-saving product built on a custom themed WordPress website.',
    thumbnail: 'Ugrid-full-scaled.jpg', images: ['Ugrid-full-scaled.jpg'],
    siteUrl: 'https://www.nuzen.co.za/WIP/ugrid/', siteText: 'Ugrid', gridSize: 'medium',
  },
  {
    slug: 'altivex-studio', order: 30,
    title: 'Altivex.studio', client: 'Altivex Studio',
    categories: ['Design', 'Development'], tags: ['CSS3', 'WordPress', 'Creative', 'HTML', 'PHP', 'SASS'],
    shortDesc: 'Digital agency website — thinkers, creators & doers embracing tech and strategy.',
    fullDesc: "Altivex.Studio Digital Agency. We're a team of Thinkers, Creators and Doers who embrace technology and strategy to design digital products that build connections for growth. As a fully integrated digital lab, our expertise and value is being able to solve digital channels for every and any sized business across any sector.",
    thumbnail: 'Altivex-full-scaled.jpg', images: ['Altivex-full-scaled.jpg'],
    gridSize: 'small',
  },
  {
    slug: 'ocean76', order: 40,
    title: 'Ocean76', client: 'Ocean76',
    categories: ['Design', 'Development'], tags: ['CSS3', 'WordPress', 'Creative', 'HTML', 'PHP', 'SASS'],
    shortDesc: 'Custom WordPress theme with SEO optimisation — parent company of Altivex Ocean.',
    fullDesc: 'Custom WordPress theme created for this website. SEO and web optimization with custom script and plugins. Ocean76 is the parent company to Altivex Ocean. The project demanded a premium, content-rich site that performed exceptionally across all devices.',
    thumbnail: 'Home-Ocean76.png', images: ['Home-Ocean76.png'],
    siteUrl: 'https://ocean76.com/', siteText: 'Ocean76', gridSize: 'large',
  },
  {
    slug: 'oneo-farms', order: 50,
    title: 'Oneo Farms', client: 'Oneo Farms',
    categories: ['Design', 'Development'], tags: ['CSS3', 'WordPress', 'Creative', 'HTML', 'PHP', 'SASS', 'Online Chat'],
    shortDesc: 'Farm-based small business site with online ordering and live chat integration.',
    fullDesc: 'Theme + custom WordPress website for a farm-based small business. Online order and live chat integrated as options for customers to interact with the farm. The website was designed to feel warm, authentic, and connected to nature while providing a seamless e-commerce experience.',
    thumbnail: 'Oneo-Farms-full-scaled.jpg', images: ['Oneo-Farms-full-scaled.jpg'],
    siteUrl: 'https://oneofarms.co.za', siteText: 'Oneo Farms', gridSize: 'medium',
  },
  {
    slug: 'wonderful-zimbabwe', order: 60,
    title: 'Wonderful Zimbabwe', client: 'Wonderful Zimbabwe',
    categories: ['Design', 'Development'], tags: ['CSS3', 'WordPress', 'HTML', 'PHP'],
    shortDesc: 'WordPress site with WooCommerce & Peach Payment gateway integration.',
    fullDesc: 'The website built on WordPress CMS. Lots of custom coding required to make the website look like the design. Integrated Peach Payment as a payment gateway with WooCommerce. The project showcased the beauty of Zimbabwe as a travel destination.',
    thumbnail: 'Wonderful-Zimbabwe-full-scaled.jpg', images: ['Wonderful-Zimbabwe-full-scaled.jpg'],
    siteUrl: 'https://www.wonderfulzimbabwe.com/', siteText: 'Wonderful Zimbabwe', gridSize: 'small',
  },
  {
    slug: 'legalwise', order: 70,
    title: 'LegalWise', client: 'LegalWise',
    categories: ['Design', 'Development'], tags: ['CSS3', 'Concrete 5', 'HTML', 'PHP', 'JQuery'],
    shortDesc: "Phase one of LegalWise's Concrete 5 CMS website, learned and delivered in 3 weeks.",
    fullDesc: 'Website built in Concrete 5 CMS for our client LegalWise. The client requested the Concrete 5 framework and I had to learn and deliver the first phase of the project in 3 weeks. The site served thousands of South Africans looking for affordable legal services.',
    thumbnail: 'LegalWise-full-scaled.jpg', images: ['LegalWise-full-scaled.jpg'],
    siteUrl: 'https://www.legalwise.co.za', siteText: 'LegalWise', gridSize: 'medium',
  },
  {
    slug: 'african-rainbow-capital', order: 80,
    title: 'African Rainbow Capital', client: 'African Rainbow Capital',
    categories: ['Design', 'Development'], tags: ['CSS', 'Adobe Business Catalyst', 'HTML', 'JQuery'],
    shortDesc: 'Enterprise-grade site on Adobe Business Catalyst with custom Liquid templating.',
    fullDesc: 'African Rainbow Capital — ARC website was created using Adobe Business Catalyst CMS framework. The framework has its own coding language which is Liquid and it was a challenge to learn and deliver the project in time. *Business Catalyst is no longer a service provided by Adobe. The website has the same design and development standards but uses a different framework.',
    thumbnail: 'ARC-full-scaled.jpg', images: ['ARC-full-scaled.jpg'],
    siteUrl: 'https://www.africanrainbowcapital.co.za/', siteText: 'African Rainbow Capital', gridSize: 'small',
  },
  {
    slug: 'letsconvene', order: 90,
    title: 'LetsConvene', client: 'LetsConvene',
    categories: ['Design', 'Development'], tags: ['CSS3', 'WordPress', 'HTML', 'PHP', 'JQuery'],
    shortDesc: 'Promotional site for an online chat platform, built static then migrated to WordPress.',
    fullDesc: 'Promotional website created static with PHP & Ajax form submission for an online chat platform and also built on WordPress later to make it easy to include more pages and a blogs section. The site was designed to convey the ease-of-use of the platform.',
    thumbnail: 'Just-another-WordPress-site.png', images: ['Just-another-WordPress-site.png'],
    siteUrl: 'https://letsconvene.online/', siteText: 'LetsConvene', gridSize: 'medium',
  },
  {
    slug: 'arcearth', order: 100,
    title: 'ArcEarth', client: 'Arc Earth',
    categories: ['SEO & Optimisation'], tags: ['Optimisation', 'Speed', 'Rating', 'SEO'],
    shortDesc: 'Performance audit taking scores from 48→70 mobile and 70→93 desktop on PageSpeed.',
    fullDesc: 'We conducted a comprehensive website audit for Arcearth.net, focusing on performance, speed, and overall technical optimisation. Initially, the website scored 48 on mobile and 70 on desktop on Google PageSpeed Insights. After implementing targeted performance optimisations, the scores improved dramatically to 70 on mobile and 93 on desktop. The website also achieved an A grade on GTmetrix with an impressive 96% performance score.',
    thumbnail: 'GT-matrix-rating-3.png',
    images: ['GT-matrix-rating-3.png', 'Pagespeed-rating-3.png', 'Pagespeed-rating-3-mob.png'],
    siteUrl: 'https://arcearth.net', siteText: 'Arcearth', gridSize: 'small',
  },
  {
    slug: 'ai-assistant-plugin', order: 110,
    title: 'AI Assistant Plugin', client: 'Internal / Open Source',
    categories: ['AI'], tags: ['AI', 'WordPress', 'PHP', 'Claude'],
    shortDesc: "WordPress plugin powering an AI chat assistant using Anthropic's Claude API.",
    fullDesc: "Developed a WordPress plugin that adds an AI chat assistant to any website, powered by Anthropic's Claude. It intelligently searches site content before falling back to web search, logs all conversations to a custom database table, and fires Google Analytics events for usage tracking. Fully configurable from the WordPress admin with no front-end dependencies.",
    thumbnail: 'AI.png', images: ['AI-2.png', 'AI.png', 'AI-3.png'],
    gridSize: 'large',
  },
  {
    slug: 'diners-club', order: 120,
    title: 'Diners Club', client: 'Diners Club',
    categories: ['Development'], tags: ['HTML/CSS', 'JQuery', 'PHP'],
    shortDesc: 'Static site converted to WordPress — various sections, pages and newsletters.',
    fullDesc: 'I was part of the team that worked on this website. It was initially created as a static website and later was converted to WordPress. Worked on different sections of the website and newsletters for Diners Club South Africa.',
    thumbnail: 'Welcome-to-Diners-Club-2-scaled.png', images: ['Welcome-to-Diners-Club-2-scaled.png'],
    siteUrl: 'https://www.dinersclub.co.za/', siteText: 'Diners Club', gridSize: 'small',
  },
  {
    slug: 'top-quartile', order: 130,
    title: 'Top Quartile', client: 'Top Quartile',
    categories: ['Design', 'Development'], tags: ['CSS3', 'WordPress', 'HTML', 'PHP'],
    shortDesc: 'Custom WordPress site built from scratch — no theme, minimal plugins.',
    fullDesc: 'A custom WordPress website created for a friend. The website is simple and created without any theme or many plugins — fully hand-coded for maximum performance and flexibility.',
    thumbnail: 'topquartile-full-scaled.jpg', images: ['topquartile-full-scaled.jpg'],
    siteUrl: 'https://www.topquartile.co.za/', siteText: 'Top Quartile', gridSize: 'medium',
  },
];

const assetCache = new Map();

async function uploadImageOnce(filename) {
  if (assetCache.has(filename)) return assetCache.get(filename);

  const fullPath = path.join(PUBLIC_DIR, 'images', 'projects', filename);
  const buffer = await readFile(fullPath);
  const asset = await client.assets.upload('image', buffer, { filename });
  assetCache.set(filename, asset._id);
  console.log(`  uploaded asset: ${filename} -> ${asset._id}`);
  return asset._id;
}

function imageField(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
}

async function migrateProject(seed) {
  const invalidCategory = seed.categories.find((c) => !CATEGORIES.includes(c));
  if (invalidCategory) {
    throw new Error(`"${seed.slug}" has an unrecognised category "${invalidCategory}" — must be one of: ${CATEGORIES.join(', ')}`);
  }

  console.log(`Migrating ${seed.slug}...`);
  const thumbnailAssetId = await uploadImageOnce(seed.thumbnail);
  const imageAssetIds = await Promise.all(seed.images.map(uploadImageOnce));

  const doc = {
    _id: `project-${seed.slug}`,
    _type: 'project',
    title: seed.title,
    slug: { _type: 'slug', current: seed.slug },
    client: seed.client,
    categories: seed.categories,
    tags: seed.tags,
    shortDesc: seed.shortDesc,
    fullDesc: seed.fullDesc,
    thumbnail: imageField(thumbnailAssetId),
    images: imageAssetIds.map(imageField),
    gridSize: seed.gridSize,
    order: seed.order,
    ...(seed.siteUrl && { siteUrl: seed.siteUrl }),
    ...(seed.siteText && { siteText: seed.siteText }),
  };

  await client.createOrReplace(doc);
  console.log(`  done: ${doc._id}`);
}

async function main() {
  for (const seed of SEED_PROJECTS) {
    await migrateProject(seed);
  }
  console.log(`\nMigrated ${SEED_PROJECTS.length} projects into dataset "${SANITY_DATASET ?? 'production'}".`);
}

main().catch((err) => {
  console.error('\nMigration failed:', err);
  process.exit(1);
});
