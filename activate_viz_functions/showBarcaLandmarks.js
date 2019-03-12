function showBarcaLandmarks(svg) {
  // Show landmarks
  var iconHeight = 30;
  var iconWidth = 30;

  svg.select('#barcaLandmarks')
    .classed('noshow', false);

  svg.select('#barcaLandmarks').selectAll('.mark')
    .transition().duration(0)
    .attr('opacity', 1)
    .transition()
    .ease(d3.easeElastic)
    .delay((d,i) => 300*i)
    .duration(1000)
    .attr('width',iconWidth)
    .attr('height',iconHeight)
}