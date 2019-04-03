import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

class Sidebar extends React.Component {
    constructor(props){
        super(props)
        this.state = { isReleased: false }
        this.releaseSidebar = this.releaseSidebar.bind(this)
    }
    releaseSidebar(){
        let { isReleased } = this.state
        window.scrollY > this.prev ?
            !isReleased && this.setState({ isReleased: true })
            :
            isReleased && this.setState({ isReleased: false })

        this.prev = window.scrollY
    }
    componentDidMount(){
        window.addEventListener(`scroll`, this.releaseSidebar)
    }
    componentWillUnmount(){
        window.removeEventListener(`scroll`,this.releaseSidebar)
    }

    render(){
        let releaseClass = this.state.isReleased ? `toc-released` : ``

        return (
            <div css={sidebarSection} >
                <div dangerouslySetInnerHTML={{ __html: this.props.table }} css={tableOfCont} className={releaseClass} />
            </div>
        )
    }
}

export default Sidebar

/*
 * 
 * CSS
 * 
 */

const sidebarSection = css`
    position: absolute;
    left: -250px;
    top: 0;
    width: 200px;
    background-color: ${colors.whitegrey};
    border-radius: 10px;
    padding: 20px;

    ul {
        list-style: none;
        padding: 0;

        li {
            padding-left: 0;
            line-height: 1.8rem;
            font-size: 1.5rem;

            a {
                color: ${colors.midgrey};

                :hover {
                    text-decoration: none;
                }
            }

            ul {
                li {
                    font-size: 1.4rem;
                }
            }
        }
    }
`

const tableOfCont = css`
`