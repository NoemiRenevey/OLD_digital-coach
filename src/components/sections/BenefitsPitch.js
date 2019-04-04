import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const blurbs = [
    {
        icon: ``,
        title: `Techniques éprouvées`,
        text: `Nos recettes digitales sont issues de 10 années d'expérience digitales et des meilleures pratiques.`,
    },
    {
        icon: ``,
        title: `No bullsh*t`,
        text: `Ne perdez pas de temps sur l'apprentissage théorique, suivez la "formule" et obtenez les résultats voulus.`,
    },
    {
        icon: ``,
        title: `Support qualifié`,
        text: `En cas de doute ou de question, nous vous répondons par chat afin de vous débloquer au plus vite.`,
    },
    {
        icon: ``,
        title: `Communauté et partage`,
        text: `Apprenez des succès et difficultés des autres membres de la communauté, et restez motivés par le groupe!`,
    },
    {
        icon: ``,
        title: `Suivi régulier`,
        text: `Besoin de structure? Nous proposons des événements physiques ou virtuels pour faire le point et avancer.`,
    },
    {
        icon: ``,
        title: `Autonomie durable`,
        text: `En internalisant la compétence digitale, vos expériences successive renforcent la compétitivité de votre entreprise.`,
    },
]

const BenefitsPitch = () => {
    return (
        <section css={benefitsSection}>
            <h2>Votre <span className="stabilo">Activation Digitale</span> à portée de clic</h2>
            <p className="big">Fini les recherches, les questionnements, les prises de tête. Vous allez enfin pouvoir obtenir des résultats en appliquant nos recommendations. Voilà quelques arguments pour vous en convaincre...</p>
            
            <div css={benefitsBlurbs}>
                {blurbs.map( (blurb, i) => (
                    <div key={i} css={benefitBlurb}>
                        <img src="https://place-hold.it/100x100" alt=""/>
                        <h4>{blurb.title}</h4>
                        <p>{blurb.text}</p>
                    </div>
                ))}
            </div>
        </section> 
    )
}

export default BenefitsPitch

/**
 * CSS
 */
const benefitsSection = css`
    margin-bottom: 80px;
`

const benefitsBlurbs = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40px;
`

const benefitBlurb = css`
    width: 30%;
    margin-bottom: 20px;

    h4 {
        margin-top: 10px;
    }
`