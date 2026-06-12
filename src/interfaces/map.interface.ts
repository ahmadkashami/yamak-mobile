export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarkerData {
  lat: number;
  lon: number;
  id: number;
  [key: string]: string | number;
}

export type Location = {
  id: number;
  name: string;
  serviceId: number;
  image: string;
  lat: number;
  lon: number;
  phone: string;
  address: string;
};

export type Reagon = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
