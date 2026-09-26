export interface Megaproject {
  id: string;
  title: string;
  client: string;
  category: 'Bridges & Marine' | 'Expressways & Corridors' | 'Heavy Civil & High-Rise' | 'Environmental & Industrial' | 'Statutory Governance';
  location: string;
  period: string;
  startYear: number;
  endYear: number | string;
  timelineDate: string;
  manHours: string;
  safetyRecord: string;
  summary: string;
  challenge: string;
  hseSolution: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  imageUrl?: string;
}

export const SIGNATURE_WORKS: Megaproject[] = [
  {
    id: 'ispon-statutory-governance-reform',
    title: 'National Assembly Safety Standards & ISPON Governance Mediation',
    client: 'House of Representatives Committee on Safety Standards & Regulations',
    category: 'Statutory Governance',
    location: 'National Assembly Complex, Abuja, Nigeria',
    period: 'May 2023 – Dec 2025',
    startYear: 2023,
    endYear: 2025,
    timelineDate: '2023 – 2025',
    manHours: 'Multi-Year Parliamentary Mandate',
    safetyRecord: 'Official Resolution & Democratic National Elections (Oct 2024)',
    summary: 'Statutory sub-committee appointment by the 10th House of Representatives to audit institutional disputes, formulate statutory guidelines, and restore regulatory integrity to the Institute of Safety Professionals of Nigeria (ISPON).',
    challenge: 'Resolving multi-year legal, financial, and factional crises that fractured Nigeria\'s statutory safety regulatory body established under the ISPON Act 2014.',
    hseSolution: 'Drafted transparent electoral rules, audited dispute dossiers, conducted public stakeholder conciliations, and supervised the landmark democratic election of national officers.',
    metrics: [
      { label: 'Mandate Duration', value: '30 Months' },
      { label: 'Professionals Impacted', value: '10,000+ Safety Pros' },
      { label: 'Statutory Body', value: 'ISPON Act 2014' },
      { label: 'Outcome', value: 'Unified National Council' }
    ],
    tags: ['National Assembly', 'Statutory Regulation', 'ISPON Act 2014', 'Governance Reform'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'engineered-landfill-bioreactor',
    title: 'Engineered Sanitary Landfill Bioreactor & Leachate Facility',
    client: 'Municipal Waste Authority & Research Consortium',
    category: 'Environmental & Industrial',
    location: 'Regional Environmental Remediation Zone',
    period: '2020 – 2022',
    startYear: 2020,
    endYear: 2022,
    timelineDate: '2020 – 2022',
    manHours: '2.1M Safe Hours',
    safetyRecord: 'Published in European Journal of Environment & Earth Sciences',
    summary: 'Transformation of open uncontrolled municipal dump sites into scientifically engineered multi-barrier sanitary containment cells with active methane capture pipelines.',
    challenge: 'Preventing heavy metal and toxic organic leachate percolation into regional drinking water aquifers while managing explosive fugitive methane gas accumulation.',
    hseSolution: 'Designed dual-geomembrane composite liner barriers, integrated subsurface leachate recirculation sumps, and landfill gas extraction manifolds with continuous infrared gas monitoring.',
    metrics: [
      { label: 'Containment Volume', value: '450,000 m³' },
      { label: 'Aquifer Protection', value: '100% Attenuation' },
      { label: 'Methane Capture', value: '92% Fugitive Control' },
      { label: 'Peer Review', value: 'EJGEO Publication' }
    ],
    tags: ['Environmental Hygiene', 'Methane Extraction', 'Leachate Attenuation', 'Published Research'],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'second-river-niger-bridge',
    title: 'Second River Niger Bridge Marine Civil & Approach Corridors',
    client: 'Federal Ministry of Works & Housing / Julius Berger Nigeria PLC',
    category: 'Bridges & Marine',
    location: 'Asaba – Onitsha Coastal Corridor, Nigeria',
    period: '2018 – 2023',
    startYear: 2018,
    endYear: 2023,
    timelineDate: '2018 – 2023',
    manHours: '18.6M Safe Hours',
    safetyRecord: 'Zero Overwater Lost Time Incidents',
    summary: 'Directing marine safety engineering, deep underwater bored piling, heavy navigational span launching, and coastal wetland approach embankments over the Niger River.',
    challenge: 'Severe water-velocity fluctuations during rainy season flooding, high-elevation pier slipforming, and simultaneous marine barge operations with continuous civilian rivercraft.',
    hseSolution: 'Enforced satellite weather radar wind-cutoff protocols, GPS-tracked personal flotation beacons, dedicated marine rescue vessels on 24/7 standby, and diving decompression logs.',
    metrics: [
      { label: 'Safe Man-Hours', value: '18,600,000+' },
      { label: 'Bridge Span', value: '1.6 km Main Bridge' },
      { label: 'Approach Roads', value: '10.3 km Corridors' },
      { label: 'Marine LTIFR', value: '0.00' }
    ],
    tags: ['Marine Engineering', 'Deep Foundations', 'High-Altitude Slipform', 'Zero Incident'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bodo-bonny-pioneer-corridor',
    title: 'Bodo-Bonny Road & Marine Swampland Pioneer Corridor',
    client: 'Nigeria LNG Limited & FMWH / Julius Berger Nigeria PLC',
    category: 'Bridges & Marine',
    location: 'Rivers State, Niger Delta, Nigeria',
    period: '2017 – Present',
    startYear: 2017,
    endYear: 'Present',
    timelineDate: '2017 – Present',
    manHours: '12.4M Safe Hours',
    safetyRecord: 'Exemplary Environmental & Community Safety Record',
    summary: 'First terrestrial road linking the historic island of Bonny through dense tidal mangrove swamps, incorporating 3 major cross-creek bridges and massive hydraulic sand-filling.',
    challenge: 'Tidal surge variations of up to 2.5 meters daily, hyper-humid tropical microclimates, wildlife/vector hazards, and navigating remote coastal logistical supply chains.',
    hseSolution: 'Pioneered bioclimatic hydration stations, anti-venom medical field protocols, and community-integrated safety observer networks that guaranteed zero civil disruption.',
    metrics: [
      { label: 'Safe Man-Hours', value: '12,400,000+' },
      { label: 'Highway Length', value: '39 km Across Swamps' },
      { label: 'Major Bridges', value: '3 Major Creek Bridges' },
      { label: 'Vector Incidents', value: 'Zero Serious' }
    ],
    tags: ['Mangrove Swampland', 'Marine Piling', 'Extreme Humidity', 'NLNG Corridor'],
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'abuja-expressway-corridors',
    title: 'Abuja Metropolitan Expressway & Interchange Network',
    client: 'Federal Capital Development Authority / Julius Berger Nigeria PLC',
    category: 'Expressways & Corridors',
    location: 'Abuja, Federal Capital Territory, Nigeria',
    period: '2012 – 2024 (Phased Delivery)',
    startYear: 2012,
    endYear: 2024,
    timelineDate: '2012 – 2024',
    manHours: '14.2M Safe Hours',
    safetyRecord: 'Zero Fatalities Across Live Multi-Lane Corridors',
    summary: 'Executive HSE oversight for multi-lane urban arterial corridors, elevated flyovers, and critical junction expansions executed amidst high-density vehicular traffic.',
    challenge: 'Managing high-temperature asphalt laydown (160°C+) during extreme dry-season heat, operating 50-tonne precast girder cranes adjacent to continuous civilian traffic flows.',
    hseSolution: 'Implemented calibrated Wet Bulb Globe Temperature (WBGT) biometric work-rest protocols, automated mobile crash barriers, and drone-guided traffic diversion surveillance.',
    metrics: [
      { label: 'Safe Man-Hours', value: '14,200,000+' },
      { label: 'Corridor Length', value: '45+ km' },
      { label: 'Peak Workforce', value: '1,850 Personnel' },
      { label: 'LTIFR', value: '0.00' }
    ],
    tags: ['Civil Megaproject', 'High-Density Traffic', 'Thermal Stress (WBGT)', 'Julius Berger PLC'],
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cbn-headquarters-highrise',
    title: 'Central Bank of Nigeria Headquarters High-Rise Complex',
    client: 'Central Bank of Nigeria / Julius Berger Nigeria PLC',
    category: 'Heavy Civil & High-Rise',
    location: 'Central Business District, Abuja, Nigeria',
    period: '2000s Legacy & Expansion',
    startYear: 2002,
    endYear: 2008,
    timelineDate: '2002 – 2008',
    manHours: '9.8M Safe Hours',
    safetyRecord: 'AFRISAFE 2000 Award Winner (Safety Section)',
    summary: 'Comprehensive structural safety, deep basement diaphragm walls, tower crane operations, and fire protection systems for Nigeria\'s premier financial institution.',
    challenge: 'Deep excavation adjacent to existing urban foundations, simultaneous high-voltage electrical installations, and multi-tier structural steel rigging in confined urban boundaries.',
    hseSolution: 'Engineered non-punitive near-miss reporting hierarchies and precision crane zone interlocks that earned Julius Berger\'s site safety team the landmark AFRISAFE distinction.',
    metrics: [
      { label: 'Safe Man-Hours', value: '9,800,000+' },
      { label: 'Storeys', value: '12 Floors & Deep Basements' },
      { label: 'Safety Award', value: 'AFRISAFE 2000' },
      { label: 'Fall Incidents', value: 'Zero' }
    ],
    tags: ['High-Rise Engineering', 'Deep Basements', 'Tower Crane Rigging', 'AFRISAFE Award'],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
  }
];
