function showBarcaPolarChart2(svg) {
  // Hide map
  svg.select('#barcaMap')
    .selectAll('path')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#barcaMap')
    .classed('noshow', true);

  // Hide Circles
  svg.select('#barcaCircles').selectAll('.centroid')
    .transition().duration(0)
    .attr('opacity', 0)
    .attr('width', 0)
    .attr('height', 0);

  svg.select('#barcaCircles')
    .classed('noshow', true);

  // Hide landmarks
  svg.select('#barcaLandmarks').selectAll('.mark')
    .transition().duration(0)
    .attr('opacity', 0)
    .transition()
    .attr('width', 0)
    .attr('height', 0);

  svg.select('#barcaLandmarks')
    .classed('noshow', true);

  // Hide Events
  svg.select('#barcaEvents')
    .selectAll('.tooltipCircle')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition().duration(0)
    .attr('opacity', 0);

  svg.select('#barcaEvents')
    .classed('noshow', true);

  // Hide polar chart 1

  svg.select('#barcaPolarChart1')
    .selectAll('price_fan')
    .on('mouseover', null)
    .on('mouseout', null)
    .transition().duration(0)
    .attr('opacity',0);

  svg.select('#barcaPolarChart1')
    .classed('noshow', true);

  // Show polar chart 2
  var div = d3.select('#tooltipDiv');
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var formatDate = d3.timeFormat('%m/%d/%Y');

  svg.select('#barcaPolarChart2')
    .classed('noshow', false);

  svg.select('#barcaPolarChart2')
    .selectAll('.price_fan')
    .on('mouseover',function(d) {
      div.transition()
        .duration(200)
        .style('opacity', .9);

      div.html( 'DATE: ' + formatDate(d.date) + '<br />DAY OF THE WEEK: ' + days[d.date.getDay()] + '<br />AVERAGE PRICE: ' + (Math.floor(d.avg_price * 100) / 100) )
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    })
    .on('mouseout',function() {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    })
    .transition()
    .delay(function(d,i) { return 300 + i*25; })
    .duration(500)
    .attr('opacity',1);
}