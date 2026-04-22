import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { ROOM_ID_TO_SLUG } from './lib/roomSlug';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.replit.app", "*.spock.replit.dev"],
  async redirects() {
    return Object.entries(ROOM_ID_TO_SLUG).map(([id, slug]) => ({
      source: `/rooms/${id}`,
      destination: `/rooms/${slug}`,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
