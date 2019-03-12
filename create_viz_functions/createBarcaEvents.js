function createBarcaEvents(barEvents, barProj, svg) {
  var iconHeight = 40;
  var iconWidth = 40;
  
  svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaEvents')
    .selectAll('.tt')
    .data(barEvents)
    .enter()
    .append('svg:image')
    .attr('class','mark')
    .attr('width', 0)
    .attr('height', 0)
    .attr('xlink:href',d => d.Icon)
    .attr('transform', function(d) {
      return 'translate(' + (barProj([d.long,d.lat])[0] - (iconWidth * .5)) + ',' +
        (barProj([d.long,d.lat])[1] - (iconHeight * .5)) + ')';
    })
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
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity', 0);

  svg.select('#barcaEvents')
    .classed('noshow', true)
}