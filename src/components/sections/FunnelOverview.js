import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
const _ = require(`lodash`)

import { GoInfo } from "react-icons/go"
import { MdKeyboardArrowUp, MdUnfoldMore, MdUnfoldLess } from "react-icons/md"
import ChatMessages from '../common/ChatMessages'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

class FunnelOverviewComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allToggled: false,
            individualToggles: {
                isToggled_1: false,
                isToggled_2: false,
                isToggled_3: false,
                isToggled_4: false,
                isToggled_5: false,
                isToggled_6: false,
                isToggled_7: false,
                isToggled_8: false,
            },
        }

        this.handleClick = this.handleClick.bind(this)
        this.toggleAll = this.toggleAll.bind(this)
    }

    handleClick(event, index) {
        const nestedIndividualToggles = this.state.individualToggles
        nestedIndividualToggles[`isToggled_${index}`] = !this.state.individualToggles[`isToggled_${index}`]
        this.setState(() => ({ nestedIndividualToggles }))
    }

    toggleAll() {
        const invertedSingleToggles = this.state.allToggled ?
            _.mapValues(this.state.individualToggles, () => false) :
            _.mapValues(this.state.individualToggles, () => true)

        console.log(`toggleAll`, this.state.allToggled)
        this.setState(state => ({
            allToggled: !state.allToggled,
            individualToggles: invertedSingleToggles,
        }))
    }

    render() {
        const { data } = this.props
        const objectives = data.allGoalsYaml.edges
        const borderColor = (colorCode) => {
            if (colorCode) {
                // console.log("Color:", colors[colorCode])
                // Put in div style={borderColor(objective.color_code)}
                return { borderLeft: `4px solid ${colors[colorCode]}` }
            } else {
                return { borderLeft: `4px solid ${colors.accent}` }
            }
        }
    
        return (
            <section css={funnelSection}>
     
                <div css={funnelViz}>
                    <div css={masterSwitch}>
                        <button onClick={this.toggleAll}>
                            {this.state.allToggled ? <div><MdUnfoldLess /> Tout fermer</div> : <div><MdUnfoldMore /> Tout ouvrir</div>}
                        </button>
                    </div>

                    {objectives.map(({ node: objective }, i) => {
                        const borderStyle = borderColor(objective.color_code)
                        const widthStyle = { width: `${100 - i * 2}%` }
    
                        return (
                            <div key={objective.id}>
                                <div css={funnelStage} 
                                    style={{ 
                                        ...widthStyle,
                                        ...borderStyle,
                                    }} 
                                    className="slideInUp"
                                >
                                    <h4><Link to={`/objectif/${objective.id}`}><span className="stabilo">Objectif {i + 1} :</span> {objective.name}</Link></h4>
                                    <button onClick={event => this.handleClick(event, i + 1)} css={expandBtn}>
                                        {this.state.individualToggles[`isToggled_${i + 1}`] ? <MdKeyboardArrowUp /> : <GoInfo/>}
                                    </button>

                                    {(objective.buyer_exp || objective.seller_exp) && 
                                        <div css={this.state.individualToggles[`isToggled_${i + 1}`] ? showExp : hideExp }>
                                            <ChatMessages 
                                                chatMessages={[
                                                    {
                                                        id: `seller`,
                                                        message: objective.seller_exp,
                                                    },
                                                    {
                                                        id: `buyer`,
                                                        message: objective.buyer_exp,
                                                    },
                                                ]} 
                                                inBox={false}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
    
                <div css={funnelDesc}>
                    <h2>Des <span className="stabilo">manuels</span> pour chacun de vos défis</h2>
                    <p className="big">Pour tous les défis digitaux que rencontre votre entreprise, nous avons rassemblé et continuons chaque jour d'apporter des solutions : de l'acquisition de clients jusqu'à l'automatisation des process dans votre PME, il existe un Playbook adapté !</p>
                </div>
    
            </section>
        )
    }
}

const FunnelOverview = props => (
    <StaticQuery
        query={graphql`
            query {
                allGoalsYaml {
                    edges {
                        node {
                            id
                            name
                            buyer_exp
                            seller_exp
                        }
                    }
                }
            }
        `}

        render={data => <FunnelOverviewComp data={data} {...props} />}
    />
)

export default FunnelOverview

/**
 * CSS
 */
const funnelSection = css`
    margin-top: 80px;
    margin-bottom: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const funnelDesc = css`
    width: 40%;
`

const funnelViz = css`
    position: relative;
    width: 55%;
`

const masterSwitch = css`
    position: absolute;
    top: -40px;
    left: 10px; 
    color: ${colors.lightgrey};

    svg {
        fill: ${colors.lightgrey};
    }

    button:focus {
        outline:0;
    }
`

const funnelStage = css`
    position: relative;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    border-radius: 5px;
    border: 1px solid ${colors.whitegrey};
    margin-bottom: 15px;
    padding: 20px 20px 10px;

    h4 {
        margin-top: 0;

        a {
            text-decoration: none;
            color: ${colors.black};
        }
    }

    button:focus {
        outline:0;
    }
`

const expandBtn = css`
    position: absolute;
    top: 15px;
    right: 10px;
    background-color: transparent;

    svg {
        fill: ${colors.lightgrey};
    }
`

const hideExp = css`
    opacity: 0; 
    height: 0;
    overflow: hidden;
    transition: opacity 1s ease-out;
`

const showExp = css`
    opacity: 1;
    height: auto;
    transition: opacity 1.5s ease-in-out;
`