const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const FONTS = '/tmp/brand-fonts';
const OUT = path.join(__dirname, '..', 'My-Stay-in-Madinah-Brand-Guide.pdf');

const C = {
  ivory: '#F9F8F4',
  ink: '#1B2420',
  gold: '#BA6A42',
  goldHover: '#A05835',
  inkSoft: '#3A4541',
  inkMuted: '#6B7470',
  divider: '#E5E2DA',
  white: '#FFFFFF',
};

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 56;

const doc = new PDFDocument({ size: 'A4', margin: 0, info: {
  Title: 'My Stay in Madinah — Brand Guidelines',
  Author: 'My Stay in Madinah',
  Subject: 'Brand Identity Guidelines',
  Creator: 'My Stay in Madinah',
}, autoFirstPage: true });

doc.registerFont('Display', `${FONTS}/PlayfairDisplay-Regular.ttf`);
doc.registerFont('DisplayBold', `${FONTS}/PlayfairDisplay-Bold.ttf`);
doc.registerFont('Body', `${FONTS}/Jost-Regular.ttf`);
doc.registerFont('BodyMed', `${FONTS}/Jost-Medium.ttf`);
doc.registerFont('BodySemi', `${FONTS}/Jost-SemiBold.ttf`);
doc.registerFont('Arabic', `${FONTS}/Tajawal-Regular.ttf`);
doc.registerFont('ArabicBold', `${FONTS}/Tajawal-Bold.ttf`);

doc.pipe(fs.createWriteStream(OUT));

const drawIvoryBg = () => doc.save().rect(0, 0, PAGE_W, PAGE_H).fill(C.ivory).restore();

const goldDivider = (x, y, w = 32) => {
  doc.save().rect(x, y, w, 0.8).fill(C.gold).restore();
};

const eyebrow = (text, x, y, color = C.gold) => {
  doc.font('BodySemi').fontSize(8).fillColor(color)
    .text(text, x, y, { characterSpacing: 2.4, lineBreak: false });
};

const drawCenteredEyebrow = (text, y, color = C.gold) => {
  const lineY = y + 4;
  const text_w = doc.font('BodySemi').fontSize(9).widthOfString(text, { characterSpacing: 2.6 });
  const lineLen = 36;
  const gap = 12;
  const totalW = lineLen + gap + text_w + gap + lineLen;
  const startX = (PAGE_W - totalW) / 2;
  doc.save().rect(startX, lineY, lineLen, 0.8).fill(color).restore();
  doc.font('BodySemi').fontSize(9).fillColor(color)
    .text(text, startX + lineLen + gap, y, { characterSpacing: 2.6, lineBreak: false });
  doc.save().rect(startX + lineLen + gap + text_w + gap, lineY, lineLen, 0.8).fill(color).restore();
};

const pageHeader = (label) => {
  doc.font('BodySemi').fontSize(8).fillColor(C.gold)
    .text(label, M, 48, { characterSpacing: 2.2, lineBreak: false });
  doc.font('BodySemi').fontSize(8).fillColor(C.inkMuted)
    .text('MY STAY IN MADINAH', M, 48, { width: PAGE_W - 2 * M, align: 'right', characterSpacing: 2.2, lineBreak: false });
};

const sectionTitle = (eb, title, y) => {
  eyebrow(eb, M, y);
  goldDivider(M, y + 14, 18);
  doc.font('Display').fontSize(26).fillColor(C.ink)
    .text(title, M, y + 26, { width: PAGE_W - 2 * M });
};

// =================== PAGE 1: COVER ===================
drawIvoryBg();

const iconLogoPath = path.join(__dirname, '..', 'public', 'icon-logo.png');
const textLogoPath = path.join(__dirname, '..', 'public', 'text-logo.png');

drawCenteredEyebrow('EST. MADINAH', 96, C.gold);

const iconW = 220;
const iconH = (500 / 1315) * iconW;
const iconY = 160;
doc.image(iconLogoPath, (PAGE_W - iconW) / 2, iconY, { width: iconW });

const textLogoW = 360;
const textLogoH = (500 / 6638) * textLogoW;
const textLogoY = iconY + iconH + 28;
doc.image(textLogoPath, (PAGE_W - textLogoW) / 2, textLogoY, { width: textLogoW });

const taglineY = textLogoY + textLogoH + 36;
doc.font('Display').fontSize(28).fillColor(C.ink)
  .text('Brand Guidelines', 0, taglineY, { align: 'center', width: PAGE_W, characterSpacing: 0.4, lineBreak: false });

const yearY = taglineY + 44;
doc.font('Body').fontSize(10).fillColor(C.inkMuted)
  .text('Edition 01  ·  2026', 0, yearY, { align: 'center', width: PAGE_W, characterSpacing: 1.5, lineBreak: false });

const storyY = yearY + 80;
doc.save().rect(M + 60, storyY, PAGE_W - 2 * (M + 60), 160).fillOpacity(0.04).fill(C.ink).restore();

