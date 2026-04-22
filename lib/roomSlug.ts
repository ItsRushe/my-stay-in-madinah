export const ROOM_ID_TO_SLUG: Record<string, string> = {
  'executive-king': 'garden-oasis-queen-suite',
  'premium-double': 'classic-king-room',
  'deluxe-twin': 'classic-twin-room',
  'family-suite': 'terrace-king-room',
  'standard-twin': 'standard-twin-room',
};

export const ROOM_SLUG_TO_ID: Record<string, string> = Object.fromEntries(
  Object.entries(ROOM_ID_TO_SLUG).map(([id, slug]) => [slug, id])
);

export function roomIdToSlug(id: string): string {
  return ROOM_ID_TO_SLUG[id] ?? id;
}

export function roomSlugToId(slug: string): string {
  return ROOM_SLUG_TO_ID[slug] ?? slug;
}
