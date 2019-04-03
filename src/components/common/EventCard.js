import React from 'react'

import { MdConfirmationNumber, MdLiveTv, MdLocationCity } from "react-icons/md";

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const EventCard = ({ event }) => {
    const eventSlug = event.slug
    const eventName = event.name
    const excerpt = event.excerpt
    const eventDate = event.date
    const location = event.location
    const city = event.city
    const type = event.type
    const address = event.address
    const eventLink = event.link
    const eventLinkCta = event.link_cta

    const eventType = (type) => {
        switch (type) {
        case `event`:
            return <span><MdLocationCity /> Événement</span>
        case `webinar`:
            return <span><MdLiveTv /> Webinar</span>
        default:
            return null
        }
    } 

    return (
        <div css={eventCard}>
            <div css={eventMeta}>
                {eventType(type)} le <span>{eventDate}</span>
            </div>
            <h4>{eventName}</h4>
            <p>{excerpt}</p>

            {city &&
                <div css={eventVenue}>
                    <div>
                        {location ? `${location} | ` : null}
                        {city}
                    </div>

                    {address &&
                        <div>
                            {address}
                        </div>
                    }
                </div>
            }

            {eventLink ? <div css={eventCTA}><a href={eventLink} alt={eventSlug}><MdConfirmationNumber /> {eventLinkCta}</a></div>
                : eventLinkCta ? <div css={eventCTA}><MdConfirmationNumber /> {eventLinkCta}</div> : null}
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
        margin-top: 10px;
    }
`

const eventMeta = css`
    font-size: 1.4rem;
    color: ${colors.accent};

    svg {
        margin-bottom: 3px;
    }
`
const eventCTA = css`
    background-color: ${colors.accent3};
    display: inline-block;
    color: white;
    padding: 5px 14px 7px;
    border-radius: 5px;
    text-transform: uppercase;

    a {
        color: white;
    }

    svg {
        margin-bottom: 3px;
    }
`

const eventVenue = css`
    font-size: 1.2rem;
    line-height: 1.4rem;
    background-color: ${colors.whitegrey};
    padding: 10px 20px;
    margin-bottom: 15px;
`