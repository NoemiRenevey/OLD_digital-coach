import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ProductPitch = () => {
    return (
        <section css={productPitch}>
            <div css={leftProductPitch}>
                <h3>En Bref!</h3>
                <h2>Développez votre business grâce à internet... en toute autonomie</h2>
                <p className="big">Mettez en place nos "recettes digitales", elles décrivent précisément quoi faire pour atteindre un objectif donné. Il n'y a plus qu'à suivre la méthode : vous (ou votre équipe) devenez indépendant.</p>
                <div css={perfectSolution}>
                    <h4>La solution parfaite pour ceux qui...</h4>
                    <ul>
                        <li>Veulent des solutions concrètes plutôt que de la théorie abstraite</li>
                        <li>Souhaitent des résultats rapides, sans engager une agence web</li>
                        <li>Savent que le digital est incontournable pour le futur de leur business</li>
                    </ul>
                </div>
            </div>
            <div css={rightProductPitch}>
                <div css={imagePitch}>
                    <img src="https://place-hold.it/300x300" alt="placeholder"/>
                </div>
            </div>
        </section>
    )
}

export default ProductPitch

/***
 * CSS
 */

const productPitch = css`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 80px;
`

const leftProductPitch = css`
    flex-grow: 2;
    flex-basis: 0;
    max-width: 600px;
`

const perfectSolution = css`

`

const rightProductPitch = css`
    flex-basis: 0;
    flex-grow: 1;
`

const imagePitch = css`
    text-align: right;
`
