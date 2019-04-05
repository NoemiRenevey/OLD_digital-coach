import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const FunnelOverviewComp = ({ data }) => {
    const objectives = data.allGoalsYaml.edges
    const borderColor = (colorCode) => {
        if (colorCode) {
            // console.log("Color:", colors[colorCode])
            // Put in div style={borderColor(objective.color_code)}
            return { 
                borderStyle: `solid`,
                borderWidth: `4px`,
                borderImage: `${colors[colorCode]} 1 100%`,
            }
        } else {
            return { borderLeft: `4px solid #F4F4F4` }
        }
    }

    return (
        <section css={funnelSection}>
 
            <div css={funnelViz}>
                {objectives.map(({ node: objective }, i) => (
                    <div key={objective.id}>
                        <div css={funnelStage} style={{ width: `${100-i*5}%` }}>
                            <h4>{objective.name}</h4>
                            {(objective.buyer_exp || objective.seller_exp) && 
                                <ul>
                                    {objective.buyer_exp && <li>{objective.buyer_exp}</li>}
                                    {objective.seller_exp && <li>{objective.seller_exp}</li>}
                                </ul>
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div css={funnelDesc}>
                <h2>Des Playbooks pour chacun de vos défis</h2>
                <p className="big">Pour tous les défis digitaux que rencontre votre entreprise, nous avons rassemblé et continuons chaque jour d'apporter des solutions : de l'acquisition de clients jusqu'à l'automatisation des process dans votre PME, il existe un Playbook adapté !</p>
            </div>

        </section>
    )
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
    background-color: ${colors.whitegrey};
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 20px 20px;

    h4 {
        margin-top: 0;
    }
`