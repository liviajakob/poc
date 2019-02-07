/* Earthworks queries
 *
 * Author: Livia Jakob
 * */

/* Display and zoom to dataset extent polygon
 * Remove other displayed layers
 *
 * */
var featureListener = function(event, feature) {
	// remove other dataset layers
	resetDatasetMode();
	extent = feature.getGeometry().getExtent();
	query=JSON.stringify(generateQuery(extent, "CatalogueShardGet"));
	console.log("Query: ", query);

	$.post('http://192.168.9.3:9033/query', query)
    .done(function(data) {
      console.log("Data",data);
      display(data, "Shards");
    });


	// zoom to extent
	map.getView().fit(feature.getGeometry(), {
		  duration: 1000, // smoothly
		  nearest: false
		});

	// set polygon layer invisible
	polylayer.setVisible(false);
};



      function getPoints() {
              // features that intersect the box are added to the collection of
              // selected features
              var extent = [-22973, -1053704, -19973, -1049704]
              queryType="PointGet"

              query=JSON.stringify(generateQuery(extent, queryType));
              console.log(query);

              $.post('http://192.168.9.3:9033/query', query)
                  .done(function(data) {
                    console.log("Data",data);
                    display(data, "Points");

                    // zoom to extent
                    map.getView().fit(extent, {
                    		  duration: 1500, // smoothly
                    		  nearest: false
                    		});

                    changeColor();
              });


            }



function display(geojsonObject, title){
	 features = (new ol.format.GeoJSON()).readFeatures(geojsonObject, {
 	      dataProjection: projection,
   	      featureProjection: projection
          	 })
    // Check if polylayer exists, if yes remove its features and add the new features
	//if (typeof polylayer !== 'undefined'){
	//	polylayer.getSource().clear(); // clear polylayer
	//	polylayer.getSource().addFeatures(features); // add new features

	//}else{ // Create new vectorlayer and grouplayer
	   	var source = new ol.source.Vector({
	      	 features: features
	      	});
	    polylayer = new ol.layer.Vector({
	            title: title, // for the ol-layerswitcher
	            source: source,
	            style: geometryStyle,
	        })
	    /*polylayer_group = new ol.layer.Group({
	        	title: 'Datasets',
	        	layers: [polylayer]
	        })*/
	    map.addLayer(polylayer);

	//}

    /*Set Layer ID*/
    /*for (var i = 0, l = polylayer.getSource().getFeatures().length; i < l; i++) {
        var feat = polylayer.getSource().getFeatures()[i];
        feat.setId(feat.get('id'));
    }*/

    /* Set polygon layer to visible
     * */
    polylayer.setVisible(true);

} // end displayPoint()






/////// TOOLTIP


var tooltip = document.getElementById('tooltip');
var overlay = new ol.Overlay({
  element: tooltip,
  offset: [10, 0],
  positioning: 'bottom-left'
});
map.addOverlay(overlay);

function hoverInfo(feature, coordinate) {

  tooltip.style.display = feature ? '' : 'none';
  if (feature) {
    overlay.setPosition(coordinate);
    $("#tooltip").empty()
    $.each(feature.getKeys(), function(i, val){
        if(val!="geometry"){
             $("#tooltip").append(val+ ": " + feature.get(val)+"<br>");
        }
    });

  }
};

//map.on('pointermove', displayTooltip);







////// COLOR

function changeColor(){
    var min = 1921;
    var max = 1991;
    var classesNr = 5; //number of classes

    //Create an empty extent that we will gradually extend
    polylayer.getSource().getFeatures().forEach(function(feature) {
        //If this is actually a group, we need to create an inner loop to go through its individual layers
        num = feature.get('elev');
        classNr = parseInt((num-min)/((max-min)/classesNr))
        feature.setStyle(pointstyle[classNr]);
    });

}





function generateQuery(extent, viewName){
    var data = {
           views: [{
               viewName: viewName
                   , resultHandler: "SimpleTable"
                   , filterParameters: [{ parameterName: "minX", parameterValue: extent[0], parameterType: "long" }
                                       , { parameterName: "maxX", parameterValue: extent[2], parameterType: "long" }
                       , { parameterName: "minY", parameterValue: extent[1], parameterType: "long" }
                       , { parameterName: "maxY", parameterValue: extent[3], parameterType: "long" }
                       , { parameterName: "minTime", parameterValue: "1", parameterType: "long" }
                       , { parameterName: "maxTime", parameterValue: "2000000000", parameterType: "long" }]
                       , outputParameters: []
           }]
       }
    return data
}








////// old queries

/*$.post('point')
 .done(function(data) {
  console.log(data);
  display(data, "Points");
});*/

/*$.getJSON('http://192.168.9.3:9033/index?query=bongo')
 .done(function(data) {
  console.log(data);
  display(data);
});*/

/*$.post('grid', { name: "Livia", message: "can you read thiiiiiisss?" })
.done(function(data) {
  console.log(data);
  display(data, "Grid");
});*/


/////// Load shards
/*extent=[-600000, -3500000, 1000000, -600000]
query=JSON.stringify(generateQuery(extent, "CatalogueShardGet"));
console.log(query);

$.post('http://192.168.9.3:9033/query', query)
    .done(function(data) {
      console.log("Data",data);
      display(data, "Shards");
});*/



