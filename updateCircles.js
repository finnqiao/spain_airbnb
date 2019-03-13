function updateCircles(data, price_flag_color, date, year, city, svg) {
    date_key = new Date(date + "/" + year);
    date_lookup = d3.map(data.filter(d => new Date(d.date).getTime() == date_key.getTime()), d => d.code);

    if (city === 'barcelona') {
      var price_circles = svg.select('#barcaCircles')
        .selectAll('.centroid');
    } else if (city === 'madrid') {
      var price_circles = svg.select('#madridCircles')
        .selectAll('.centroid');
    }
  
    price_circles
      .transition()
      .duration(0)
      .attr('r', d => {
        if (date_lookup.get(d[1])){
        var listings = date_lookup.get(d[1])['num_listing'];
        var avail = date_lookup.get(d[1])['available'];
        return Math.sqrt(listings * avail) * (height / origHeight);
        }
      })
      .attr('fill', d => {
        if (date_lookup.get(d[1])){
          var value = date_lookup.get(d[1])['avg_price'];
          return (price_flag_color(value));
        }
      })
  }