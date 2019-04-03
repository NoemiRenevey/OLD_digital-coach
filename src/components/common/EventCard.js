import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const EventCard = ({ event }) => {
    const eventSlug = event.slug
    const eventName = event.name
    const excerpt = event.excerpt
    const date = event.date
    const location = event.location
    const city = event.city
    const type = event.type
    const address = event.address
    const eventLink = event.link
    const eventLinkCta = event.link_cta

    return (
        <div css={eventCard}>
            <h4>{eventName}</h4>
            <p>{excerpt}</p>
            <a href={eventLink} alt={eventSlug}>{eventLinkCta}</a>
        </div>
    )
}

export default EventCard

const eventCard = css`
    width: 30%;
    border: 1px solid ${colors.whitegrey};
    border-radius: 5px;
    margin: 10px 20px;
    padding: 20px;

    h4 {
        margin-top: 0;
    }
`
