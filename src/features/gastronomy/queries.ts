import "server-only";
import { dishes, restaurants } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { forLocaleWithFallback, imageSrc } from "@/lib/content/utils";

export interface DishCard {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface RestaurantCard {
  id: string;
  name: string;
  description: string;
  location: string;
  specialty: string;
  rating: number;
  image: string;
}

export function getDishes(locale: Locale = DEFAULT_LOCALE): DishCard[] {
  return forLocaleWithFallback(dishes, locale).map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    category: dish.category,
    image: imageSrc(dish.image),
  }));
}

export function getRestaurants(locale: Locale = DEFAULT_LOCALE): RestaurantCard[] {
  return forLocaleWithFallback(restaurants, locale).map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    location: restaurant.location,
    specialty: restaurant.specialty,
    rating: restaurant.rating,
    image: imageSrc(restaurant.image),
  }));
}
