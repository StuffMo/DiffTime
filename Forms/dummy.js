/**
 * Création du formulaire
 */
form = new Form({dx: 800, dy: 300});
let btn = new Button(form, "my-first-btn", {x: 695, y: 270, dx: 100, dy: 25, label: "Clear"});

let frame = new Frame(form, "frame_1", {x: 5, y: 5, dx: 130, dy: 115, title:"Frame"});
new Label(frame, null, {x: 5, y: 12, dx: 50, dy: 25, label: "Début"});
let debut_1 = new TextInput(frame, "debut_1", {x: 65, y: 5, dx: 50, dy: 25, value: ""});
new Label(frame, null, {x: 5, y: 47, dx: 50, dy: 25, label: "Fin"});
let fin_1 = new TextInput(frame, "fin_1", {x: 65, y: 40, dx: 50, dy: 25, value: ""});
new Label(frame, null, {x: 5, y: 82, dx: 50, dy: 25, label: "Diff"});
let diff_1 = new TextInput(frame, "diff_1", {x: 65, y: 75, dx: 50, dy: 25, value: "", readonly: true});

let frame2 = new Frame(form, "frame_2", {x: 145, y: 5, dx: 130, dy: 115, title:"Frame"});
new Label(frame2, null, {x: 5, y: 12, dx: 50, dy: 25, label: "Début"});
let debut_2 = new TextInput(frame2, "debut_2", {x: 65, y: 5, dx: 50, dy: 25, value: ""});
new Label(frame2, null, {x: 5, y: 47, dx: 50, dy: 25, label: "Fin"});
let fin_2 = new TextInput(frame2, "fin_2", {x: 65, y: 40, dx: 50, dy: 25, value: ""});
new Label(frame2, null, {x: 5, y: 82, dx: 50, dy: 25, label: "Diff"});
let diff_2 = new TextInput(frame2, "diff_2", {x: 65, y: 75, dx: 50, dy: 25, value: "", readonly: true});

/**
 * Callbacks formulaire
 */
Form.OnInit = function() {
	Form.InitTime = function(obj) {
		let date = new Date();
		obj.Value = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	}
	Form.MinutesUp = function(obj) {
		if(obj.Value != "") {
			let [h, m] = obj.Value.split(":").map((i) => { return parseInt(i); });
			if(![h, m].includes(undefined)) {
				m++;
				if(m == 60) {m=0; h++; if(h==24) h=0}
				if (m < 10) m = "0" + m;
					obj.Value = h + ":" + m;
			}
		}
	}
	Form.MinutesDown = function(obj) {
		if(obj.Value != "") {
			let [h, m] = obj.Value.split(":").map((i) => { return parseInt(i); });
			if(![h, m].includes(undefined)) {
				m--;
				if(m < 0) {m=59; h--; if(h<0) h=23}
				if (m < 10) m = "0" + m;
					obj.Value = h + ":" + m;
			}
		}
	}
	Form.DiffTime = function(field_debut, field_fin, field_target) {
		field_target.Value = "/";
		// calcul seulement si les deux champs en entrée sont renseignés
		if(field_debut.Value != "" && field_fin.Value != "") {
			// récupération heures et minutes
			let tab = [...field_debut.Value.split(":"), ...field_fin.Value.split(":")];
			let [h0, m0, h1, m1] = tab.map((i) => { return parseInt(i); });
			if(![h0, m0, h1, m1].includes(undefined)) {
				// calcul de la différence, en minutes
				let diff_minutes = (h1 * 60 + m1) - (h0 * 60 + m0);
				// si la fin est avant le début, la différence sera négative => erreur
				if (diff_minutes < 0)
					field_target.Value = "Erreur";
				else {
					// heures = division entière des minutes par 60
					// minutes = reste de la division par 60
					let [diff_h, diff_m] = [~~(diff_minutes / 60), diff_minutes % 60];
					if (diff_m < 10) diff_m = "0" + diff_m;
					field_target.Value = diff_h + ":" + diff_m;
				}
			}
		}
	}
}
/**
 * RAZ
 */
btn.OnClick = function() {
	debut_1.Value = "";
	fin_1.Value = "";
	diff_1.Value = "";
	debut_2.Value = "";
	fin_2.Value = "";
	diff_2.Value = "";
}
/**
 * Callbacks frame 1
 */
debut_1.OnEnter = function() {
	Form.InitTime(debut_1);
	Form.DiffTime(debut_1, fin_1, diff_1);
}
fin_1.OnEnter = function() {
	Form.InitTime(fin_1);
	Form.DiffTime(debut_1, fin_1, diff_1);
}
debut_1.OnLeave = function() {
	Form.DiffTime(debut_1, fin_1, diff_1);
}
fin_1.OnLeave = function () {
	Form.DiffTime(debut_1, fin_1, diff_1);
}
debut_1.OnKeyPress = function(e) {
	if(e.keyCode == 38) Form.MinutesUp(debut_1);
	else if(e.keyCode == 40) Form.MinutesDown(debut_1);
	Form.DiffTime(debut_1, fin_1, diff_1);
}
fin_1.OnKeyPress = function(e) {
	if(e.keyCode == 38) Form.MinutesUp(fin_1);
	else if(e.keyCode == 40) Form.MinutesDown(fin_1);
	Form.DiffTime(debut_1, fin_1, diff_1);
}
/**
 * Callbacks frame 2
 */
debut_2.OnEnter = function() {
	Form.InitTime(debut_2);
	Form.DiffTime(debut_2, fin_2, diff_2);
}
fin_2.OnEnter = function() {
	Form.InitTime(fin_2);
	Form.DiffTime(debut_2, fin_2, diff_2);
}
debut_2.OnLeave = function() {
	Form.DiffTime(debut_2, fin_2, diff_2);
}
fin_2.OnLeave = function () {
	Form.DiffTime(debut_2, fin_2, diff_2);
}
debut_2.OnKeyPress = function(e) {
	if(e.keyCode == 38) Form.MinutesUp(debut_2);
	else if(e.keyCode == 40) Form.MinutesDown(debut_2);
	Form.DiffTime(debut_2, fin_2, diff_2);
}
fin_2.OnKeyPress = function(e) {
	if(e.keyCode == 38) Form.MinutesUp(fin_2);
	else if(e.keyCode == 40) Form.MinutesDown(fin_2);
	Form.DiffTime(debut_2, fin_2, diff_2);
}
