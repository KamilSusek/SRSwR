export interface Reservation {
  id?: number;
  reservationCode?: string;
  restaurantName: string;
  reservationStart: string;
  reservationEnd: string;
  numberOfPlaces: number;
  tableNumber?: number;
  notes: string;
}

export const defaultValues = (): Reservation => ({
  restaurantName: '',
  reservationStart: '',
  reservationEnd: '',
  numberOfPlaces: 0,
  tableNumber: 0,
  notes: '',
});
