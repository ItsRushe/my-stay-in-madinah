import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.replit.app", "*.spock.replit.dev"],
};

export default withNextIntl(nextConfig);
