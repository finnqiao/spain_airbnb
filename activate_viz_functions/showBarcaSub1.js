function showBarcaSub1(svg) {
  // Hide polar chart 2
  svg.select('#barcaPolarChart2')
    .selectAll('.price_fan')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity',0);

  // svg.selectAll('.label_text,.chart_labels,.polar_chart2')
  //   .transition()
  //   .duration(0)
  //   .attr('opacity', 0);

  svg.select('#barcaPolarChart2')
    .classed('noshow', true);

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
    .duration(0)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  // Show mwc slider
  svg.select('#barcaSlider1')
    .classed('noshow', false);

  svg.select('#barcaSlider1')
    .transition()
    .duration(0)
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

  // Show barcelona subway
  svg.select('#barcaSub')
    .classed('noshow', false);

  svg.select('#barcaSub').selectAll('path')
    .transition()
    .duration(600)
    .attr('opacity', 1);
}