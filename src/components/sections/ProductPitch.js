import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

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
                        <li>Souhaitent des résultats rapides, sans engager/budgéter une agence web</li>
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
    border: 1px solid ${colors.whitegrey};
    border-radius: 5px;
    background-color: white;
    max-width: 400px;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    margin: 10px 0;
    padding: 0px 20px 10px;

    ul {
        padding-left: 0;

        li {
            list-style: none;
            background: url("data:image/svg+xml,%3Csvg viewBox='0 0 64 64' fill='%23FF4208' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.33,57.82,0,36.53l5.87-5.87L21.33,46.09,58.13,9.36,64,15.23,21.33,57.82'/%3E%3C/svg%3E") no-repeat 0 5px;
            padding-left: 25px;
            background-size: 15px;
        }
    } 
`

const rightProductPitch = css`
    flex-basis: 0;
    flex-grow: 1;
`

const imagePitch = css`
    text-align: right;
`
