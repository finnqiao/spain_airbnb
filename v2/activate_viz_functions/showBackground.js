function showBackground(svg) {
  // Hide barcelona map
  svg.select('#barcaMap').selectAll('path')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition()
    .duration(0)
    .attr('opacity', 0);

    // Show title
  svg.select('#backgroundSection')
    .classed('noshow', false);

  svg.select('#backgroundSection').selectAll('text')
    .transition()
    .duration(600)
    .attr('opacity', 1.0);
}
