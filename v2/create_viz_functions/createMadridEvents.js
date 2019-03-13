function createMadridEvents(madEvents, madProj, svg) {
  var iconHeight = 40;
  var iconWidth = 40;
  
  svg.select('#madridVis')
    .append('g')
    .attr('id', 'madridEvents')
    .selectAll('.tt')
    .data(madEvents)
    .enter()
    .append('svg:image')
    .attr('id', function(d) { return d.Html_ID; })
    .attr('class','mark')
    .attr('width', 0)
    .attr('height', 0)
    .attr('xlink:href',d => d.Icon)
    .attr('transform', function(d) {
      return 'translate(' + (madProj([d.long,d.lat])[0] - (iconWidth * .5)) + ',' +
        (madProj([d.long,d.lat])[1] - (iconHeight * .5)) + ')';
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

  svg.select('#madridEvents')
    .classed('noshow', true)
}