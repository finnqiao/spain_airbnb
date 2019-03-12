function showBarcaSub(svg) {
  // Hide madrid map
  svg.select('#madridMap').selectAll('path')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  // Hide barca polar chart
  svg.select('#barcaPolarChart2')
    .selectAll('.price_fan')
    .on('mouseover', null)
    .on('mouseout', null)
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#barcaPolarChart2')
    .classed('noshow', true)

  // Show barcelona map - in case a user scrolls up to this section
  svg.select('#barcaMap')
    .classed('noshow', false)

  svg.select('#barcaMap').selectAll('path')
    .on('click', null)
    .on('mouseenter', function() {
      d3.select(this)
        .attr('opacity', .6);
    })
    .on('mouseleave', function() {
      d3.select(this)
        .attr('opacity', 1);
    })
    .transition().duration(300)
    .attr('opacity', 1);

  // Show barcelona subway
  svg.select('#barcaSub')
    .classed('noshow', false);

  svg.select('#barcaSub').selectAll('path')
    .transition().duration(1200)
    .delay(300)
    .attr('opacity', 1);

}