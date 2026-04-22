import { MetadataRoute } from "next";
import { createClient } from "../lib/supabase/server";
import { roomIdToSlug } from "../lib/roomSlug";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mystayinmadinah.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: rooms } = await supabase.from("rooms").select("id, updated_at");
  const { data: tours } = await supabase.from("tours").select("id, updated_at");

  const roomUrls: MetadataRoute.Sitemap = (rooms ?? []).map((room) => ({
    url: `${BASE_URL}/rooms/${roomIdToSlug(room.id)}`,
    lastModified: room.updated_at ? new Date(room.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tourUrls: MetadataRoute.Sitemap = (tours ?? []).map((tour) => ({
    url: `${BASE_URL}/tours`,
    lastModified: tour.updated_at ? new Date(tour.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/rooms`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...roomUrls, ...tourUrls];
}
