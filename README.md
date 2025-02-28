# PH Address Provider API

This project is an API for managing Philippine addresses. It provides endpoints for retrieving address information.

## Features
- Retrieve Countries
- Retrieve Regions
- Retrieve Provinces
- Retrieve Cities
- Retrieve Barangays

## Requirements
- Node.js
- npm

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Jushiro012623/ph-address-provider-api
    ```
2. Navigate to the project directory:
    ```bash
    cd ph-address-provider-api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm run dev
    ```
2. The API will be available at `http://localhost:5000`.

## Endpoints
- `GET /api/v1/countries` - Retrieve a list of all countries.
- `GET /api/v1/ph/regions` - Retrieve a list of all regions in the Philippines.
- `GET /api/v1/ph/provinces/:region_code` - Retrieve all provinces within a specified region.
- `GET /api/v1/ph/cities/:province_code` - Retrieve all cities within a specified province.
- `GET /api/v1/ph/barangays/:city_code` - Retrieve all barangays within a specified city.
## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request
