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
    userType: number
}

export interface Address{
    city: string,
    zipCode: string,
    street: string,
    houseNumber: string
}

export interface EEvent{
    id: number
    title: string,
    startDate: Date | null,
    endDate: Date | null,
    locationId: number
    location: Location
    username: string,
    eventType: string,
    ticketsAvailable: number,
    ticketPrice: number,
    picture: string | undefined
}

export interface EventBlock {
    date: Date,
    eventDTOs: EEvent[]
}

export interface Location {
    locationId: number,
    address: Address,
    venue: string
}

