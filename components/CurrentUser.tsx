import React, { createContext, useState } from 'react';

const UserContext = createContext();

function CurrentUser({ children }) {
    // if anything needs to be passed into any other file, toss it in here.

    //     [name    ,   setter   ]  useState<type>(starting value)
    const [username, setUsername] = useState<string>('fail');
    const [userId, setUserId] = useState<int>(-1);
    
    const value = { 
        username, setUsername,
        userId, setUserId,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, CurrentUser };
