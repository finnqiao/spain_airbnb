function showBarcaMap(svg) {
  console.log('show');
  // Set madrid map and madrid subway to no show
  // Need to change when I change Madrid
  svg.select('#madridMap')
    .classed('noshow', true)

  svg.select('#madridSub')
    .classed('noshow', true)

  // Set barca map to not no show
  svg.select('#barcaVis')
    .classed('noshow', false)

  // Hide title
  svg.select('#titleSection').selectAll('text')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#titleSection')
    .classed('noshow', true);

  // Hide barcelona subway
  svg.select('#barcaSub').selectAll('path')
    .transition().duration(0)
    .attr('opacity', 0);

  // Show barcelona map
  svg.select('#barcaMap')
    .classed('noshow', false)

  svg.select('#barcaMap').selectAll('path')
    .on('click',  null)
    .on('mouseenter', function() {
      d3.select(this)
        .attr('opacity', .6);
    })
    .on('mouseleave', function() {
      d3.select(this)
        .attr('opacity', 1);
    })
    .transition().duration(0)
    .attr('fill', '#00838f')
    .transition().duration(800)
    .delay(function(d,i){
      return i*5;
    })
    .attr('opacity', 1);
}
