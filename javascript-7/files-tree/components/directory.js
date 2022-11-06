import {LitElement, html} from 'lit-element'

class Directory extends LitElement {

    constructor() {
        super()
    }

    static get properties() {
        return {
            title: {type: String},
            data: {type: Object},
            lastData: {type: Object}
        }
    }

    render() {
        return html`
        
        `

    }
}

export {Directory}