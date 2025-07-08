import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/forum-logo.png'

const Forumify = () => {
    return (
        <div>
            <Link to='/'>
                <img className='w-[50px]' src={logo} alt="" />
            </Link>
        </div>
    );
};

export default Forumify;