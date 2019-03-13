function scaleMap(height, origHeight, origScale) {
  return (height / origHeight) * origScale;
}

function createMadridMap(madrid, svg) {

  var madCenter = d3.geoCentroid(madrid);

  // // create the madrid path

  var origMadridScale = 120000;
  var origMadridScaleZoom = 380000;
  var madridScale = scaleMap(height, origHeight, origMadridScale);
  var madridScaleZoom = scaleMap(height, origHeight, origMadridScaleZoom);

  var madProj = d3.geoMercator().center(madCenter)
    .scale(madridScale).translate([(width * .52), (height * .5)]);
  madPath = d3.geoPath().projection(madProj);

  var madProjZoom = d3.geoMercator().center(madCenter)
    .scale(madridScaleZoom).translate([(width * .4), (height * .25)]);
  madPathZoom = d3.geoPath().projection(madProjZoom);

  mad_list = [];

  madrid.features.forEach(d => {
    d.neighbourhood = d.properties.neighbourhood;
    d.neighbourhood_group = d.properties.neighbourhood_group;
    mad_list.push(d.neighbourhood);
  })

  svg.append('g')
    .attr('id', 'madridVis')
    .append('g')
    .attr('id', 'madridMap')
    .selectAll('path').data(madrid.features)
    .enter()
    .append('path')
    .attr('d', madPath)
    .attr('fill', '#00b8d4')
    .attr('stroke-width', '1')
    .attr('stroke', '#00b8d4')
    .on('click', null)
    .attr('opacity', 0);

  svg.select('#madridMap')
    .classed('noshow', true)

    return {
      path: madPath,
      pathZoom: madPathZoom,
      projection: madProj,
      projectionZoom: madProjZoom
    };
}
