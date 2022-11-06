import {LitElement, html} from 'lit-element'


class Tree extends LitElement {

    defaultFolderName = "Корневая директория"

    constructor() {
        super()
        this.title = this.defaultFolderName
        this.data = {}
        this.lastData = null
        this.description = "что-то интересное"
    }

    clickFolder() {
        this.title = "Назад..."
        this.description = "new hello xD"
        this.lastData = this.data;
    }

    goBack() {
        console.log("goBack()")
        if (this.lastData === null)
            return

        this.title = this.defaultFolderName
    }


    static get properties() {
        return {
            title: {type: String},
            data: {type: Object},
            lastData: {type: Object}
        };
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
            
        <my-header title="${this.title}" @click="${this.goBack}"></my-header>    
        
        <div class="row" @click="${this.clickFolder}"><img class="directory-image" src="${'./images/directory.png'}">
            ${this.description}
        </div>
        `
    }


}

export {Tree}