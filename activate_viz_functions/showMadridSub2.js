function showMadridSub2(svg) {
  
  // // Hide madrid visuals
  // svg.select('#madridMap')
  //   .selectAll('path')
  //   .on('click', null)
  //   .on('mouseenter', null)
  //   .on('mouseleave', null)
  //   .transition()
  //   .duration(0)
  //   .attr('opacity', 0);

  // svg.select('#madridVis')
  //   .classed('noshow', true);

  // // Show barca visuals
  // svg.select('#barcaVis')
  //   .classed('noshow', false);

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

  // Show clf icon
  var iconHeight = 40;
  var iconWidth = 40;

  svg.select('#bmadridEvents')
    .classed('noshow', false);

  svg.select('#event-clf')
    .transition()
    .duration(0)
    .attr('opacity', .9)
    .transition()
    .duration(0)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  // Show clf slider
  svg.select('#madridSlider2')
    .classed('noshow', false);

  svg.select('#madridSlider2')
    .transition()
    .duration(0)
    .attr('opacity', 1);

  // Show circles
  svg.select('#madridCircles')
    .classed('noshow', false)

  svg.select('#madridCircles').selectAll('.centroid')
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

  // Show madrid subway - only show orange line
  svg.select('#madridSub')
    .classed('noshow', false);

  svg.select('#madridSub')
    .selectAll('path')
    .transition()
    .duration(800)
    .attr('opacity', 1);

  svg.selectAll('#madridSub')
    .selectAll('path')
    .filter(function() {
      return !d3.select(this).attr('class').includes('madL7');
    })
    .transition()
    .duration(800)
    .delay(800)
    .attr('opacity', 0);
}