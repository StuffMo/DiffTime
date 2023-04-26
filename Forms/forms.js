/**
 * Classe ancetre des composants graphiques
 */
class Widget {
    /**
     * Variables membres:
     * - id : identifiant unique de l'élément (random si null)
     * - ancestor : widget "parent", "container"
     * - element : element html relatif
     * - html_type : type d'element html (button, input, div...)
     * - css_class : classe css de l'element
     * - data : données relatives au composant
     */
	constructor(ancestor, data) {
		this._ancestor = ancestor ? ancestor : null;
		this._element = null;
		this._html_type = null;
		this._css_class = null;
		this._id = ~~(Math.random() * 1000000).toString();
		if(this._ancestor)
			this._ancestor.add_widget(this);
		this._data = data;
		this.set_pos(data.x ? data.x : 0, data.y ? data.y : 0);
		this.set_size(data.dx ? data.dx : 0, data.dy ? data.dy : 0);
	}
    /**
     * définition de la position en pixels
     * relativement au widget ancetre
     */
	set_pos(x, y) {
		this._x = x;
		this._y = y;
	}
    /**
     * définition de la taille en pixels
     */
	set_size(dx, dy) {
		this._dx = dx;
		this._dy = dy;
	}
    /**
     * Initialisation du composant
     * - création de l'élément html
     * - définition de sa position
     * - et de sa taille
     * - affectation des evenements
     */
	setup() {
        // création
		this._element = document.createElement(this._html_type);
		this._element.setAttribute("id", this._id);
		this._element.classList.add(this._css_class);
        this._element.classList.add("widget");
		this._element.style.left = this._x + "px";
		this._element.style.top = this._y + "px";
		this._element.style.width = this._dx + "px";
		this._element.style.height = this._dy + "px";
        // ajout comme sous-composant du composant ancetre
		if(this._ancestor) {
			this._ancestor._element.appendChild(this._element);
		}
		else {
			document.body.appendChild(this._element);
		}
        // label (bouton, label)
		if(this._data.label) {
			this._element.appendChild(document.createTextNode(this._data.label));
		}
		if(this._data.value) {
			this._element.value = this._data.value;
		}
        // evenements
        this._element.addEventListener("focus", this.OnEnter);
		this._element.addEventListener("focusout", this.OnLeave);
		this._element.addEventListener("keydown", this.OnKeyPress);
        this._element.addEventListener("click", this.OnClick);
	}
};
/**
 * Widget Frame (container)
 */
class Frame extends Widget {
	constructor(ancestor, id, data) {
		super(ancestor, id, data);
		this._html_type = "div";
		this._css_class = "form-frame";
		this._subwidgets = {};
	}
	add_widget(widget) {
		this._subwidgets[widget._id] = widget;
		widget._ancestor = this;
	};
	setup() {
		super.setup();
		for(let i in this._subwidgets)
			this._subwidgets[i].setup();
	}
};
/**
 * Widget Form (hérite de Frame)
 */
class Form extends Frame {
	constructor(data) {
		super(null, data);
		this._html_type = "div";
		this._css_class = "form";
		this.set_pos(5, 5);
	}
	setup() {
		super.setup();
		Form.OnInit();
	}
};
/**
 * Widget Bouton
 */
class Button extends Widget {
	constructor(ancestor, id, data) {
		super(ancestor, id, data);
		this._html_type = "button";
		this._css_class = "form-button";
	}
	setup() {
		super.setup();
	}
};
/**
 * Widget TextInput
 */
class TextInput extends Widget {
	constructor(ancestor, id, data) {
		super(ancestor, id, data);
		this._html_type = "input";
		this._css_class = "form-text-input";
	}
	setup() {
		super.setup();
		if(this._data.readonly)
			this._element.setAttribute("readonly", true);
	}
	set Value(value) {
		this._element.value = value;
	}
	get Value() {
		return this._element.value;
	}
};
/**
 * Widget Label
 */
class Label extends Widget {
	constructor(ancestor, id, data) {
		super(ancestor, id, data);
		this._html_type = "span";
		this._css_class = "form-label";
	}
	setup() {
		super.setup();
	}
};
/**
 * Methode globale d'initialisation du projet
 */
function __forms_init__() {
	form.setup();
}
