import React from 'react'
import Hero from '../Components/Hero'
import profile from '../Image/profile.png';
import profile2 from '../Image/profileedi.png'
import profilePic from "../Image/profilePic.png"

function Homepage() {
    return (
        <>
            <Hero
                profile={profilePic}
            />
        </>
    )
}

export default Homepage