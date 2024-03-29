import { LitElement, html } from "lit-element"
import directoryImage from "../images/directory.png"
import openDirectoryImage from "../images/opened-directory.png"
import fileImage from "../images/file.png"

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
    if (this.isFile()) return fileImage
    if (this.displayItems === "block") return openDirectoryImage
    return directoryImage
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
                cursor: pointer;
                font-family: "Roboto";
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
                margin-left: 28px;
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
