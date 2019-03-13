function showBarcaPolarChart1(svg) {
  // Hide map
  svg.select('#barcaMap')
    .selectAll('path')
    .on('click', null)
    .on('mouseenter', null)
    .on('mouseleave', null)
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#barcaMap')
    .classed('noshow', true);

  // Hide Events
  svg.select('#barcaEvents')
    .selectAll('.mark')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('width', 0)
    .attr('height', 0)
    .transition().duration(0)
    .attr('opacity', 0);

  svg.select('#barcaEvents')
    .classed('noshow', true);

  // Hide mwc slider
  svg.select('#barcaSlider1')
    .classed('noshow', true);

  svg.select('#barcaSlider1')
    .transition()
    .duration(400)
    .attr('opacity', 1);

  // Hide circles
  svg.select('#barcaCircles')
    .classed('noshow', true);

  svg.select('#barcaCircles')
    .selectAll('.centroid')
    .transition()
    .duration(0)
    .attr('r', 0)
    .attr('opacity', .0);


  // Show polar chart mwc
  var div = d3.select('#tooltipDiv');
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var formatDate = d3.timeFormat('%m/%d/%Y');

  var div = d3.select('#tooltipDiv')
    .style('width', '200px');

  svg.select('#barcaPolarChart1')
    .classed('noshow', false);

  svg.select('#barcaPolarChart1')
    .selectAll('.price_fan')
    .on('mouseenter',function(d) {
      div.transition()
        .duration(200)
        .style('opacity', .9);

      div.html('Date: ' + formatDate(d.date) + '<br />Day of the Week: ' + days[d.date.getDay()] +
      '<br />Average Price: ' + (Math.floor(d.avg_price * 100) / 100) )
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    })
    .on('mouseleave',function() {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    })
    .transition()
    .delay(function(d,i) { return 300 + i*25; })
    .duration(500)
    .attr('opacity',1);

  // svg.selectAll('.label_text,.chart_labels,.polar_chart1')
  //   .transition()
  //   .duration(100)
  //   .delay(function(d, i) {
  //     return i * 350;
  //   })
  //   .attr('opacity', .8);
}