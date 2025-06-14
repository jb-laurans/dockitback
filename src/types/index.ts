export interface User {
  id: string;
  name: string;
  email: string;
  type: 'charterer' | 'shipowner';
  company: string;
  avatar?: string;
  verified: boolean;
}

export interface Ship {
  id: string;
  name: string;
  type: 'bulk_carrier' | 'container' | 'tanker' | 'general_cargo';
  dwt: number; // Deadweight tonnage
  currentPort: string;
  nextAvailableDate: string;
  position: {
    lat: number;
    lng: number;
  };
  owner: string;
  images: string[];
  specifications: {
    length: number;
    beam: number;
    draft: number;
    builtYear: number;
    flag: string;
  };
  ratePerDay?: number;
}

export interface Cargo {
  id: string;
  commodity: string;
  quantity: number;
  loadingPort: string;
  dischargePort: string;
  laycanStart: string;
  laycanEnd: string;
  charterer: string;
  description: string;
}

export interface Match {
  id: string;
  shipId: string;
  cargoId?: string;
  userId: string;
  matchedAt: string;
  status: 'pending' | 'accepted' | 'negotiating' | 'confirmed';
}