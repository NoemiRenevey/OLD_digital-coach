import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const FunnelOverview = () => {
    return (
        <section css={funnelSection}>
            <h2>Des Playbooks pour chacun de vos défis</h2>
            <p className="big">Pour tous les défis digitaux que rencontre votre entreprise, nous avons rassemblé et continuons chaque jour d'apporter des solutions : de l'acquisition de clients jusqu'à l'automatisation des process dans votre PME, il existe un Playbook adapté !</p>

            <div css={funnelViz}>
            
            </div>
        </section>
    )
}

export default FunnelOverview

/**
 * CSS
 */
const funnelSection = css`
    margin-top: 80px;
    margin-bottom: 80px;
`

const funnelViz = css`

`