import { defaultValues as restaurantDefaultValues, Restaurant } from './restaurant.model';

export interface Reservation {
  id?: number;
  reservationCode?: string;
  restaurant: Restaurant;
  reservationStart: string;
  reservationEnd: string;
  numberOfPlaces: number;
  tableNumber?: number;
  notes: string;
}

export const defaultValues = (): Reservation => ({
  reservationStart: '',
  restaurant: restaurantDefaultValues(),
  reservationEnd: '',
  numberOfPlaces: 0,
  tableNumber: 0,
  notes: '',
});
