import {LitElement, html} from 'lit-element'

class File extends LitElement {

    constructor() {
        super()
        this.displayItems = "none"

    }

    static get properties() {
        return {
            title: {type: String}, /*в задании только id и items, добавил title для наглядности*/
            items: {type: Array},
            id: {type: Number},
            src: {type: String},
            displayItems: {type: String}
        }
    }

    isFile() {
        console.log(this.items)
        return this.items === null || this.items.length === 0
    }

    getImage() {
        if (this.isFile())
            return './images/file.png'
        else
            return './images/directory.png'
    }

    buildTree() {
        if (!this.isFile()) {
            if (this.displayItems === "none")
                this.displayItems = "block"
            else
                this.displayItems = "none"
        }
    }


    render() {
        return html`
            <style>
            .row {
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    -webkit-align-items: center;
                    font-family: sans-serif;
                    cursor: pointer;
            }
            .image {
                    width: 30px;
                    margin-right: 10px;
             }
            .items {
                position: relative;
                margin-left: 30px;
                display: ${this.displayItems}
            }    
            </style>
            <div class="row" @click="${this.buildTree}">
              <img class="image" src="${this.getImage()}">
              ${this.title}
            </div>
            <div class="items"> 
                
            ${this.items && this.items.map(i => html`
                <my-file id=${i.id} title=${i.title} items=${i.items} ></my-file>
                `)}
            </div>`
    }
}

export {File}