export function displayAgeYearString(age, year) {
	if (year === -1) {
		return (age - 1) + "岁";
	}

	return year + "年/" + (age - 1) + "岁"
}