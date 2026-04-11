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
- Default display: SAR
- DB stores prices in GBP
- SAR rate = 5.0 (adjusted for clean math: 20 GBP = SAR 100, 25 GBP = SAR 125)
- Supported: SAR, GBP, USD, EUR

## Localisation (next-intl)
- Locale stored in `NEXT_LOCALE` cookie (no URL prefix)
- Supported locales: `en`, `ar`
- Message files: `messages/en.json`, `messages/ar.json`
- Config: `i18n/request.ts`
- Arabic: RTL layout, Tajawal font, set via `lang="ar"` + `dir="rtl"` on `<html>`

## Rooms
| Room ID | Name | GBP | SAR |
|---|---|---|---|
| premium-double | Classic King | 20 | 100 |
| deluxe-twin | Classic Twin | 20 | 100 |
| standard-twin | Standard Twin | 20 | 100 |
| executive-king | Terrace King | 25 | 125 |
| family-suite | Garden Oasis King Suite | 25 | 125 |

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
