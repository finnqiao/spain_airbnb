function showBarcaMWC(svg) {
  
  // Hide polar chart 1
  svg.select('#barcaPolarChart1')
    .selectAll('.price_fan')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity',0);

  svg.selectAll('.label_text,.chart_labels,.polar_chart1')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#barcaPolarChart1')
    .classed('noshow', true);

  // Hide barcelona subway
  svg.select('#barcaSub')
    .classed('noshow', true);

  svg.select('#barcaSub').selectAll('path')
    .transition().duration(0)
    .attr('opacity', 0);

  // Show barca map
  var div = d3.select('#tooltipDiv');

  svg.select('#barcaMap')
    .classed('noshow', false);

  svg.select('#barcaMap')
    .selectAll('path')
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
    .attr('opacity', 1);

  // Show mwc icon
  var iconHeight = 40;
  var iconWidth = 40;

  svg.select('#barcaEvents')
    .classed('noshow', false);

  svg.select('#event-mwc')
    .transition()
    .duration(0)
    .attr('opacity', .9)
    .transition()
    .ease(d3.easeElastic)
    .duration(1000)
    .delay(300)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  // Show mwc slider
  updateCircles(svg.mwc2018, price_flag_color, new Date(2018, 1, 25), '18', 'barcelona', svg);

  svg.select('#barcaSlider1')
    .classed('noshow', false);

  svg.select('#barcaSlider1')
    .transition()
    .duration(400)
    .attr('opacity', 1);

  // Show circles
  svg.select('#barcaCircles')
    .classed('noshow', false)

  svg.select('#barcaCircles').selectAll('.centroid')
    .transition()
    .duration(1000)
    .delay(100)
    .attr('r', d => {
      if (date_lookup.get(d[1])){
        var listings = date_lookup.get(d[1])['num_listing'];
        var avail = date_lookup.get(d[1])['available'];
        return Math.sqrt(listings * avail) * (height / origHeight);
      }
    })
    .attr('opacity', .7);
}