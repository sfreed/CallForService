export interface VehicleLookup {
    vehicleColor: VehicleColor[];
    vehicleEngineType: VehicleEngineType[];
    vehicleFuelType: VehicleFuelType[];
    vehicleMake: VehicleMake[];
    vehicleModel: VehicleModel[];
    vehicleStyle: VehicleStyle[];
    vehicleTransmissionType: VehicleTransmissionType[];
    vehicleType: VehicleType[];
}
export interface VehicleColor {
    id: number;
    vehicleColorCode: string;
    vehicleColorCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleEngineType {
    id: number;
    VehicleEngineTypeCode: string;
    VehicleEngineTypeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleFuelType {
    id: number;
    vehicleFuelTypeCode: string;
    vehicleFuelTypeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleMake {
    id: number;
    vehicleMakeCode: string;
    vehicleMakeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleModel {
    id: number;
    vehicleModelCode: string;
    vehicleModelCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleStyle {
    id: number;
    vehicleStyleCode: string;
    vehicleStyleCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleTransmissionType {
    id: number;
    VehicleTransmissionTypeCode: string;
    VehicleTransmissionTypeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface VehicleType {
    id: number;
    vehicleTypeCode: string;
    vehicleTypeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
