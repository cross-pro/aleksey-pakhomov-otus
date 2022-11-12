import { LitElement, html } from "lit-element"

class FileElement extends LitElement {
  constructor() {
    super()
    this.displayItems = "block"
  }

  static get properties() {
    return {
      /* в задании только id и items, добавил title для наглядности */
      title: { type: String },
      items: { type: Array },
      id: { type: Number },
      src: { type: String },
      displayItems: { type: String },
    }
  }

  isFile() {
    return this.items === null || this.items.length === 0
  }

  getImage() {
    if (this.isFile()) return "./images/file.png"
    if (this.displayItems === "block") return "./images/opened-directory.png"
    return "./images/directory.png"
  }

  buildTree() {
    if (!this.isFile()) {
      if (this.displayItems === "none") {
        this.displayItems = "block"
      } else this.displayItems = "none"
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
            .row:hover {
                text-decoration: underline;
            }
            .image {
                    margin-right: 5px;
                    height: 25px;
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
                
            ${this.displayItems === "block" && this.items && this.items.map((i) => html`
                <my-file id=${i.id} title=${i.title} items=${JSON.stringify(i.items)} ></my-file>
                `)}
            </div>`
  }
}

export { FileElement }