doc.fillOpacity(1);
doc.font('Body').fontSize(11).fillColor(C.inkSoft)
  .text(
    '"My Stay in Madinah" is a boutique direct-booking brand for premium accommodation in the holy city of Madinah. Our identity is rooted in calm, refined hospitality — drawing from the warm earth of Arabia and the quiet dignity of sacred ground. This guide defines the visual language that carries that promise across every touchpoint.',
    M + 80, storyY + 24,
    { width: PAGE_W - 2 * (M + 80), align: 'center', lineGap: 4, characterSpacing: 0.1 }
  );

goldDivider((PAGE_W - 24) / 2, storyY + 200, 24);

const footerY = PAGE_H - 80;
doc.font('BodySemi').fontSize(8).fillColor(C.ink)
  .text('MYSTAYINMADINAH.COM', 0, footerY, { align: 'center', width: PAGE_W, characterSpacing: 2.4, lineBreak: false });
doc.font('Body').fontSize(8).fillColor(C.inkMuted)
  .text('Boutique Hospitality  ·  Madinah, Saudi Arabia', 0, footerY + 14, { align: 'center', width: PAGE_W, characterSpacing: 1, lineBreak: false });

// =================== PAGE 2: COLOUR & TYPE ===================
doc.addPage({ size: 'A4', margin: 0 });
drawIvoryBg();
pageHeader('PAGE 02  ·  VISUAL SYSTEM');

let y = 90;
sectionTitle('01  ·  COLOUR PALETTE', 'A grounded, earthen palette.', y);
y += 86;

const palette = [
  { name: 'Ink', hex: '#1B2420', rgb: 'R 27  ·  G 36  ·  B 32', role: 'Primary text  ·  Dark surfaces  ·  Premium contrast', bg: C.ink, text: C.ivory },
  { name: 'Gold', hex: '#BA6A42', rgb: 'R 186  ·  G 106  ·  B 66', role: 'Accent  ·  Calls-to-action  ·  Decorative lines', bg: C.gold, text: C.ivory },
  { name: 'Ivory', hex: '#F9F8F4', rgb: 'R 249  ·  G 248  ·  B 244', role: 'Page background  ·  Light surfaces', bg: C.ivory, text: C.ink, border: true },
  { name: 'Gold Hover', hex: '#A05835', rgb: 'R 160  ·  G 88  ·  B 53', role: 'Button hover  ·  Darker terracotta variation', bg: C.goldHover, text: C.ivory },
];

const swatchW = (PAGE_W - 2 * M - 14) / 2;
const swatchH = 110;

palette.forEach((p, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = M + col * (swatchW + 14);
  const sy = y + row * (swatchH + 14);

  doc.save();
  doc.rect(x, sy, swatchW, swatchH).fill(p.bg);
  if (p.border) doc.rect(x, sy, swatchW, swatchH).lineWidth(0.5).strokeColor(C.divider).stroke();
  doc.restore();

  doc.font('DisplayBold').fontSize(20).fillColor(p.text)
    .text(p.name, x + 14, sy + 12, { lineBreak: false });
  doc.fillOpacity(p.bg === C.ivory ? 0.65 : 0.85);
  doc.font('BodySemi').fontSize(8.5).fillColor(p.text)
    .text(p.hex.toUpperCase(), x + 14, sy + 40, { characterSpacing: 1.6, lineBreak: false });
  doc.fillOpacity(p.bg === C.ivory ? 0.55 : 0.7);
  doc.font('Body').fontSize(7).fillColor(p.text)
    .text(p.rgb, x + 14, sy + 54, { characterSpacing: 1, lineBreak: false });
  doc.font('Body').fontSize(7).fillColor(p.text)
    .text(p.role, x + 14, sy + swatchH - 22, { width: swatchW - 28, characterSpacing: 0.5 });
  doc.fillOpacity(1);
});

y += (swatchH + 14) * 2 + 36;

sectionTitle('02  ·  TYPOGRAPHY', 'Three voices in harmony.', y);
y += 80;

const LABEL_X = M + 280;
const typeRow = (heading, fontName, sample, label, body, opts = {}) => {
  doc.font(opts.headingFont || heading).fontSize(opts.headingSize || 30).fillColor(C.ink)
    .text(sample, M, y, { lineBreak: false, width: 260, ellipsis: false });
  doc.font('BodySemi').fontSize(7.5).fillColor(C.gold)
    .text(label, LABEL_X, y + 4, { characterSpacing: 1.8, lineBreak: false });
  doc.font('BodySemi').fontSize(10).fillColor(C.ink)
    .text(fontName, LABEL_X, y + 18, { lineBreak: false });
  doc.font('Body').fontSize(8.5).fillColor(C.inkMuted)
    .text(body, LABEL_X, y + 34, { width: PAGE_W - M - LABEL_X, lineGap: 1.5 });
  y += opts.rowH || 60;
};

typeRow('Display', 'Playfair Display', 'Boutique.', 'DISPLAY  ·  HEADINGS', 'For section titles, hero copy, and editorial moments. Serif weights 400–700 + italic.');
typeRow('Display', 'Jost', 'Boutique.', 'BODY  ·  UI  ·  NUMBERS',
  'Clean modern sans-serif for body copy, UI, prices and numbers. Weights 300–600.',
  { headingFont: 'Body', headingSize: 28 });
