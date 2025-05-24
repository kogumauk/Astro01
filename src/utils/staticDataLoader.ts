// Static data loader for build-time data processing
import { readFileSync } from 'fs';
import { join } from 'path';
import type { BusinessListing } from '../types/BusinessListing';
import { transformBusinessData, type JSONDataFile } from './dataLoader';

// This will be populated at build time
let cachedListings: BusinessListing[] | null = null;

/**
 * Load business listings at build time
 */
export function loadBusinessListingsSync(): BusinessListing[] {
  if (cachedListings) {
    return cachedListings;
  }

  const listings: BusinessListing[] = [];
  
  try {
    // Define the data directory path
    const dataDir = join(process.cwd(), 'data', 'listings');
    
    // List of JSON files to load
    const jsonFiles = [
      '20250420_2311_Fish_and_Chip_shops_in_Brixham,_Devon.json',
      '20250420_2311_Fish_and_Chip_shops_in_Budleigh_Salterton,_Devon.json'
    ];
    
    for (const filename of jsonFiles) {
      try {
        const filePath = join(dataDir, filename);
        const fileContent = readFileSync(filePath, 'utf-8');
        const jsonData: JSONDataFile = JSON.parse(fileContent);
        
        if (jsonData.results && Array.isArray(jsonData.results)) {
          for (const result of jsonData.results) {
            try {
              const transformed = transformBusinessData(result);
              listings.push(transformed);
            } catch (error) {
              console.warn(`Error transforming business data from ${filename}:`, error);
            }
          }
        }
      } catch (fileError) {
        console.warn(`Error loading file ${filename}:`, fileError);
      }
    }
    
    cachedListings = listings;
    return listings;
    
  } catch (error) {
    console.error('Error loading business listings:', error);
    return [];
  }
}

/**
 * Get sample data for development/testing
 */
