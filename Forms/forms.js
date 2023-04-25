class Widget {
	constructor(ancestor, id, data) {
		this._ancestor = ancestor ? ancestor : null;
		this._element = null;
		this._html_type = null;
		this._css_class = null;
		this._id = id ? id : ~~(Math.random() * 1000000).toString();
		if(this._ancestor)
			this._ancestor.add_widget(this);
		this._data = data;
		this.set_pos(data.x ? data.x : 0, data.y ? data.y : 0);
		this.set_size(data.dx ? data.dx : 0, data.dy ? data.dy : 0);
	}
	set_pos(x, y) {
		this._x = x;
		this._y = y;
	}
	set_size(dx, dy) {
		this._dx = dx;
		this._dy = dy;
	}
	setup() {
		this._element = document.createElement(this._html_type);
		this._element.setAttribute("id", this._id);
		this._element.classList.add(this._css_class);
		this._element.style.left = this._x + "px";
		this._element.style.top = this._y + "px";
		this._element.style.width = this._dx + "px";
		this._element.style.height = this._dy + "px";
		if(this._ancestor) {
			this._ancestor._element.appendChild(this._element);
		}
		else {
			document.body.appendChild(this._element);
		}
		if(this._data.label) {
			this._element.appendChild(document.createTextNode(this._data.label));
		}
		if(this._data.value) {
			this._element.value = this._data.value;
		}
	}
};
class Button extends Widget {
	constructor(ancestor, id, data) {
		super(ancestor, id, data);
		this._html_type = "button";
		this._css_class = "form-button";
	}
	setup() {
		super.setup();
		this._element.addEventListener("click", this.OnClick);
	}
};
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
class Form extends Frame {
	constructor(data) {
		super(null, "main-form", data);
		this._html_type = "div";
		this._css_class = "form";
		this.set_pos(5, 5);
	}
	setup() {
		super.setup();
		Form.OnInit();
	}
};
class TextInput extends Widget {
	constructor(ancestor, id, data) {
		super(ancestor, id, data);
		this._html_type = "input";
		this._css_class = "form-text-input";
	}
	setup() {
		super.setup();
		this._element.addEventListener("focus", this.OnEnter);
		this._element.addEventListener("focusout", this.OnLeave);
		this._element.addEventListener("keydown", this.OnKeyPress);
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
function __forms_init__() {
	form.setup();
}
