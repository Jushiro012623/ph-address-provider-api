export interface IBarangay {
    id: number,
    region_code: number | string,
    province_code: number | string,
    city_code: number | string,
    brgy_code: number | string,
    brgy_name: string,
    createdAt: Date,
    updatedAt: Date,
}