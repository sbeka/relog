export interface AppState {
  items: Item[];
  clients: Client[];
  dataIsLoaded: boolean;
}

export interface Item {
  id: number;
  type: string;
  price: number;
  coords: Coords;
  client_id: number;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
}

export interface Coords {
  lat: number;
  long: number;
}
