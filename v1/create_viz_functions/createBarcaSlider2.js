
function createBarcaSlider2(data, price_flag_color, svg) {
  
  function update(date, year) {
    date_key = new Date(date + "/" + year);
    date_lookup = d3.map(data.filter(d => new Date(d.date).getTime() == date_key.getTime()), d => d.code);

    var price_circles = svg.select('#barcaCircles')
      .selectAll('.centroid');
  
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

  var formatDate = d3.timeFormat('%m/%d');
  // var min_date = new Date(d3.min(data, d=>d.date));
  // var max_date = new Date(d3.max(data, d=>d.date));
  var min_date = new Date(2018, 5, 9);
  var max_date = new Date(2018, 5, 22);

  var data_time = d3.timeDays(min_date, max_date);

  // test date slider for MWC

  // update(new Date(2018, 5, 16), '18');

  var sliderTime = d3
    .sliderBottom()
    .min(min_date)
    .max(max_date)
    .step(1000 * 60 * 60 * 24)
    .width(400)
    .tickFormat(d3.timeFormat('%-m/%-d'))
    .tickValues(data_time)
    .default(new Date(2018, 5, 16))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%m/%d')(val));
      updateCircles(data, price_flag_color, formatDate(val), '18', svg)
    });

  var gTime = svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaSlider2')
    // .attr('width', 500)
    // .attr('height', 100)
    // .attr('transform', `translate(${translate[0]},${translate[1]})`);
    .attr('transform','translate(30,30)')
    .attr('opacity', 0);

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%m/%d')(sliderTime.value()));

  svg.select('#barcaSlider2')
    .classed('noshow', true);
}