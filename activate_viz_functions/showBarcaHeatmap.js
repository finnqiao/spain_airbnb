function showBarcaHeatmap(svg) {
  var num_domain = [0, 50, 70, 90, 110, 3000];
  var num_color = d3.scaleThreshold()
    .domain(num_domain)
    .range(d3.schemeGnBu[5]);

  // Hide circles
  svg.select('#barcaEvents').selectAll('.mark')
    .transition()
    .duration(0)
    .attr('r', 0)
    .attr('opacity', 0);

  svg.select('#barcaEvents')
    .classed('noshow', true);

  // Show landmarks
  var iconHeight = 30;
  var iconWidth = 30;
  
  svg.select('#barcaLandmarks')
    .classed('noshow', false);

  svg.select('#barcaLandmarks').selectAll('.mark')
    .transition().duration(0)
    .attr('opacity', 1)
    .transition()
    .ease(d3.easeElastic)
    .delay((d,i) => 200*i)
    .duration(1000)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  // Show Heatmap
  var div = d3.select('#tooltipDiv');

  svg.select('#barcaMap').selectAll('path')
    .on('click',  null)
    .on('mouseenter', function(d) {
      // console.log(svg.testLookup.get(d.code));
      var value = Math.round(svg.testLookup.get(d.code)['Price'] * 100) / 100;
      d3.select(this)
        .attr('opacity', .6);

      div.style('width', '120px');

      div.transition()
        .duration(200)
        .style('opacity', .9);

      div.html('<b>Neighborhood:</b><br/>' +
        d.neighbourhood + '<br/>' + 
        '<b>Average Price:</b><br/>' +
        value + '<br/>')
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
    .transition()
    .duration(500)
    .delay(function(d,i){
      return i*5;
    })
    .attr('fill', function(d) {
      var value;
      if (svg.testLookup.get(d.code)) {
        value = svg.testLookup.get(d.code)['Price'];
      } else {
        value = 0;
      }

      return (num_color(value));
    });
}
