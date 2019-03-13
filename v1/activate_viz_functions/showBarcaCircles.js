function scaleMap(height, origHeight, origScale) {
  return (height / origHeight) * origScale;
}

function showBarcaCircles(svg) {
  // Hide heatmap
  svg.select('#barcaMap').selectAll('path')
    .on('click', null)
    .transition().duration(100)
    .attr('fill', '#00838f');

  // Hide tooltips
  svg.select('#barcaTooltips')
    .selectAll('.tooltipCircle')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition()
    .duration(0)
    .attr('opacity', 0)
    .attr('width', 0)
    .attr('height', 0);

  svg.select('#barcaTooltips')
    .classed('noshow', true)

  // Hide Circles
  svg.select('#barcaCircles').selectAll('.centroid')
    .transition().duration(0)
    .attr('opacity', 0)
    .attr('width', 0)
    .attr('height', 0);

  // Show circles
  svg.select('#barcaCircles')
    .classed('noshow', false)

  svg.select('#barcaCircles').selectAll('.centroid')
    .transition()
    .duration(1000)
    .delay(100)
    .attr('r', d => {
      if (date_lookup.get(d[1])){
        var listings = date_lookup.get(d[1])['num_listing'];
        var avail = date_lookup.get(d[1])['available'];
        return Math.sqrt(listings * avail) * (height / origHeight);
      }
    })
    .attr('opacity', .7);
}
