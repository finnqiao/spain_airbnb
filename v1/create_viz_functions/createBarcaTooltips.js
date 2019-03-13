function createBarcaTooltips(barTooltips, barProj, svg) {
  var iconHeight = 30;
  var iconWidth = 30;
  
  svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaTooltips')
    .selectAll('.mark')
    .data(barTooltips)
    .enter()
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