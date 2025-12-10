export interface headers {
  label: string;
  key: string;
}
export const headers = [
  { label: 'Address', key: 'formattedAddress' },
  { label: 'Street', key: 'address.street' },
  { label: 'Zip Code', key: 'address.zipCode' },
  { label: 'City', key: 'address.city' },
  { label: 'State', key: 'address.state' },
  { label: 'Latitude', key: 'lat' },
  { label: 'Longitude', key: 'lng' },
  { label: 'Place ID', key: 'place_id' }
];