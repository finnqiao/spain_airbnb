
function createBarcaSlider(data, price_flag_color, svg) {
  
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
  var min_date = new Date(2018, 1, 4);
  var max_date = new Date(2018, 3, 2);

  var data_time = d3.timeWeeks(min_date, max_date);

  // test date slider for MWC

  var sliderTime = d3
    .sliderBottom()
    .min(min_date)
    .max(max_date)
    .step(1000 * 60 * 60 * 24 * 7)
    .width(400)
    .tickFormat(d3.timeFormat('%m/%d'))
    .tickValues(data_time)
    .default(min_date)
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%m/%d')(val));
      update(formatDate(val), "18")
    });

  var gTime = svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaSlider')
    // .attr('width', 500)
    // .attr('height', 100)
    // .attr('transform', `translate(${translate[0]},${translate[1]})`);
    .attr('transform','translate(30,30)')
    .attr('opacity', 0);

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%m/%d')(sliderTime.value()));

  svg.select('#barcaSlider')
    .classed('noshow', true);
}