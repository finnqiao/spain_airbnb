function showMadridCLF(svg) {
  
  // Hide polar chart 2
  svg.select('#madridPolarChart2')
    .selectAll('.price_fan')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity',0);

  // svg.selectAll('.label_text,.chart_labels,.polar_chartMad2')
  //   .transition()
  //   .duration(0)
  //   .attr('opacity', 0);

  svg.select('#madridPolarChart2')
    .classed('noshow', true);

  // Hide mdadrid subway
  svg.select('#madridSub')
    .classed('noshow', true);

  svg.select('#madridSub').selectAll('path')
    .transition().duration(0)
    .attr('opacity', 0);

  // Show madrid map
  var div = d3.select('#tooltipDiv');

  svg.select('#madridMap')
    .classed('noshow', false);

  svg.select('#madridMap')
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

  // Show sonar icon
  var iconHeight = 40;
  var iconWidth = 40;

  svg.select('#madridEvents')
    .classed('noshow', false);

  svg.select('#event-clf')
    .transition()
    .duration(0)
    .attr('opacity', .9)
    .transition()
    .ease(d3.easeElastic)
    .duration(1000)
    .delay(300)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  // Show clf slider
  updateCircles(svg.clf2019, price_flag_color, new Date(2019, 5, 1), '19', 'madrid', svg);

  svg.select('#madridSlider2')
    .classed('noshow', false);

  svg.select('#madridSlider2')
    .transition()
    .duration(400)
    .attr('opacity', 1);

  // Show circles
  svg.select('#madridCircles')
    .classed('noshow', false);

  svg.select('#madridCircles').selectAll('.centroid')
    .transition()
    .duration(1000)
    .delay(100)
    // .attr('r', d => {
    //   if (date_lookup.get(d[1])){
    //     var listings = date_lookup.get(d[1])['num_listing'];
    //     var avail = date_lookup.get(d[1])['available'];
    //     return Math.sqrt(listings * avail) * (height / origHeight);
    //   }
    // })
    .attr('opacity', .7);
}