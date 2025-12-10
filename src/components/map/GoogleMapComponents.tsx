import location from '@/assets/img/location-pin.svg';
import { getAddressFromMapAddress } from '@/utils/fucntions';
import findCurrentLocation from '@/assets/img/current-location.svg';

import { useState, useEffect, FC } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useAppDispatch, useAppSelector } from '@/utils/redux';
import { ADD_LOCATION, GET_LOCATION_LIST } from '@/store/app/map.slice';
import LocationList from '@/components/map/LocationList';
import { env } from '../../../env';

type GoogleMapComponentT = {
  name?: string;
};
const GoogleMapComponent: FC<GoogleMapComponentT> = ({
  name = 'google map'
}) => {
  const dispatch = useAppDispatch();
  const [map, setMap] = useState<google.maps.Map>();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.LatLngLiteral>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY
  });
  const location_list = useAppSelector(GET_LOCATION_LIST);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPlace) {
      getPlaceDetails();
    }
  }, [selectedPlace]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedPlace({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    }
  };
  //locate selected place
  const locateMeAndSetPlace = () => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          if (map) {
            map.panTo(currentLocation);
          } else {
            console.error('Map not yet loaded');
          }
        },
        error => {
          console.log(
            'Maps does not have permission to use your location',
            error
          );
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  //render default pointer
  useEffect(() => {
    if (isLoaded && location_list?.location_list && map) {
      renderMarkers();
    }
  }, [isLoaded, location_list, map]);

  const renderMarkers = () => {
    location_list?.location_list?.map(address => {
      new google.maps.Marker({
        position: { lat: address.lat, lng: address.lng },
        map: map,
        icon: {
          url: location
        }
      });
    });
  };
  //get place details
  const getPlaceDetails = () => {
    if (!selectedPlace) {
      console.error('Selected place is undefined.');
      return;
    }
    setIsBouncing(true);
    const geocoder = new window.google.maps.Geocoder();
    geocoder?.geocode({ location: selectedPlace }, (results, status) => {
      if (status === 'OK') {
        if (results?.[0]) {
          const addressFromMap = results[0]?.address_components;
          const formattedAddress = results[0]?.formatted_address;
          dispatch(
            ADD_LOCATION({
              formattedAddress: formattedAddress,
              address: {
                apartment: getAddressFromMapAddress(
                  addressFromMap,
                  'street_number'
                ),
                street: getAddressFromMapAddress(addressFromMap, 'route'),
                zipCode: getAddressFromMapAddress(
                  addressFromMap,
                  'postal_code'
                ),
                city: getAddressFromMapAddress(addressFromMap, 'locality'),
                state: getAddressFromMapAddress(
                  addressFromMap,
                  'administrative_area_level_1'
                )
              },
              lat: selectedPlace.lat,
              lng: selectedPlace.lng,
              place_id: results[0]?.place_id
            })
          );
        }
      } else {
        console.error(
          'Geocode was not successful for the following reason:',
          status
        );
      }
    });
    setTimeout(() => {
      setIsBouncing(false);
    }, 1000);
  };

  const renderMap = () => {
    const mapOptions = {
      disableDefaultUI: false // Disable all default UI controls,,
    };

    return (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100vh', borderRadius: 5 }}
        zoom={15}
        onClick={handleMapClick}
        onLoad={map => setMap(map)}
        options={mapOptions}
        id={name}
        key={name}
        center={selectedPlace || { lat: 39.74, lng: -101.23 }}
      >
        {selectedPlace && (
          <Marker
            position={selectedPlace}
            icon={{
              url: location
            }}
            animation={isBouncing ? google.maps.Animation.BOUNCE : undefined}
            zIndex={20}
          />
        )}
        <img
          src={findCurrentLocation}
          alt="current"
          onClick={locateMeAndSetPlace}
          className="absolute bottom-44 right-0 z-10 rounded-5 cursor-pointer border-none bg-none"
        />
        {location_list?.location_list?.length !== 0 && (
          <div className="absolute top-24 left-3 z-10">
            <LocationList setSelectedPlace={setSelectedPlace} />
          </div>
        )}
      </GoogleMap>
    );
  };

  return (
    <div className="map">
      {loadError && 'Error loading maps'}
      {isLoaded ? renderMap() : 'Loading maps'}
    </div>
  );
};

export default GoogleMapComponent;