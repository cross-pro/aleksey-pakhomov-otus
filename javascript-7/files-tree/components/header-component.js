import {LitElement, html} from 'lit-element'

class HeaderComponent extends LitElement {

    constructor() {
        super()
    }

    static get properties() {
        return {
            isRoot: {type: String}
        }
    }

    render() {
        if (this.isRoot==="true")
            return html`<p style="text-transform: uppercase ; cursor: pointer">Корневой элемент</p>`
        else {
            return html `
            <style>
                .image {
                    width: 30px;
                    margin-right: 10px;
                }
                .row {
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    -webkit-align-items: center;
                    font-family: sans-serif;
                    cursor: pointer;
                }
            </style>
            <p class="row" @click="${this.clickFolder}"><img class="image" src="${'./images/back.png'}">
                Назад
            </p>
            `
        }
    }
}

export {HeaderComponent}