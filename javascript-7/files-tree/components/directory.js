import {LitElement, html} from 'lit-element'

class Directory extends LitElement {

    constructor() {
        super()
    }

    static get properties() {
        return {
            description: {type: String},
            id: {type: Number}
        }
    }

    render() {
        return html`
            <style>
                .directory-image {
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
        <div class="row" @click="${this.clickFolder}"><img class="directory-image" src="${'./images/directory.png'}">
            ${this.description}
        </div>
        `
    }
}

export {Directory}