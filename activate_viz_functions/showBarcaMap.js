function showBarcaMap(svg) {
  // console.log('show');
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
  svg.select('#backgroundSection').selectAll('text')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#backgroundSection')
    .classed('noshow', true);

  // Hide barcelona listings / tooltips
  svg.select('#barcaTooltips')
    .selectAll('marks')
    .transition().duration(0)
    .attr('opacity', 0);

  svg.select('#barcaTooltips')
    .classed('noshow', true);

  // Show barcelona map
  var div = d3.select('#tooltipDiv');

  svg.select('#barcaMap')
    .classed('noshow', false)

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
    .delay(function(d,i){
      return i*5;
    })
    .attr('opacity', 1);
}
