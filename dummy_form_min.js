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
	set_diff_time(debut_1, fin_1, temps_garrot);
}
function fin_1_onenter() {
	init_time(fin_1);
	set_diff_time(debut_1, fin_1, temps_garrot);
}
function debut_1_onleave() {
	set_diff_time(debut_1, fin_1, temps_garrot);
}
function fin_1_onleave() {
	set_diff_time(debut_1, fin_1, temps_garrot);
}
function init() {
	debut_1 = document.getElementById("debut_1");
	fin_1 = document.getElementById("fin_1");
	temps_garrot = document.getElementById("temps_garrot");
	debut_1.addEventListener("click", debut_1_onenter);
	fin_1.addEventListener("click", fin_1_onenter);
	debut_1.addEventListener("focusout", debut_1_onleave);
	fin_1.addEventListener("focusout", fin_1_onleave);
}
