export interface User{
    address: Address | undefined,
    addressId: number | undefined,
    contactName: string,
    email: string,
    events: Event[] | undefined,
    phoneNumber: string,
    picture: string,
    userId: number,
    username: string
}

export interface Address{
    city: string,
    zipCode: string,
    street: string,
    houseNumber: string
}

export interface EEvent{
    eventId: number
    title: string,
    startDate: Date,
    endDate: Date,
    location: Location
    user: User | undefined,
    username: string,
    eventType: string,
    ticketsAvailable: number,
    picture: string | undefined
}

export interface Location {
    locationId: number,
    address: Address,
    venue: string
}

