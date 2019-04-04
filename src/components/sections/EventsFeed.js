import React from 'react'

import EventCard from '../common/EventCard'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const EventsFeed = ({ events }) => {
    return (
        <section css={eventsSection}>
            <div css={eventsIntro}>
                <h2>Rendez-Vous! Checkpoints Activation</h2>
                <p className="big">Besoin d'un coup de boost, de poser des questions, et de partager vos expériences d'activation digitale avec le reste de la communauté ? Rejoignez-nous lors des événements ou des Webinars/LIVE.</p>
            </div>
            <div css={eventsFeed}>
                {events.map(({ node }) => (
                    // Include the markup for each event - components/common/EventCard.js
                    <EventCard key={node.slug} event={node} />
                ))}
            </div>
        </section>
    )
} 

export default EventsFeed

/**
 * CSS
 */

const eventsSection = css`
    margin-top: 80px;
    margin-bottom: 80px;
`

const eventsIntro = css`
    text-align: left;
`

const eventsFeed = css`
    display: flex;
    justify-content: flex-start;
    margin: 10px -20px;
`