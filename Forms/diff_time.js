/**
 * Création du formulaire
 */
let form, btn, frame, label, debut_1, fin_1, diff_1;
form =      new Form(                   {                   dx: 285,    dy: 165});
// Frame 1
frame =     new Frame(      form,       {x: 5,      y: 5,   dx: 130,    dy: 115});
label =     new Label(      frame,      {x: 5,      y: 12,  dx: 50,     dy: 25,     label: "Début"});
debut_1 =   new TextInput(  frame,      {x: 65,     y: 5,   dx: 50,     dy: 25});
label =     new Label(      frame,      {x: 5,      y: 47,  dx: 50,     dy: 25,     label: "Fin"});
fin_1 =     new TextInput(  frame,      {x: 65,     y: 40,  dx: 50,     dy: 25});
label =     new Label(      frame,      {x: 5,      y: 82,  dx: 50,     dy: 25,     label: "Diff"});
diff_1 =    new TextInput(  frame,      {x: 65,     y: 75,  dx: 50,     dy: 25,     readonly: true});
// Frame 2
frame =     new Frame(      form,       {x: 145,    y: 5,   dx: 130,    dy: 115});
label =     new Label(      frame,      {x: 5,      y: 12,  dx: 50,     dy: 25,     label: "Début"});
debut_2 =   new TextInput(  frame,      {x: 65,     y: 5,   dx: 50,     dy: 25});
label =     new Label(      frame,      {x: 5,      y: 47,  dx: 50,     dy: 25,     label: "Fin"});
fin_2 =     new TextInput(  frame,      {x: 65,     y: 40,  dx: 50,     dy: 25});
label =     new Label(      frame,      {x: 5,      y: 82,  dx: 50,     dy: 25,     label: "Diff"});
diff_2 =    new TextInput(  frame,      {x: 65,     y: 75,  dx: 50,     dy: 25,     readonly: true});
// Bouton RAZ
btn =       new Button(     form,       {x: 175,    y: 130, dx: 100,    dy: 25,     label: "Clear"});
/**
 * Callbacks formulaire
 */
Form.OnInit = function() {
    /**
     * Fonction d'initialisation de la date courante
     * dans un champ de formulaire type TextInput
     */
	Form.InitTime = function(obj) {
		let date = new Date();
		obj.Value = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	}
    /**
     * Fonction d'incrémentation/décrémentation des minutes
     */
	Form.MinutesIncDec = function(obj, delta) {
		if(obj.Value != "") {
			let [h, m] = obj.Value.split(":").map((i) => { return parseInt(i); });
			if(![h, m].includes(undefined)) {
				m += delta;
				if(m >= 60) {
                    h += ~~(m / 60);
                    m = m % 60; 
                    if(h == 24) 
                        h=0
                }
                else if(m < 0) {
                    h -= ~~(-m / 60)
                    m = 60 + m; 
                    h--; 
                    if(h < 0) 
                        h=23
                }
				if (m < 10) m = "0" + m;
					obj.Value = h + ":" + m;
			}
		}
	}
    /**
     * Calcul d'une différence entre deux heures
     */
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
 * Bouton Clear -> RAZ des valeurs
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
	if(e.keyCode == 38) Form.MinutesIncDec(debut_1, 1);
	else if(e.keyCode == 40) Form.MinutesIncDec(debut_1, -1);
	Form.DiffTime(debut_1, fin_1, diff_1);
}
fin_1.OnKeyPress = function(e) {
	if(e.keyCode == 38) Form.MinutesIncDec(fin_1, 1);
	else if(e.keyCode == 40) Form.MinutesIncDec(fin_1, -1);
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
	if(e.keyCode == 38) Form.MinutesIncDec(debut_2, 1);
	else if(e.keyCode == 40) Form.MinutesIncDec(debut_2, -1);
	Form.DiffTime(debut_2, fin_2, diff_2);
}
fin_2.OnKeyPress = function(e) {
	if(e.keyCode == 38) Form.MinutesIncDec(fin_2, 1);
	else if(e.keyCode == 40) Form.MinutesIncDec(fin_2, -1);
	Form.DiffTime(debut_2, fin_2, diff_2);
}
