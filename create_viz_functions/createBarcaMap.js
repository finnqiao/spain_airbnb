function scaleMap(height, origHeight, origScale) {
  return (height / origHeight) * origScale;
}

function createBarcaMap(barcelona, svg) {

  var barCenter = d3.geoCentroid(barcelona);

  // // create the barcelona path

  var origBarcaScale = 250000;
  var barcaScale = scaleMap(height, origHeight, origBarcaScale);

  var barProj = d3.geoMercator().center(barCenter)
    .scale(barcaScale).translate([(width * .52), (height * .45)]);
  barPath = d3.geoPath().projection(barProj);

  bar_list = [];

  barcelona.features.forEach(d => {
    d.neighbourhood = d.properties.neighbourhood;
    d.neighbourhood_group = d.properties.neighbourhood_group;
    bar_list.push(d.neighbourhood);
  })

  svg.append('g')
    .attr('id', 'barcaVis')
    .append('g')
    .attr('id', 'barcaMap')
    .selectAll('path').data(barcelona.features)
    .enter()
    .append('path')
    .attr('d', barPath)
    .attr('fill', '#00b8d4')
    .attr('stroke-width', '1')
    .attr('stroke', '#00b8d4')
    .on('click', null)
    .attr('opacity', 0);

  svg.select('#barcaMap')
    .classed('noshow', true)

    return {
      path: barPath,
      projection: barProj
    };
}
