function scaleMap(height, origHeight, origScale) {
  return (height / origHeight) * origScale;
}

function createMadridMap(madrid, svg) {
  var madCenter = d3.geoCentroid(madrid)

  // // create the path

  var origMadridScale = 115000;
  var madridScale = scaleMap(height, origHeight, origMadridScale);

  var madProjection = d3.geoMercator().center(madCenter)
    .scale(madridScale).translate([(width * .5), (height * .52)]);
  var madPath = d3.geoPath().projection(madProjection);

  mad_list = [];

  madrid.features.forEach(d => {
    d.neighbourhood = d.properties.neighbourhood;
    d.neighbourhood_group = d.properties.neighbourhood_group;
    mad_list.push(d.neighbourhood);
  });

  svg.append('g')
    .attr('id', 'madridMap')
    .selectAll('path').data(madrid.features)
    .enter()
    .append('path')
    .attr('d', madPath)
    .attr('fill', '#00838f')
    .attr('stroke-width', '1')
    .attr('stroke', '#00b8d4')
    // .on('click', d => console.log(d.neighbourhood_group));
    .attr('opacity', 0);

  return {
    path: madPath,
    projection: madProjection
  };
}
