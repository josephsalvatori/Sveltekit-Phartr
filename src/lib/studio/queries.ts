import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export const foodQuery = groq`*[_type == "foodCategory"]{...,"foods": *[_type == "food" && references(^._id)]}`;
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]`;
export const pagesQuery = groq`*[_type == "page" && defined(slug.current)] | order(_createdAt desc)`;
export const homeQuery = groq`*[_type == "home"][0]`;
export const settingsQuery = groq`*[_type == "settings"][0]`;

export interface Page {
	_type: "page",
	_createdAt: string,
	title?: string,
	slug: Slug
};