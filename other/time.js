export function getTime(){
	const date = new Date();
	var min = date.getMinutes();
	var hour = date.getHours();
	if(hour === 24) hour = 0
	return {
		hour: hour,
		min: min
	}
}