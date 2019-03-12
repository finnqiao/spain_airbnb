function showTitle(svg) {
  // Hide barcelona map
  svg.select('#barcaMap').selectAll('path')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition()
    .duration(0)
    .attr('opacity', 0);

    // Show title
  svg.select('#titleSection')
    .classed('noshow', false);

  svg.select('#titleSection').selectAll('text')
    .transition()
    .duration(600)
    .attr('opacity', 1.0);
}