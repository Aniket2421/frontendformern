import React from 'react'

const Logout = () => {
    const handelLogout = () => {
        localStorage.setItem("userData", {})
        window.location.href = "/login"
    }
    return (
        <div className='logout-btn'>
            <button onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default Logout