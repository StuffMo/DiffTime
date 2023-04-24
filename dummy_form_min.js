function set_diff_time(obj_debut, obj_fin, obj_diff) {
	let debut = obj_debut.value, fin = obj_fin.value;
	obj_diff.value = "/";
	if(debut != "" && fin != "") {
		let tab = [...debut.split(":"), ...fin.split(":")];
		let [h0, m0, h1, m1] = tab.map((i) => { return parseInt(i); });
		if(![h0, m0, h1, m1].includes(NaN)) {
			let diff_minutes = (h1 * 60 + m1) - (h0 * 60 + m0);
			obj_diff.value = diff_minutes < 0 ? "Erreur" : 
				(~~(diff_minutes / 60)) + ":" + (diff_minutes % 60 < 10 ? "0": "") + diff_minutes % 60;
		}
	}
}
function init_time(field) {
	let d = new Date();
	field.value = d.getHours() + ":" + (d.getMinutes() < 10 ? "0": "") + d.getMinutes();
}
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

	debut_1.addEventListener("click", debut_1_onenter);
	fin_1.addEventListener("click", fin_1_onenter);
	debut_1.addEventListener("focusout", debut_1_onleave);
	fin_1.addEventListener("focusout", fin_1_onleave);
	
	debut_2.addEventListener("click", debut_2_onenter);
	fin_2.addEventListener("click", fin_2_onenter);
	debut_2.addEventListener("focusout", debut_2_onleave);
	fin_2.addEventListener("focusout", fin_2_onleave);
}