typeRow('Display', 'Tajawal', 'إقامة', 'ARABIC  ·  ALL TEXT (LANG="AR")',
  'Used automatically across all text in the Arabic locale. Headings and body. Weights 400–700.',
  { headingFont: 'ArabicBold', headingSize: 28 });

// =================== PAGE 3: LOGO, VOICE & CONTACT ===================
doc.addPage({ size: 'A4', margin: 0 });
drawIvoryBg();
pageHeader('PAGE 03  ·  APPLICATION');

let y3 = 90;
sectionTitle('03  ·  LOGO MARK', 'Our key opens a city.', y3);
y3 += 80;

const lockupW = (PAGE_W - 2 * M - 14) / 2;
const lockupH = 130;

doc.save().rect(M, y3, lockupW, lockupH).fill(C.white)
  .rect(M, y3, lockupW, lockupH).lineWidth(0.5).strokeColor(C.divider).stroke().restore();
const iconLockW = 100;
const iconLockH = (500 / 1315) * iconLockW;
doc.image(iconLogoPath, M + (lockupW - iconLockW) / 2, y3 + (lockupH - iconLockH) / 2, { width: iconLockW });
doc.font('BodySemi').fontSize(7.5).fillColor(C.inkMuted)
  .text('PRIMARY ICON  ·  ON LIGHT', M, y3 + lockupH + 8, { width: lockupW, align: 'center', characterSpacing: 1.8, lineBreak: false });

doc.save().rect(M + lockupW + 14, y3, lockupW, lockupH).fill(C.ink).restore();
doc.image(iconLogoPath, M + lockupW + 14 + (lockupW - iconLockW) / 2, y3 + (lockupH - iconLockH) / 2, { width: iconLockW });
doc.font('BodySemi').fontSize(7.5).fillColor(C.inkMuted)
  .text('PRIMARY ICON  ·  ON DARK', M + lockupW + 14, y3 + lockupH + 8, { width: lockupW, align: 'center', characterSpacing: 1.8, lineBreak: false });

y3 += lockupH + 36;

doc.save().rect(M, y3, PAGE_W - 2 * M, 90).fill(C.white)
  .rect(M, y3, PAGE_W - 2 * M, 90).lineWidth(0.5).strokeColor(C.divider).stroke().restore();
const wordW = 300;
const wordH = (500 / 6638) * wordW;
doc.image(textLogoPath, M + (PAGE_W - 2 * M - wordW) / 2, y3 + (90 - wordH) / 2, { width: wordW });
doc.font('BodySemi').fontSize(7.5).fillColor(C.inkMuted)
  .text('WORDMARK  ·  USE WITH OR WITHOUT THE ICON', M, y3 + 100, { width: PAGE_W - 2 * M, align: 'center', characterSpacing: 1.8, lineBreak: false });

y3 += 134;

sectionTitle('04  ·  VOICE & TONE', 'Considered words.', y3);
y3 += 70;

const tones = [
  { label: 'WE ARE', body: 'Calm  ·  Refined  ·  Sincere  ·  Hospitable', tone: 'positive' },
  { label: 'WE ARE NOT', body: 'Loud  ·  Touristy  ·  Pushy  ·  Generic', tone: 'negative' },
];

tones.forEach((t, i) => {
  const x = M + i * ((PAGE_W - 2 * M) / 2);
  const w = (PAGE_W - 2 * M) / 2 - 10;
  doc.font('BodySemi').fontSize(8).fillColor(t.tone === 'positive' ? C.gold : C.inkMuted)
    .text(t.label, x, y3, { characterSpacing: 2, lineBreak: false });
  doc.font('Display').fontSize(15).fillColor(t.tone === 'positive' ? C.ink : C.inkMuted)
    .text(t.body, x, y3 + 16, { width: w });
});

y3 += 72;

sectionTitle('05  ·  CONTACT', 'Reach the studio.', y3);
y3 += 64;

doc.save().rect(M, y3, PAGE_W - 2 * M, 110).fill(C.ink).restore();

const contactRows = [
  { label: 'WEB', value: 'mystayinmadinah.com' },
  { label: 'WHATSAPP', value: '+966 508 151 408' },
  { label: 'LOCATION', value: 'Madinah, Saudi Arabia' },
];

contactRows.forEach((row, i) => {
  const ry = y3 + 22 + i * 24;
  doc.font('BodySemi').fontSize(8).fillColor(C.gold)
    .text(row.label, M + 24, ry, { characterSpacing: 2.2, lineBreak: false });
  doc.font('BodyMed').fontSize(11).fillColor(C.ivory)
    .text(row.value, M + 130, ry - 1, { lineBreak: false });
});

const footY = PAGE_H - 50;
doc.font('Body').fontSize(7).fillColor(C.inkMuted)
  .text('© My Stay in Madinah  ·  Brand Guidelines  ·  Edition 01  ·  2026',
    M, footY, { width: PAGE_W - 2 * M, align: 'center', characterSpacing: 1.4, lineBreak: false });

doc.end();
doc.on('end', () => console.log('Brand guide written to:', OUT));
