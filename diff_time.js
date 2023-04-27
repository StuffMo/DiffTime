Form.OnInit = function() {
	let date_format = new Intl.DateTimeFormat(
		'fr-FR', {
			hour: 'numeric', 
			minute: 'numeric', 
			hour12: false
		});
	Form.InitTime = function(field) {
		field.Value = date_format.format(new Date());
	}
	Form.DiffTime = function(field_debut, field_fin, field_target) {
		field_target.Value = "/";
		// test si 0 <= heure <= 23 et 0 <= minute <= 59
		let pattern = '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$';
		if(field_debut.Value.match(pattern) && field_fin.Value.match(pattern)) {
			// récupération heures et minutes
			let tab = [...field_debut.Value.split(":"), ...field_fin.Value.split(":")];
			let [h0, m0, h1, m1] = tab.map((i) => { return parseInt(i); });
			// calcul de la différence, en minutes
			let diff_minutes = (h1 * 60 + m1) - (h0 * 60 + m0);
			// si la fin est avant le début, la différence est négative => erreur
			if (diff_minutes < 0)
				field_target.Value = "Erreur";
			else
				field_target.Value = date_format.format(new Date().setHours(0, diff_minutes));
		}
	}
	Form.IncDecMinutes = function(event) {
		let pattern = '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$';
		if(event.target.Value.match(pattern)) {
			let dt = event.key == "ArrowUp" ? 1 : event.key == "ArrowDown" ? -1 : 0;
			let [h, m] = event.target.Value.split(":").map((i) => { return parseInt(i); });
			event.target.Value = date_format.format(new Date().setHours(0, (h * 60 + m + dt)));
		}
	}
}
debut_1.OnEnter = function() {
	Form.InitTime(debut_1);
}
debut_1.OnKey = function(event) {
	Form.IncDecMinutes(event);
}
debut_1.OnChange = function() {
	Form.DiffTime(debut_1, fin_1, diff_1);
}
fin_1.OnEnter = function() {
	Form.InitTime(fin_1);
}
fin_1.OnKey = function(event) {
	Form.IncDecMinutes(event);
}
fin_1.OnChange = function() {
	Form.DiffTime(debut_1, fin_1, diff_1);
}
