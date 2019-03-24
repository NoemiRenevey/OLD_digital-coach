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
                i > 0 && `, `,
                <Link to={`/objectif/${_.kebabCase(goal.id)}/`} key={i}><FaCheck /> {goal.name}</Link>
            ])}
        </div>
    )
}

export default GoalsTags

const cardGoals = css`
    margin: 20px 0 20px;
    font-size: 1.4rem;
    line-height: 1.15em;
    color: white;

    a {
        background-color: ${colors.whitegrey}; 
        color: ${colors.midgrey};
        padding: 4px 8px;
        border-radius: 5px;

        svg {
            margin-bottom: 2px;
        }

        :hover {
            text-decoration: none;
            color: ${colors.accent};
            transition: color .2s linear;
        }
    }
`