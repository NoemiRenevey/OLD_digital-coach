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
        <div css={eventCard} className="slideInUp">
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
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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

        &:hover {
            text-decoration: none;
        }
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