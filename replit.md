# My Stay in Madinah

A Next.js boutique accommodation booking site for Madinah, Saudi Arabia.

## Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **Email:** Resend
- **i18n:** next-intl (Arabic / English)
- **Styling:** Tailwind CSS v4
- **Package manager:** npm
- **Port:** 5000 (`next dev -p 5000 -H 0.0.0.0`)

## Brand
- **Colors:** `#1B2420` (ink), `#BA6A42` (gold/terracotta), `#F9F8F4` (ivory)
- **Fonts:** Playfair Display (headings), Jost (body), Tajawal (Arabic)

## Currency
- Master currency: **SAR** (stored in DB and used as base for all conversions)
- Supported: SAR, GBP, USD, EUR
- Conversion rates (from SAR): GBP × 0.2, USD × 0.267, EUR × 0.234
- `CurrencyProvider.tsx` holds RATES; `PriceDisplay` takes `amountSAR` prop

## Localisation (next-intl)
- Locale stored in `NEXT_LOCALE` cookie (no URL prefix)
- Supported locales: `en`, `ar`
- Message files: `messages/en.json`, `messages/ar.json`
- Config: `i18n/request.ts`
- Arabic: RTL layout, Tajawal font, set via `lang="ar"` + `dir="rtl"` on `<html>`

## Rooms
| Room ID | Name | SAR |
|---|---|---|
| premium-double | Classic King | 100 |
| deluxe-twin | Classic Twin | 100 |
| standard-twin | Standard Twin | 100 |
| executive-king | Terrace King | 95 |
| family-suite | Garden Oasis King Suite | 125 |

## Contact
- WhatsApp: `+966 50 815 1408` (Saudi number: `966508151408`)
- Email: `info@mystayinmadinah.com`

## Key Files
- `app/layout.tsx` — root layout, NextIntlClientProvider, fonts
- `app/globals.css` — Tailwind, theme tokens, RTL/Arabic overrides + RTL layout fixes
- `components/Navbar.tsx` — nav + language switcher + currency toggle (dir="ltr" wrapper for stability)
- `components/Footer.tsx` — footer with translated links
- `components/BookingWidget.tsx` — booking date picker + Stripe checkout
- `components/CurrencyProvider.tsx` — global currency state
- `i18n/request.ts` — next-intl locale resolution from cookie
- `messages/en.json` + `messages/ar.json` — all UI string translations
- `lib/translations/rooms.ts` — Arabic translations for dynamic room data (name, desc, capacity, amenities)
- `lib/translations/tours.ts` — Arabic translations for dynamic tour data (name, desc, duration, group_size)
- `app/actions/booking.ts` — Stripe checkout session creation
