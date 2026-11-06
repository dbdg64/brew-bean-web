# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users: college students studying near City College who need a place to sit, study, and work with affordable coffee and chai. Confirmed first priority (user-confirmed in init interview).

Other audiences (all welcome): office workers on a break who want a quick coffee and sandwich; families gathering on weekends.

Job: the student studies and feels at home; the worker takes a happy, quick break; the family spends a cozy weekend visit.

## Product Purpose

Brew & Bean is a small neighborhood cafe. It serves freshly brewed coffee and chai, fresh food made during the day, juices, cakes, and desserts at friendly prices, to sit with or take away. It exists so anyone nearby can come in, relax, and feel at home without anything fancy.

Success means (user-confirmed): visitors choose to visit in person — the site drives foot traffic first, with WhatsApp ordering as a supporting convenience.

## Positioning

A neighborhood study-friendly cafe, not a fancy expensive one. Every cup is brewed to order and food is made fresh during the day, at $2–$5 prices, with free Wi-Fi and comfortable study seating, right near City College — a combination that a neighboring chain cafe would not truthfully copy.

## Operating Context

- Physical cafe at 123 Market Road, Near City College (demo/dummy address — see Open decision below).
- Open daily: 8 AM to 9 PM.
- Dine-in and takeaway; ordering a takeaway via WhatsApp.
- Weekly rhythms: students study weekdays (hero promise includes studying and working), workers come on breaks, families on weekends.

## Capabilities and Constraints

- The website is a static single-page site (index.html + style.css + script.js at project root) with sections: hero, about, menu, reviews, contact, footer; a mobile menu toggle, auto-updating footer year, an "open now" indicator (open 8 AM–9 PM local), and scroll-reveal animations. There is no ordering, payment, account, or reservation backend — WhatsApp links (wa.me/123456789) are the only ordering channel.
- Menu and prices (USD, as listed in index.html): Masala Chai $2; Cappuccino $3; Cold Coffee $3.5; Hot Chocolate $3.5; Grilled Cheese Sandwich $4; Chicken Club Sandwich $5; Paneer Wrap $4.5; Chocolate Brownie $2.5; Cheese Cake Slice $4; Blueberry Muffin $2.5; Fresh Orange Juice $3; Mango Shake $3.5.
- Services shown: Dine-in, Takeaway, Free Wi-Fi, Study-friendly sitting, WhatsApp order.
- Open decision: whether contact details, testimonials, and pricing are real or demo placeholders. The brand notes explicitly mark address/phone as "fake, just for demo" and the user did not answer this question in init. Until confirmed, treat them as unverified — do not present the fake contact details or the reviews as verified real facts, and do not fabricate additional ones.

## Brand Commitments

- Name: Brew & Bean.
- Tagline: "Freshly brewed happiness, every morning."
- Vibe and voice: warm, friendly, cozy; affordable and homey; plain, welcoming tone ("everyone is welcome").
- Story: started in 2022 by two college friends who loved coffee and chai; now a small neighborhood cafe.
- Binding visual inputs from brand notes (recorded, not extended here): Main Brown #5C3D2E, Cream background #FFF8E7, Accent Orange #E67E22, Text dark #2B211A; headings Poppins Bold or Playfair Display; body Poppins Regular.
- Instagram handle shown: @brewandbean.cafe.

## Evidence on Hand

- info-about-brand.md — brand name, tagline, story, target customers, services, menu and prices, colors, fonts, and contact details (marked fake for demo).
- index.html — the full site copy, menu, testimonials, hours, and contact block as currently presented.
- style.css, script.js — current implementation of the site's behavior and presentation.
- The hero's background photo is a stock Unsplash photo (index.html), not a photo of the actual cafe.
- No verified customer counts, sales data, real reviews, real contact information, logo files, menu photos, or other dated evidence exist in this project. Future work must not invent testimonials, customers, benchmarks, or deployment claims.

## Product Principles

1. Study-first comfort. The primary user's job is to settle in and study, so that need decides trade-offs first.
2. Affordable and homey, never fancy. Prices, menu, and tone stay approachable for students.
3. Fresh and brewed to order. Food made during the day and every cup brewed to order are the core product facts.
4. Make visiting easy. Address, hours, and the WhatsApp path exist to turn a browser into a walk-in guest.
