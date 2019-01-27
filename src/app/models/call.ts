export class Call {
  id: string;
  callTypeId: string;
  callStatusId: string;
  receivedDateTime: Date;
  dispatchedDateTime: Date;
  dispatchByPersonId: string;
  complainantPerson: {
    id: string;
    isBusiness: boolean;
    businessName: string;
    fullName: string;
  };
  locationPrimary: {
    id: string;
    latitude: number;
    longitude: number;
    city: string;
  };
}