export function getSampleListings(): BusinessListing[] {
  return [
    {
      id: 'brixham-fish-restaurant',
      name: { text: 'Brixham Fish Restaurant & Takeaway' },
      formattedAddress: '22 The Quay, Brixham TQ5 8AW, UK',
      addressComponents: [
        { longText: '22', shortText: '22', types: ['street_number'] },
        { longText: 'The Quay', shortText: 'The Quay', types: ['route'] },
        { longText: 'Brixham', shortText: 'Brixham', types: ['postal_town'] },
        { longText: 'TQ5 8AW', shortText: 'TQ5 8AW', types: ['postal_code'] }
      ],
      location: { latitude: 50.3973947, longitude: -3.5128581 },
      rating: 4.6,
      reviewCount: 484,
      websiteUri: 'http://brixhamfishrestaurant.com/',
      businessStatus: 'OPERATIONAL',
      priceLevel: 'PRICE_LEVEL_INEXPENSIVE',
      primaryTypeDisplayName: { text: 'Restaurant' },
      nationalPhoneNumber: '01803 123456',
      category: 'fish-and-chips',
      subcategory: 'restaurant',
      verified: true,
      town: 'Brixham',
      county: 'Devon',
      postcode: 'TQ5 8AW'
    },
    {
      id: 'simply-fish-brixham',
      name: { text: 'Simply Fish' },
      formattedAddress: '68-74 Fore St, Brixham TQ5 8AF, UK',
      addressComponents: [
        { longText: '68-74', shortText: '68-74', types: ['street_number'] },
        { longText: 'Fore Street', shortText: 'Fore St', types: ['route'] },
        { longText: 'Brixham', shortText: 'Brixham', types: ['postal_town'] },
        { longText: 'TQ5 8AF', shortText: 'TQ5 8AF', types: ['postal_code'] }
      ],
      location: { latitude: 50.395843899999996, longitude: -3.5126364 },
      rating: 4.3,
      reviewCount: 1200,
      websiteUri: 'http://simplyfishrestaurant.co.uk/',
      businessStatus: 'OPERATIONAL',
      priceLevel: 'PRICE_LEVEL_MODERATE',
      primaryTypeDisplayName: { text: 'Seafood Restaurant' },
      nationalPhoneNumber: '01803 859585',
      category: 'fish-and-chips',
      subcategory: 'seafood-restaurant',
      verified: true,
      town: 'Brixham',
      county: 'Devon',
      postcode: 'TQ5 8AF'
    },
    {
      id: 'rockfish-brixham',
      name: { text: 'Rockfish' },
      formattedAddress: 'New Fish Quay, Brixham TQ5 8AW, UK',
      addressComponents: [
        { longText: 'New Fish Quay', shortText: 'New Fish Quay', types: ['premise'] },
        { longText: 'Brixham', shortText: 'Brixham', types: ['postal_town'] },
        { longText: 'TQ5 8AW', shortText: 'TQ5 8AW', types: ['postal_code'] }
      ],
      location: { latitude: 50.397940999999996, longitude: -3.512194 },
      rating: 4.5,
      reviewCount: 2688,
      websiteUri: 'https://therockfish.co.uk/pages/brixham-seafood-restaurant',
      businessStatus: 'OPERATIONAL',
      priceLevel: 'PRICE_LEVEL_MODERATE',
      primaryTypeDisplayName: { text: 'Seafood Restaurant' },
      nationalPhoneNumber: '01803 850872',
      category: 'fish-and-chips',
      subcategory: 'seafood-restaurant',
      verified: true,
      town: 'Brixham',
      county: 'Devon',
      postcode: 'TQ5 8AW'
    },
    {
      id: 'fishionados-brixham',
      name: { text: 'Fishionados' },
      formattedAddress: '10 Summercourt Way, Brixham TQ5 0DY, UK',
      addressComponents: [
        { longText: '10', shortText: '10', types: ['street_number'] },
        { longText: 'Summercourt Way', shortText: 'Summercourt Way', types: ['route'] },
        { longText: 'Brixham', shortText: 'Brixham', types: ['postal_town'] },
        { longText: 'TQ5 0DY', shortText: 'TQ5 0DY', types: ['postal_code'] }
      ],
      location: { latitude: 50.385506199999995, longitude: -3.5301746 },
      rating: 4.4,
      reviewCount: 217,
      websiteUri: 'https://www.fishionados.co.uk/',
      businessStatus: 'OPERATIONAL',
      priceLevel: 'PRICE_LEVEL_INEXPENSIVE',
      primaryTypeDisplayName: { text: 'Takeout Restaurant' },
      nationalPhoneNumber: '01803 340908',
      category: 'fish-and-chips',
      subcategory: 'takeaway',
      verified: true,
      town: 'Brixham',
      county: 'Devon',
      postcode: 'TQ5 0DY'
    },
    {
      id: 'davids-fish-chips',
      name: { text: "David's Fish & Chips" },
      formattedAddress: '64 Bolton St, Brixham TQ5 9DH, UK',
      addressComponents: [
        { longText: '64', shortText: '64', types: ['street_number'] },
        { longText: 'Bolton Street', shortText: 'Bolton St', types: ['route'] },
        { longText: 'Brixham', shortText: 'Brixham', types: ['postal_town'] },
        { longText: 'TQ5 9DH', shortText: 'TQ5 9DH', types: ['postal_code'] }
      ],
      location: { latitude: 50.3917463, longitude: -3.5145964 },
      rating: 4.5,
      reviewCount: 552,
      websiteUri: 'http://www.davids-chippy.co.uk/',
      businessStatus: 'OPERATIONAL',
      priceLevel: 'PRICE_LEVEL_MODERATE',
      primaryTypeDisplayName: { text: 'Takeout Restaurant' },
      nationalPhoneNumber: '01803 855771',
      category: 'fish-and-chips',
      subcategory: 'takeaway',
      verified: true,
      town: 'Brixham',
      county: 'Devon',
      postcode: 'TQ5 9DH'
    }
  ];
}
