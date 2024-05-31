import React from 'react'
import Hero from '../Components/Hero'
import profile from '../Image/profile.png';

function Homepage() {
    return (
        <>
            <Hero
                profile={profile}
            />
        </>
    )
}

export default Homepage