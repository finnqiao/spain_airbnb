function showBarcaHeatmap(svg) {
  var num_domain = [0,2,4,6,8,10];
  var num_color = d3.scaleThreshold()
    .domain(num_domain)
    .range(d3.schemeGnBu[5]);

  // Hide circles
  svg.select('#barcaMap').selectAll('.centroid')
    .transition()
    .duration(0)
    .attr('r', 0)
    .attr('opacity', 0);

  // Show Heatmap
  svg.select('#barcaMap').selectAll('path')
    .transition()
    .duration(500)
    .delay(function(d,i){
      return i*5;
    })
    .attr('fill', function(d) {
      var value = svg.testLookup.get(d.properties.neighbourhood)['nums'];
      // console.log(value);
      // console.log(num_color(value));
      return (num_color(value));
    });
}
