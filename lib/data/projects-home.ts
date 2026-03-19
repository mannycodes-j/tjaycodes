export type ProjectItem = {
  key: string
  name: string
  eyebrow: string
  image: string
  imagePosition?: string
  title: string
  summary: string
  highlights: string[]
  outcome: string
}

export const projectsHome: ProjectItem[] = [
  {
    key: 'ecommerce-arbitrage',
    name: 'eCommerce Arbitrage',
    eyebrow: 'Commerce Intelligence',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 30%',
    title: 'Automated eCommerce Arbitrage Platform',
    summary:
      'This system scans Amazon products and compares alternatives across major retailers to surface margin-positive deals at scale.',
    highlights: [
      'Automated deal discovery and validation',
      'Fee and shipping-aware margin estimates',
      'Continuous monitoring for pricing shifts',
    ],
    outcome:
      'Turns manual sourcing into a repeatable, scalable reselling workflow.',
  },
  {
    key: 'real-estate-scraping',
    name: 'Real Estate Scraping',
    eyebrow: 'Market Intelligence',
    image: '/assets/recaptcha.gif',
    imagePosition: '50% 50%',
    title: 'Real Estate Listing Intelligence',
    summary:
      'Structured collection pipelines gather listing updates, price movement, and neighborhood metadata from target portals.',
    highlights: [
      'Normalization of inconsistent listing formats',
      'Pricing and location trend extraction',
      'Analysis-ready datasets for acquisition teams',
    ],
    outcome: 'Faster market analysis and more confident acquisition timing.',
  },
  {
    key: 'shopify-ebay',
    name: 'Shopify-eBay Integration',
    eyebrow: 'Marketplace Operations',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 45%',
    title: 'Cross-Market Product Sync Automation',
    summary:
      'Product records are extracted, mapped, and synchronized between Shopify and eBay to reduce operational friction.',
    highlights: [
      'Listing consistency across channels',
      'Inventory and pricing alignment',
      'Reduced duplication in publishing workflows',
    ],
    outcome: 'Higher listing velocity with fewer inventory conflicts.',
  },
  {
    key: 'google-map-scraping',
    name: 'Google Map Scraping',
    eyebrow: 'Geo Lead Intelligence',
    image: '/assets/image2%20(1).gif',
    imagePosition: '50% 46%',
    title: 'Local Business Discovery Engine',
    summary:
      'A map-driven extraction engine captures business listings, categories, ratings, and geo context for prospecting.',
    highlights: [
      'Region-aware lead segmentation',
      'Category and rating enrichment',
      'High-volume list preparation for outreach',
    ],
    outcome: 'Improved targeting quality for local and regional campaigns.',
  },
  {
    key: 'twitter-believe-checker',
    name: 'Twitter-Believe.app Checker',
    eyebrow: 'Social Verification',
    image: '/assets/recaptcha.gif',
    imagePosition: '50% 50%',
    title: 'Social Signal Verification Checker',
    summary:
      'A monitoring utility validates account and engagement conditions against targeting criteria in near real-time.',
    highlights: [
      'Qualification checks at scale',
      'Status-change monitoring workflows',
      'Resilient handling of frequent platform shifts',
    ],
    outcome: 'Less manual monitoring and faster candidate qualification.',
  },
  {
    key: 'lazada-account-generator',
    name: 'Lazada Account Generator',
    eyebrow: 'Account Automation',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 28%',
    title: 'Account Creation Workflow Automation',
    summary:
      'Controlled creation flows automate account setup with checkpoint validations and resilient retry behavior.',
    highlights: [
      'Configurable validation guardrails',
      'Automated retry orchestration',
      'Operational visibility with event logs',
    ],
    outcome:
      'Consistent throughput while preserving account quality standards.',
  },
  {
    key: 'roland-garros-entry',
    name: 'Roland Garros Generator/Entry',
    eyebrow: 'Time-Critical Workflows',
    image: '/assets/image2%20(1).gif',
    imagePosition: '50% 50%',
    title: 'High-Demand Entry Submission Automation',
    summary:
      'Timed-entry automation executes submission flows with strict sequencing where latency and precision matter.',
    highlights: [
      'End-to-end state tracking',
      'Duplicate and invalid attempt protection',
      'Adaptive retry handling under load',
    ],
    outcome: 'Higher success rates in high-traffic submission windows.',
  },
  {
    key: 'axs-password-reset',
    name: 'AXS Password Reset Automator',
    eyebrow: 'Recovery Automation',
    image: '/assets/image2%20(1).gif',
    imagePosition: '50% 47%',
    title: 'Credential Recovery Flow Automation',
    summary:
      'Password recovery automation manages verification-aware reset journeys with deterministic state transitions.',
    highlights: [
      'Reduced manual reset operations',
      'Audit-friendly event logging',
      'Optimized completion tracking',
    ],
    outcome: 'Reliable and auditable reset outcomes at operational scale.',
  },
]
