import { VehicleColor } from './VehicleColor';

import { VehicleEngineType } from './VehicleEngineType';

import { VehicleFuelType } from './VehicleFuelType';

import { VehicleMake } from './VehicleMake';

import { VehicleModel } from './VehicleModel';

import { VehicleStyle } from './VehicleStyle';

import { VehicleTransmissionType } from './VehicleTransmissionType';

import { VehicleType } from './VehicleType';

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

