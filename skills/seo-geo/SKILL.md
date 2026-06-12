---
name: seo-geo
description: Use when the user wants to improve website search visibility, AI search visibility, schema markup, indexing, metadata, or keyword targeting.
---

target = $ARGUMENTS

Optimize the target for both traditional search engines and AI search engines.

## SEO vs GEO

SEO optimizes for **ranking**; GEO (Generative Engine Optimization) optimizes for **being cited** by AI search engines — ChatGPT, Perplexity, Google AI Overview, Copilot, Claude. Optimize both, but strategies diverge: keyword density helps SEO yet *hurts* GEO (-10%); citations & statistics are irrelevant to ranking but boost GEO +37-40%. When they conflict, flag it.

## Princeton GEO Methods

Measured visibility boosts, Princeton/IIT Delhi GEO study (KDD 2024). Prioritize by boost.

| Method | Boost | What it means |
|--------|-------|---------------|
| Cite Sources | +40% | Authoritative references with attribution |
| Statistics | +37% | Specific numbers and data points |
| Quotations | +30% | Expert quotes with attribution |
| Authoritative Tone | +25% | Confident, expert language |
| Easy-to-Understand | +20% | Simplified complex concepts |
| Technical Terms | +18% | Domain-specific terminology |
| Unique Words | +15% | Vocabulary diversity |
| Fluency | +15-30% | Readability and flow |
| Keyword Stuffing | **-10%** | **Actively harmful for GEO** |

**Best combination:** Fluency + Statistics. For domain-specific guidance, see [references/geo-research.md](./references/geo-research.md).

## Platform-Specific Knowledge

| Platform | Primary Index | Key Differentiator |
|----------|--------------|-------------------|
| ChatGPT | Web (Bing-based) | Content-Answer Fit is 55% of ranking. 30-day-old content gets 3.2x more citations |
| Perplexity | Own + Google | FAQ Schema and PDFs are prioritized. Semantic relevance over keywords |
| Google AI Overview | Google | E-E-A-T + structured data. Only 15% overlap with traditional Top 10 |
| Copilot | Bing | Must be Bing-indexed. Microsoft ecosystem (LinkedIn, GitHub) signals help |
| Claude | **Brave Search** | Factual density preferred. Crawl-to-refer ratio is 38,065:1 — extremely selective |

Full ranking factors per platform: [references/platform-algorithms.md](./references/platform-algorithms.md)

## AI Bot Access

Allow these user-agent strings in robots.txt — sites often block them unknowingly.

| Bot | Platform |
|-----|----------|
| GPTBot, ChatGPT-User | OpenAI |
| PerplexityBot | Perplexity |
| ClaudeBot, anthropic-ai | Anthropic |
| Bingbot, msnbot | Microsoft/Copilot |
| Googlebot | Google |
| Applebot-Extended | Apple |

## Schema Markup

FAQPage schema → single highest GEO impact (+40% AI visibility). Prioritize over other schema types. For ready-to-use JSON-LD templates (FAQPage, Article, WebPage, SoftwareApplication, Organization, Product, HowTo, BreadcrumbList, LocalBusiness, SpeakableSpecification): [references/schema-templates.md](./references/schema-templates.md)

## Tools

### Scripts (in `scripts/`)

| Script | API Required | Purpose |
|--------|-------------|---------|
| `seo_audit.py <url>` | No | Technical audit: meta tags, robots.txt, sitemap, load time, schema, AI bot access |
| `keyword_research.py <keyword>` | DataForSEO | Keyword ideas, search volume, difficulty |
| `serp_analysis.py <keyword>` | DataForSEO | Top 20 Google results analysis |
| `backlinks.py <domain>` | DataForSEO | Backlink profile |
| `domain_overview.py <domain>` | DataForSEO | Domain metrics, traffic, rankings |
| `autocomplete_ideas.py <keyword>` | DataForSEO | Autocomplete suggestions |
| `competitor_gap.py <domains>` | DataForSEO | Keyword gap analysis |
| `related_keywords.py <keyword>` | DataForSEO | Related keyword suggestions |

DataForSEO scripts require `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` env vars.

### Validation

- Google Rich Results Test: `https://search.google.com/test/rich-results?url={encoded_url}`
- Schema.org Validator: `https://validator.schema.org/?url={encoded_url}`

### Complementary skills

- **WebSearch** for keyword research and competitor analysis
- **twitter** / **reddit** skills for SEO community intelligence

## References

- [references/geo-research.md](./references/geo-research.md) — Princeton GEO research: 9 methods with examples and domain-specific recommendations
- [references/platform-algorithms.md](./references/platform-algorithms.md) — Detailed ranking factors per platform
- [references/schema-templates.md](./references/schema-templates.md) — JSON-LD templates for all major schema types
- [references/seo-checklist.md](./references/seo-checklist.md) — Prioritized audit checklist (P0/P1/P2)
- [references/tools-and-apis.md](./references/tools-and-apis.md) — Tools, APIs, browser extensions
- [references/google-docs-summary.md](./references/google-docs-summary.md) — Google Search Central quick reference
- [examples/opc-skills-case-study.md](./examples/opc-skills-case-study.md) — Real-world optimization example
