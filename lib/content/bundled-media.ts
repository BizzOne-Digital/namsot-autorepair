import type {
  ContentBlogPost,
  ContentGalleryItem,
  ContentService,
  ContentTeamMember,
} from "./types";
import {
  defaultBlogPosts,
  defaultGalleryItems,
  defaultServices,
  defaultTeamMembers,
} from "./defaults";

function usesClientPhoto(url: string): boolean {
  return url.includes("/client-");
}

/** Apply bundled client photography when defaults ship real shop photos. */
export function mergeServiceImages(
  services: ContentService[],
): ContentService[] {
  const bySlug = new Map(defaultServices.map((service) => [service.slug, service]));

  return services.map((service) => {
    const bundled = bySlug.get(service.slug);
    if (!bundled || !usesClientPhoto(bundled.imageUrl)) {
      return service;
    }

    return {
      ...service,
      imageUrl: bundled.imageUrl,
      imageAlt: bundled.imageAlt,
    };
  });
}

export function mergeTeamImages(members: ContentTeamMember[]): ContentTeamMember[] {
  return members.map((member) => {
    const bundled = defaultTeamMembers.find((item) => item.order === member.order);
    if (!bundled || !usesClientPhoto(bundled.imageUrl)) {
      return member;
    }

    return {
      ...member,
      name: bundled.name,
      role: bundled.role,
      bio: bundled.bio,
      imageUrl: bundled.imageUrl,
      imageAlt: bundled.imageAlt,
    };
  });
}

export function mergeGalleryImages(
  items: ContentGalleryItem[],
): ContentGalleryItem[] {
  const byTitle = new Map(defaultGalleryItems.map((item) => [item.title, item]));

  return items.map((item, index) => {
    const bundled = byTitle.get(item.title) ?? defaultGalleryItems[index];
    if (!bundled || !usesClientPhoto(bundled.imageUrl)) {
      return item;
    }

    return {
      ...item,
      title: bundled.title,
      imageUrl: bundled.imageUrl,
      imageAlt: bundled.imageAlt,
    };
  });
}

export function mergeBlogImages(posts: ContentBlogPost[]): ContentBlogPost[] {
  const bySlug = new Map(defaultBlogPosts.map((post) => [post.slug, post]));

  return posts.map((post) => {
    const bundled = bySlug.get(post.slug);
    if (!bundled || !usesClientPhoto(bundled.imageUrl)) {
      return post;
    }

    return {
      ...post,
      imageUrl: bundled.imageUrl,
      imageAlt: bundled.imageAlt,
    };
  });
}
