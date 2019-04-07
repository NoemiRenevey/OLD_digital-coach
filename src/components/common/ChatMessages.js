import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const ChatMessages = ( props ) => {
    const messages = props.chatMessages

    return (
        <ul css={chatMessagesList}>
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
    padding: 0;
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