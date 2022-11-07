import './styles/main.css'

import {Tree} from "./components/tree.js"
import {FileElement} from "./components/file-element.js"


customElements.define("my-tree", Tree)
customElements.define("my-file", FileElement)
