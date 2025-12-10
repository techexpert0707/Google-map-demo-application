import {
  AddressComponent,
  AddressFromMap,
  AddressType
} from '@/components/types/map';

export const getAddressFromMapAddress = (
  addressFromMap: AddressFromMap,
  type: AddressType
): string => {
  const component = addressFromMap?.find((component: AddressComponent) =>
    component?.types?.includes(type)
  );
  return component?.short_name || '';
};