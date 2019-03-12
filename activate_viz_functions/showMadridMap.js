function showMadridMap(svg) {
// Set madrid map and madrid subway to not no show
  svg.select('#madridMap')
    .classed('noshow', false)

  svg.select('#madridSub')
    .classed('noshow', false)


  // Set barca map to no show
  svg.select('#barcaMap')
    .classed('noshow', true)

  svg.select('#barcaSub')
    .classed('noshow', true)

  // Hide barcelona map
  svg.select('#barcaMap').selectAll('path')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition().duration(0)
    .attr('opacity', 0);

  // Hide barcelona subway
  svg.select('#barcaSub').selectAll('path')
    .transition().duration(0)
    .attr('opacity', 0);

  // Hide madrid subway
  svg.select('#madridSub').selectAll('path')
    .transition().duration(0)
    .attr('opacity', 0);

  // Show madrid map
  svg.select('#madridMap').selectAll('path')
    .on('mouseenter', function() {
      d3.select(this)
        .attr('opacity', .6);
    })
    .on('mouseleave', function() {
      d3.select(this)
        .attr('opacity', 1);
    })
    .transition().duration(800)
    .delay(function(d,i){
      return i*4;
    })
    .attr('opacity', 1)
}