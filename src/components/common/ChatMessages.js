import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const ChatMessages = ( props ) => {
    const messages = props.chatMessages
    const boxCSS = props.inBox ? [chatMessagesList, fancyBox] : chatMessagesList

    return (
        <ul css={ boxCSS }>
            {messages.map(({ id, message }) => {

                return (
                    <li key={id}>{message}</li>
                )
            })}
        </ul>
    )
}

export default ChatMessages

const chatMessagesList = css`
    margin-bottom: 0;
    list-style: none;
    overflow: auto; // clearfix


    li {
        padding: 4px 20px;
        border-radius: 20px;
        display: inline-block;
    }

    li:nth-of-type(odd) {
        background-color: ${colors.accent3};
        color: white;
        border-bottom-left-radius: 5px;
    }

    li:nth-of-type(even) {
        background-color: ${colors.whitegrey};
        border-bottom-right-radius: 5px;
        text-align: right;
        float: right;
    }
`

const fancyBox = css`
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    border-radius: 5px;
    border: 1px solid ${colors.whitegrey};
    padding: 20px 20px 10px;
`