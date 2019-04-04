import React from 'react'
import { Link } from 'gatsby'

import { FaCheck } from "react-icons/fa"

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const GoalsTags = ({ goals }) => {

    return (
        <div css={cardGoals}>
            {goals.map((goal, i) => [
                // i > 0 && `, `,
                <Link to={`/objectif/${_.kebabCase(goal.id)}/`} key={i}><FaCheck /> {goal.name}</Link>
            ])}
        </div>
    )
}

export default GoalsTags

const cardGoals = css`
    font-size: 1.4rem;
    line-height: 1.15em;
    color: white;
    position: absolute;
    top: 9px;
    left: 8px;

    a {
        background-image: ${colors.gradient1}; 
        color: white;
        padding: 4px 8px;
        border-radius: 5px;
        display: inline-block;
        margin: 0 3px 3px 0;
        transition: 0.5s;
        background-size: 200% auto;

        svg {
            margin-bottom: 2px;
        }

        :hover {
            text-decoration: none;
            // color: ${colors.accent};
            // transition: color .2s linear;
            background-position: right center;
        }
    }
`