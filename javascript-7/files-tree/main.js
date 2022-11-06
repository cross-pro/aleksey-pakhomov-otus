import './styles/main.css'

import {MyTreeComponent} from "./components/my-tree-component.js"
import {Directory} from "./components/directory.js"


customElements.define('my-component', MyTreeComponent)
customElements.define("my-directory", Directory)