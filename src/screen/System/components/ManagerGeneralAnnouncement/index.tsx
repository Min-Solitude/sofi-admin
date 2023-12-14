import React from 'react'
import Section from '../../../../motion/Section'

type ManagerGeneralAnnouncementProps = {
    className?: string
}

export default function ManagerGeneralAnnouncement({ className }: ManagerGeneralAnnouncementProps) {
    return (
        <Section className={`${className}`}>ManagerGeneralAnnouncement</Section>
    )
}
