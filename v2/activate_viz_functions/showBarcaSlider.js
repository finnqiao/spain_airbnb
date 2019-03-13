function showBarcaSlider(svg) {
  // SHow slider
  svg.select('#barcaSlider')
    .classed('noshow', false);

  svg.select('#barcaSlider')
    .transition()
    .duration(400)
    .attr('opacity', 1);
}