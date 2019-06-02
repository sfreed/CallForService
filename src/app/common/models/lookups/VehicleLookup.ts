import { VehicleColor } from './vehicle/VehicleColor';

import { VehicleEngineType } from './vehicle/VehicleEngineType';

import { VehicleFuelType } from './vehicle/VehicleFuelType';

import { VehicleMake } from './vehicle/VehicleMake';

import { VehicleModel } from './vehicle/VehicleModel';

import { VehicleStyle } from './vehicle/VehicleStyle';

import { VehicleTransmissionType } from './vehicle/VehicleTransmissionType';

import { VehicleType } from './vehicle/VehicleType';

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

