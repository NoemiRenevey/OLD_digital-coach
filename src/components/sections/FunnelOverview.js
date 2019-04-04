import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const FunnelOverviewComp = ({ data }) => {
    const objectives = data.allGoalsYaml.edges
    const borderColor = ( colorCode ) => {
        if (colorCode) {
            // console.log("Color:", colors[colorCode])
            return { borderImage: `4px solid ${colors[colorCode]}` }
        } else {
            return { borderLeft: `4px solid #fff` }
        }
    }

    return (
        <section css={funnelSection}>
            <div css={funnelDesc}>
                <h2>Des Playbooks pour chacun de vos défis</h2>
                <p className="big">Pour tous les défis digitaux que rencontre votre entreprise, nous avons rassemblé et continuons chaque jour d'apporter des solutions : de l'acquisition de clients jusqu'à l'automatisation des process dans votre PME, il existe un Playbook adapté !</p>
            </div>
 
            <div css={funnelViz}>
                {objectives.map(({ node: objective }) => (
                    <div key={objective.id}>
                        <div style={borderColor(objective.color_code)}>
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
`

const funnelDesc = css`

`

const funnelViz = css`

`