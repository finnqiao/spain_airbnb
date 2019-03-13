function createMadridTooltips(madTooltips, madProj, svg) {
  var iconHeight = 30;
  var iconWidth = 30;
  
  svg.select('#madridVis')
    .append('g')
    .attr('id', 'madridTooltips')
    .selectAll('.mark')
    .data(madTooltips)
    .enter()
    .append('svg:image')
    .attr('class','mark')
    .attr('width', 0)
    .attr('height', 0)
    .attr('xlink:href', function(d) {
      return d.svg;
    })
    .attr('transform', function(d) {
      return 'translate(' + (madProj([d.long,d.lat])[0] - (iconWidth * .5)) + ',' +
        (madProj([d.long,d.lat])[1] - (iconHeight * .5)) + ')';
    })
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity', 0);

  svg.select('#madridTooltips')
    .classed('noshow', true)
}