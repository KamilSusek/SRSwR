export interface Restaurant {
  id?: number;
  restaurantName: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
}

export const defaultValues = (): Restaurant => ({
  restaurantName: '',
  city: '',
  street: '',
  postalCode: '',
  description: '',
});
