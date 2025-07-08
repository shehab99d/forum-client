import React, { useContext } from 'react';
import { AuthContext } from '../Router/Authentication/AuthContext';

const JoinUs = () => {
    const { email } = useContext(AuthContext)
    console.log(email);
    
    return (
        <div>

        </div>
    );
};

export default JoinUs;