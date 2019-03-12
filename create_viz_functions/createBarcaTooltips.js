function createBarcaTooltips(barTooltips, barProj, svg) {
  var iconHeight = 30;
  var iconWidth = 30;
  
  svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaTooltips')
    .selectAll('.tt')
    .data(barTooltips)
    .enter()
    // .append('circle')
    // .attr('class', 'tooltipCircle')
    // .attr('r', 7)
    // .style('fill', '#d5ad36')
    // .style('stroke', '#56B4EF')
    // .attr('cx', function(d) {
    //   return barProj([d.long, d.lat])[0];
    // })
    // .attr('cy', function(d) {
    //   return barProj([d.long, d.lat])[1];
    // })
    .append('svg:image')
    .attr('class','mark')
    .attr('width', 0)
    .attr('height', 0)
    .attr('xlink:href', function(d) {
      return d.svg;
    })
    .attr('transform', function(d) {
      return 'translate(' + (barProj([d.long,d.lat])[0] - (iconWidth * .5)) + ',' +
        (barProj([d.long,d.lat])[1] - (iconHeight * .5)) + ')';
    })
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity', 0);

  svg.select('#barcaTooltips')
    .classed('noshow', true)
}