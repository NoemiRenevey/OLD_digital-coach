import React from 'react'
import { Link } from 'gatsby'

import { FaFlask } from "react-icons/fa"

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const CategoryTag = ({category}) => {
    const { slug, short_title: shortTitle } = category

    return (
        <span css={cardCategory}>
            <Link to={`/${slug}`}><FaFlask />  {shortTitle}</Link>
        </span>
    )
}

export default CategoryTag

const cardCategory = css`
    display: block;    
    margin: 5px 0 2px;

    a {
        color: ${colors.midgrey};

        :hover {
            text-decoration: none;
            color: ${colors.accent};
            transition: color .2s linear;
        }
    }
`
