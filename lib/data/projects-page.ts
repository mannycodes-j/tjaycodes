export type ProjectCard = {
  key: string
  name: string
  category: string
  image: string
  imagePosition?: string
  summary: string
  impact: string
  stack: string[]
  cli: string
}

export const projectsPage: ProjectCard[] = [
  {
    key: 'ecommerce-arbitrage',
    name: 'Automated eCommerce Arbitrage Platform',
    category: 'Commerce Intelligence',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 30%',
    summary:
      'Scans Amazon and cross-retailer catalogs, then scores margin-positive opportunities with fee-aware calculations.',
    impact: 'Turns manual sourcing into a reliable, repeatable pipeline.',
    stack: [
      'Automated deal discovery',
      'Fee-aware pricing logic',
      'Continuous monitoring',
    ],
    cli: 'ag run ecommerce-arbitrage',
  },
  {
    key: 'real-estate-scraping',
    name: 'Real Estate Listing Intelligence',
    category: 'Market Intelligence',
    image: '/assets/recaptcha.gif',
    imagePosition: '50% 50%',
    summary:
      'Collects listing changes, pricing shifts, and neighborhood metadata from target portals into analysis-ready datasets.',
    impact: 'Accelerates market analysis and acquisition decisions.',
    stack: ['Structured extraction', 'Trend analysis', 'Geo-data enrichment'],
    cli: 'ag run market-intel',
  },
  {
    key: 'shopify-ebay',
    name: 'Shopify-eBay Product Sync Automation',
    category: 'Marketplace Operations',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 45%',
    summary:
      'Syncs product, inventory, and pricing records across Shopify and eBay while keeping listings consistent.',
    impact: 'Improves listing velocity and reduces stock conflicts.',
    stack: ['API orchestration', 'Inventory sync', 'Mapping rules'],
    cli: 'ag run shopify-ebay-sync',
  },
  {
    key: 'google-map-scraping',
    name: 'Local Business Discovery Engine',
    category: 'Geo Lead Intelligence',
    image: '/assets/image2%20(1).gif',
    imagePosition: '50% 46%',
    summary:
      'Extracts map listings, categories, ratings, and geo context for high-quality outbound targeting.',
    impact: 'Raises lead quality for local and regional campaigns.',
    stack: ['Geo segmentation', 'Data enrichment', 'Lead preparation'],
    cli: 'ag run local-discovery',
  },
]

export const iconLines = ['M7 12l5-7 5 7', 'M7 12l5 7 5-7', 'M12 5v14']
