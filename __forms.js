Form = document.getElementsByTagName("form")[0];
document.addEventListener("DOMContentLoaded", function() {
	let inputs = Form.getElementsByTagName("input");
	for(let i=0; i<inputs.length; i++) {
		window[inputs[i].getAttribute("id")] = inputs[i];
		Object.defineProperty(inputs[i], "Value", {
			set: function(newValue) {
				var valueProp = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
				valueProp.set.call(inputs[i], newValue);
				if(inputs[i].OnChange)
					inputs[i].OnChange();
			},
			get: function() {
				return inputs[i].value;
			}
		});
		inputs[i].addEventListener("input", inputs[i].OnChange);
		inputs[i].addEventListener("focus", inputs[i].OnEnter);
		inputs[i].addEventListener("focusout", inputs[i].OnLeave);
	}
	Form.OnInit();
});
