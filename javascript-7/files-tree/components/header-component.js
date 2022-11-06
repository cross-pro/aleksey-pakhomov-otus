import {LitElement, html} from 'lit-element'

class HeaderComponent extends LitElement {

    constructor() {
        super()
    }

    static get properties() {
        return {
            title: {type: String}
        }
    }

    render() {
        return html`<p style="text-transform: uppercase ; cursor: pointer">${this.title}</p>`
    }
}

export {HeaderComponent}