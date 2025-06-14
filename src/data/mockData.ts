import { Ship, User, Cargo, Match } from '../types';

export const mockShips: Ship[] = [
  {
    id: '1',
    name: 'Ocean Pioneer',
    type: 'bulk_carrier',
    dwt: 75000,
    currentPort: 'Hamburg',
    nextAvailableDate: '2024-02-15',
    position: { lat: 53.5511, lng: 9.9937 },
    owner: 'Baltic Shipping Co.',
    images: ['https://images.pexels.com/photos/163726/belgium-antwerp-shipping-163726.jpeg'],
    specifications: {
      length: 225,
      beam: 32,
      draft: 14.5,
      builtYear: 2018,
      flag: 'Marshall Islands'
    },
    ratePerDay: 12000
  },
  {
    id: '2',
    name: 'Atlantic Star',
    type: 'container',
    dwt: 95000,
    currentPort: 'Rotterdam',
    nextAvailableDate: '2024-02-20',
    position: { lat: 51.9244, lng: 4.4777 },
    owner: 'European Maritime Ltd.',
    images: ['https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg'],
    specifications: {
      length: 280,
      beam: 40,
      draft: 16,
      builtYear: 2020,
      flag: 'Cyprus'
    },
    ratePerDay: 18000
  },
  {
    id: '3',
    name: 'Nordic Wave',
    type: 'tanker',
    dwt: 115000,
    currentPort: 'Oslo',
    nextAvailableDate: '2024-02-10',
    position: { lat: 59.9139, lng: 10.7522 },
    owner: 'Scandinavian Fleet',
    images: ['https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg'],
    specifications: {
      length: 240,
      beam: 42,
      draft: 15.8,
      builtYear: 2019,
      flag: 'Norway'
    },
    ratePerDay: 22000
  }
];

export const mockCargos: Cargo[] = [
  {
    id: '1',
    commodity: 'Iron Ore',
    quantity: 70000,
    loadingPort: 'Narvik',
    dischargePort: 'Hamburg',
    laycanStart: '2024-02-15',
    laycanEnd: '2024-02-20',
    charterer: 'Steel Corp International',
    description: 'High-grade iron ore pellets for steel production'
  },
  {
    id: '2',
    commodity: 'Containers',
    quantity: 2500,
    loadingPort: 'Rotterdam',
    dischargePort: 'Singapore',
    laycanStart: '2024-02-25',
    laycanEnd: '2024-03-05',
    charterer: 'Global Trade Solutions',
    description: 'Mixed containerized cargo - electronics and machinery'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Sarah Nielsen',
  email: 'sarah@balticshipping.com',
  type: 'shipowner',
  company: 'Baltic Shipping Co.',
  verified: true
};

export const mockMatches: Match[] = [
  {
    id: '1',
    shipId: '1',
    cargoId: '1',
    userId: '1',
    matchedAt: '2024-01-20T10:30:00Z',
    status: 'negotiating'
  },
  {
    id: '2',
    shipId: '2',
    userId: '1',
    matchedAt: '2024-01-19T15:45:00Z',
    status: 'pending'
  }
];