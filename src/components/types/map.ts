export interface Address {
  apartment: string;
  street: string;
  zipCode: string;
  city: string;
  state: string;
}

export interface Place {
  lat?: number;
  lng?: number;
  place_id?: string;
}

export interface AddressT {
  formattedAddress: string;
  address: Address;
  lat: number;
  lng: number;
  place_id: string;
}

export interface coordinateT {
  lat?: string;
  lng?: string;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export type AddressFromMap = AddressComponent[] | undefined;

export type AddressType = 'street_number' | 'route' | 'postal_code' | 'locality' | 'administrative_area_level_1';