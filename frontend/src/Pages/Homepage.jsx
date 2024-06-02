import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import profilePic from "../Image/profilePic.png"
import AboutMeSegment from '../Components/AboutMeSegment'
import SkillSegment from '../Components/Skill/SkillSegment'
import { GetAllSkill } from '../Services/SkillService'

function Homepage() {

    const [skillList, setSkillList] = useState([]);

    const getAllSkill = () => {
        GetAllSkill()
            .then((res) => {
                setSkillList(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getAllSkill();
    }, [])

    return (
        <>
            <Hero
                profile={profilePic}
            />
            <AboutMeSegment />
            <SkillSegment
                skillList={skillList}
            />
        </>
    )
}

export default Homepage