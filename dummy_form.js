/**
 * Calcul de la différence entre deux heures
 * indiquées dans les champs obj_debut et obj_fin
 * Le résultat est placé dans le champ obj_diff
 * Preview: https://htmlpreview.github.io/?https://github.com/StuffMo/DiffTime/blob/master/dummy_form.htm
 */
function set_diff_time(obj_debut, obj_fin, obj_diff) {
	// variables d'entrée
	let debut = obj_debut.value, fin = obj_fin.value;
	// variables de travail
	let tab, 			// tableau temporaire
		h0, 			// heures de l'heure de début
		m0, 			// minutes de l'heure de début
		h1, 			// heures de l'heure de fin
		m1, 			// minutes de l'heure de fin
		diff_m, 		// heures de la différence
		diff_h, 		// minutes de la différence
		diff_minutes; 	// différence en minutes entre début et fin
	// initialisation
	obj_diff.value = "/";
	// calcul seulement si les deux champs en entrée sont renseignés
	if(debut != "" && fin != "") {
		// récupération heures et minutes
		tab = [...debut.split(":"), ...fin.split(":")];
		[h0, m0, h1, m1] = tab.map((i) => { return parseInt(i); });
		if(![h0, m0, h1, m1].includes(NaN)) {
			// calcul de la différence, en minutes
			diff_minutes = (h1 * 60 + m1) - (h0 * 60 + m0);
			// si la fin est avant le début, la différence sera négative => erreur
			if (diff_minutes < 0)
				obj_diff.value = "Erreur";
			else {
				// heures = division entière des minutes par 60
				// minutes = reste de la division par 60
				[diff_h, diff_m] = [~~(diff_minutes / 60), diff_minutes % 60];
				if (diff_m < 10) diff_m = "0" + diff_m;
				obj_diff.value = diff_h + ":" + diff_m;
			}
		}
	}
}

/**
 * Renseignement de la date actuelle
 * dans le champ entré en paramètre
 */
function init_time(field) {
	let date = new Date();
	let minutes = date.getMinutes();
	if(minutes < 10) minutes = "0" + minutes;
	field.value = date.getHours() + ":" + minutes;
}
/**
 * Callbacks
 */
function debut_1_onenter() {
	init_time(debut_1);
	set_diff_time(debut_1, fin_1, temps_garrot_1);
}
function fin_1_onenter() {
	init_time(fin_1);
	set_diff_time(debut_1, fin_1, temps_garrot_1);
}
function debut_1_onleave() {
	set_diff_time(debut_1, fin_1, temps_garrot_1);
}
function fin_1_onleave() {
	set_diff_time(debut_1, fin_1, temps_garrot_1);
}
function debut_2_onenter() {
	init_time(debut_2);
	set_diff_time(debut_2, fin_2, temps_garrot_2);
}
function fin_2_onenter() {
	init_time(fin_2);
	set_diff_time(debut_2, fin_2, temps_garrot_2);
}
function debut_2_onleave() {
	set_diff_time(debut_2, fin_2, temps_garrot_2);
}
function fin_2_onleave() {
	set_diff_time(debut_2, fin_2, temps_garrot_2);
}
/**
 * Point d'entrée
 */
function init() {
	debut_1 = document.getElementById("debut_1");
	fin_1 = document.getElementById("fin_1");
	temps_garrot_1 = document.getElementById("temps_garrot_1");
	debut_2 = document.getElementById("debut_2");
	fin_2 = document.getElementById("fin_2");
	temps_garrot_2 = document.getElementById("temps_garrot_2");
	debut_2.addEventListener("click", debut_2_onenter);
	fin_2.addEventListener("click", fin_2_onenter);
	debut_2.addEventListener("focusout", debut_2_onleave);
	fin_2.addEventListener("focusout", fin_2_onleave);
}
