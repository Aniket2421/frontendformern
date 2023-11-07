import React, { useState, useEffect } from 'react';
import Merchent from '../MerchentComponet/Merchent';
import UserComponet from '../UserComponet/UserComponet';

const Dashboard = () => {
    const [isMarchant, setIsMarchant] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Load userData from localStorage when the component mounts
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        setUserData(storedUserData);

        if (storedUserData?.userType?.toLowerCase() === "merchant") {
            setIsMarchant(true);
        }
    }, []); // Empty dependency array for one-time initialization

    return (
        <div>
            {
                isMarchant ? (<Merchent userData={userData} />)
                    :
                    (<UserComponet userData={userData} />)
            }
        </div>
    );
}

export default Dashboard;