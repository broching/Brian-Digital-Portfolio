import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import profilePic from "../Image/profilePic.png"
import AboutMeSegment from '../Components/AboutMeSegment'
import SkillSegment from '../Components/Skill/SkillSegment'
import { GetAllSkill } from '../Services/SkillService'
import ExperienceSegment from '../Components/Experience/ExperienceSegment'
import ProjectSegment from '../Components/Project/ProjectSegment'
import AchievementSegment from '../Components/Achievement/AchievementSegment'
import CcaSegment from '../Components/Cca/CcaSegment'

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
            <ExperienceSegment
                skillList={skillList}
            />
            <ProjectSegment
                skillList={skillList}
            />
            <AchievementSegment
                skillList={skillList}
            />
            <CcaSegment
                skillList={skillList}
            />
        </>
    )
}

export default Homepage