
function createBarcaLandmarks(barLandmarks, barProj, svg) {
  var iconHeight = 30;
  var iconWidth = 30;

  svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaLandmarks')
    .selectAll('.mark')
    .data(barLandmarks)
    .enter()
    .append('svg:image')
    .attr('class','mark')
    .attr('width', 0)
    .attr('height', 0)
    .attr('xlink:href',d => d.svg)
    .attr('transform', function(d) {
      return 'translate(' + (barProj([d.long,d.lat])[0] - (iconWidth * .5)) + ',' +
        (barProj([d.long,d.lat])[1] - (iconHeight * .5)) + ')';
    })
    .attr('opacity', 0);
    // .on('click', d => console.log(d.name))
    // .transition()
    // .ease(d3.easeElastic)
    // .delay((d,i) => 700*i)
    // .duration(1000)
    // .attr('width','40')
    // .attr('height','40')

  svg.select('#barcaLandmarks')
    .classed('noshow', true)
}