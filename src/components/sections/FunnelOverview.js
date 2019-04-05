import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

class FunnelOverviewComp extends React.Component {
    constructor(props) {
        super(props)
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
                    {objectives.map(({ node: objective }, i) => {
                        const borderStyle = borderColor(objective.color_code)
                        const widthStyle = { width: `${100-i*5}%` }
    
                        return (
                            <div key={objective.id}>
                                <div css={funnelStage} 
                                    style={{ 
                                        ...widthStyle,
                                        ...borderStyle,
                                    }} 
                                    className="slideInUp"
                                >
                                    <h4><span className="stabilo">Objectif {i+1} :</span> {objective.name}</h4>
        
                                    {(objective.buyer_exp || objective.seller_exp) && 
                                        <ul>
                                            {objective.seller_exp && <li>{objective.seller_exp}</li>}
                                            {objective.buyer_exp && <li>{objective.buyer_exp}</li>}
                                        </ul>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
    
                <div css={funnelDesc}>
                    <h2>Des Playbooks pour chacun de vos défis</h2>
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
                            color_code
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
    width: 55%;
`

const funnelStage = css`
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    border-radius: 5px;
    border: 1px solid ${colors.whitegrey};
    margin-bottom: 20px;
    padding: 20px 20px 10px;

    h4 {
        margin-top: 0;
    }

    ul {
        margin-bottom: 0;
        list-style: none;
        padding: 0;
        overflow: auto; // clearfix

        li {
            padding: 4px 20px;
            border-radius: 20px;
            display: inline-block;
        }

        li:first-child {
            background-color: ${colors.accent3};
            color: white;
            border-bottom-left-radius: 5px;
        }

        li:nth-child(2) {
            background-color: ${colors.whitegrey};
            border-bottom-right-radius: 5px;
            text-align: right;
            float: right;
        }
    }
`