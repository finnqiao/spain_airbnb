
function createBarcaCircles(barcelona, path, eventData, price_flag_color, date, year, svg) {
  var centroids = barcelona.features.map(function (feature){
    return [path.centroid(feature), feature.code];
  });

  date_key = new Date(date + '/' + year);
  date_lookup = d3.map(eventData.filter(d => new Date(d.date).getTime() == date_key.getTime()), d => d.code);

  var price_circles = svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaCircles')
    .selectAll('.centroid')
    .data(centroids)

  // console.log(price_circles);

  price_circles.enter().append('circle')
    .merge(price_circles)
    .attr('class', 'centroid')
    .attr('cx', d => d[0][0])
    .attr('cy', d => d[0][1])
    .attr('r', 0)
    // .attr('r', d => {
    //   console.log(d);
    //   if (date_lookup.get(d[1])){
    //     var value = date_lookup.get(d[1])['num_listing'];
    //     return Math.sqrt(value);
    //   }
    // })
    .attr('fill', d => {
      if (date_lookup.get(d[1])){
        var value = date_lookup.get(d[1])['avg_price'];
        return (price_flag_color(value));
      }
      else {
        return 'Red';
      }
    })
    .attr('opacity', 0);
  price_circles.exit().remove();

  svg.select('#barcaCircles')
    .classed('noshow', true)
}