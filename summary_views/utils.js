export function displayAgeYearString(age, year) {
	if (year === -1) {
		return "ANB " + age + "岁";
	}

	return year + "年/ANB " + age + "岁"
}