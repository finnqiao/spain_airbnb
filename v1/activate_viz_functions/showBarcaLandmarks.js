function showBarcaLandmarks(svg) {
  var iconHeight = 30;
  var iconWidth = 30;

  var div = d3.select('#tooltipDiv');

  // Hide tooltips/listings
  svg.select('#barcaTooltips')
    .selectAll('.mark')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition()
    .duration(0)
    .attr('width', 0)
    .attr('height', 0)
    .attr('opacity', 0);

  svg.select('#barcaTooltips')
    .classed('noshow', true);

  // Hide barca heatmap
  svg.select('#barcaMap').selectAll('path')
    .on('click',  null)
    .on('mouseenter', function(d) {
      d3.select(this)
        .attr('opacity', .6);

      div.style('width', '120px');

      div.transition()
        .duration(200)
        .style('opacity', .9);

      div.html('<b>Neighborhood:</b><br/>' +
        d.neighbourhood + '<br/>')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY) + 'px');
    })
    .on('mouseleave', function() {
      d3.select(this)
        .attr('opacity', 1);

      div.transition()
        .duration(500)
        .style('opacity', 0);
    })
    .transition().duration(0)
    .attr('fill', '#00838f')
    .transition().duration(800)
    .attr('opacity', 1);

  // Show landmarks
  svg.select('#barcaLandmarks')
    .classed('noshow', false);

  svg.select('#barcaLandmarks').selectAll('.mark')
    .transition().duration(0)
    .attr('opacity', 1)
    .transition()
    .ease(d3.easeElastic)
    .delay((d,i) => 200*i)
    .duration(1000)
    .attr('width',iconWidth)
    .attr('height',iconHeight);
}