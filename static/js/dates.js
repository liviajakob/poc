/* Earthworks - Sidebar Display
 * Filename: sidebar-display.js
 * 
 * Manages display and filter / pagination options of the sidebar
 * 
 * Author: Livia Jakob
 * */




/* Brings the data into YYYY-MM-DD format
 * 
 * date - a JavaScript date object
 * */
function formatDate(date){
	datefm = new Date(date);
    formdate = date.getFullYear().toString()+'-' + (date.getMonth() + 1) + '-' + date.getDate();
	return formdate
}



/* Creat date range slider for filtering
 * 
 * */
$("#timerange").dateRangeSlider({
	range:{
	    min: {days: 1}
	  },
	  bounds:{
		    min: new Date(2015, 0, 1),
		    max: new Date(2018, 1, 31)
	},
	defaultValues:{
	    min: new Date(2016, 0, 1),
	    max: new Date(2017, 7, 29)
	  },
		arrows:false
});

