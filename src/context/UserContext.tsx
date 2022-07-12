import { createContext } from "react";
import { User } from "../models/domain";

interface IUserContext {
    user: User;
    setUser: (user: User) => void
}

const defaultState = {
    user: {
          userId: 0,
          username: 'User Context Username',
          email: '',
          contactName: '',
          phoneNumber: '',
          address: {
            city: '',
            zipCode: '',
            street: '',
            houseNumber: ''
          },
          addressId: 0,
          events: [],
          picture: '',
          userType: 0 
        },
    setUser: () => {}
}

const UserContext = createContext<IUserContext>(defaultState)

export default UserContext
