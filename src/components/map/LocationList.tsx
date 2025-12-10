import { GET_LOCATION_LIST, REMOVE_LOCATION } from '@/store/app/map.slice';
import { useAppDispatch, useAppSelector } from '@/utils/redux';
import { List, ScrollArea, Text, TextInput } from '@mantine/core';
import { IconMapPinFilled, IconSearch, IconX } from '@tabler/icons-react';
import { AddressT } from '@/components/types/map';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import NoDataFound from '@/components/common/NoDataFound';
import { CSVLink } from 'react-csv';
import { headers } from '@/helpers/constant';

interface LocationListT {
  setSelectedPlace: Dispatch<
    SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
}
const LocationList: FC<LocationListT> = ({ setSelectedPlace }) => {
  const dispatch = useAppDispatch();
  const location_list = useAppSelector(GET_LOCATION_LIST);

  const removeLocationFromList = (place_id: string) => {
    dispatch(REMOVE_LOCATION(place_id));
  };
  const setLocation = (location: AddressT) => {
    setSelectedPlace({
      lat: location.lat,
      lng: location.lng
    });
  };
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter locations based on search query
  const filteredLocations = location_list?.location_list?.filter(
    (location: AddressT) =>
      location.formattedAddress
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[300px] md:w-[500px]  p-5 pb-6 bg-white rounded relative">
      <TextInput
        placeholder="Search address"
        styles={{
          input: {
            backgroundColor: 'white',
            color: 'black'
          }
        }}
        leftSection={<IconSearch size={20} />}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <ScrollArea h={'calc(100vh - 300px)'} scrollbarSize={4}>
        {' '}
        {filteredLocations?.length ? (
          <List
            spacing="md"
            size="sm"
            center
            icon={<IconMapPinFilled size={20} />}
            className=" pt-3"
            styles={{
              itemWrapper: {
                width: '100%',
                alignSelf: 'center'
              },
              itemLabel: {
                width: '100%'
              }
            }}
          >
            {filteredLocations?.map((location: AddressT) => (
              <List.Item
                key={location.place_id}
                className="cursor-pointer bg-[#f3f3f3] px-5 py-1.5 rounded-lg min-h-[68px] flex"
              >
                <div className="flex justify-between items-center gap-5">
                  <div onClick={() => setLocation(location)}>
                    <Text
                      lineClamp={2}
                      className="font-semibold text-[#222] break-words leading-6"
                    >
                      {' '}
                      {location.formattedAddress}
                    </Text>
                    <p className="text-gray-400 font-semibold">
                      Latitude : {location.lat?.toFixed(6)} Longitude :{' '}
                      {location.lng?.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <IconX
                      size={25}
                      color="gray"
                      onClick={() => removeLocationFromList(location?.place_id)}
                    />
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
        ) : (
          <NoDataFound />
        )}
      </ScrollArea>
      {filteredLocations?.length !== 0 && (
        <div className="absolute right-5 bottom-0 ">
          <CSVLink
            data={filteredLocations}
            headers={headers}
            filename={`location-list-${new Date().toLocaleString()}.csv`}
          >
            Download CSV
          </CSVLink>
        </div>
      )}
    </div>
  );
};

export default LocationList;