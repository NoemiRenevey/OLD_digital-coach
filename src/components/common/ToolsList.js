import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const ToolsList = ({ tools }) => {
    return (
        tools.map((tool, i) => {
            return (
                <div css={toolList} key={i}>
                    <div css={itemTooltip} className="name-tooltip">
                        {tool.name}
                    </div>

                    {tool.logo && 
                        <Link to={`/outils-digitaux/${tool.id}`}>                                               
                            <Img 
                                alt={tool.name}
                                fixed={tool.logo.childImageSharp.fixed}
                            />
                        </Link>
                    }
                </div>
            )
        })
    )
}

export default ToolsList

/**
 * 
 * CSS
 * 
 */

const toolList = css`
    position: relative;
    flex-shrink: 0;
    margin: 0 0 0 -14px;
    padding: 0;

    :nth-of-type(1) {
        z-index: 1;
        margin: 0;
    }
    :nth-of-type(2) {
        z-index: 2;
    }
    :nth-of-type(3) {
        z-index: 3;
    }
    :nth-of-type(4) {
        z-index: 4;
    }
    :nth-of-type(5) {
        z-index: 5;
    }
    :nth-of-type(6) {
        z-index: 6;
    }
    :nth-of-type(7) {
        z-index: 7;
    }
    :nth-of-type(8) {
        z-index: 8;
    }
    :nth-of-type(9) {
        z-index: 9;
    }
    :nth-of-type(10) {
        z-index: 10;
    }

    :hover .name-tooltip {
        opacity: 1;
        transform: translateY(0px);
    }

    img {
        border-radius: 100%;
        border: 2px solid white;
        box-shadow: rgba(39, 44, 49, .1) 0 2px 3px;
        width: 96% !important;
        height: 96% !important;
    }
`

const itemTooltip = css`
    position: absolute;
    bottom: 105%;
    z-index: 999;
    display: block;
    padding: 6px 12px;
    color: white;
    font-size: 1.2rem;
    letter-spacing: 0.2px;
    white-space: nowrap;
    background: ${colors.darkgrey};
    border-radius: 3px;
    box-shadow: rgba(39, 44, 49, 0.03) 0px 3px 8px;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    transform: translateY(6px);
    pointer-events: none;

    @media (max-width: 650px) {
        display: none;
    }
`