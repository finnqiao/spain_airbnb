
function createBarcaSlider1(data, price_flag_color, svg) {

  var formatDate = d3.timeFormat('%m/%d');
  // var min_date = new Date(d3.min(data, d=>d.date));
  // var max_date = new Date(d3.max(data, d=>d.date));
  var min_date = new Date(2018, 1, 18);
  var max_date = new Date(2018, 2, 4);

  var data_time = d3.timeDays(min_date, max_date);

  // test date slider for MWC

  var sliderTime = d3
    .sliderBottom()
    .min(min_date)
    .max(max_date)
    .step(1000 * 60 * 60 * 24)
    .width(400)
    .tickFormat(d3.timeFormat('%-m/%-d'))
    .tickValues(data_time)
    .default(new Date(2018, 1, 25))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%m/%d')(val));
      updateCircles(data, price_flag_color, formatDate(val), '18', 'barcelona', svg)
    });

  var gTime = svg.select('#barcaVis')
    .append('g')
    .attr('id', 'barcaSlider1')
    // .attr('width', 500)
    // .attr('height', 100)
    // .attr('transform', `translate(${translate[0]},${translate[1]})`);
    .attr('transform','translate(30,30)')
    .attr('opacity', 0);

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%m/%d')(sliderTime.value()));

  svg.select('#barcaSlider1')
    .classed('noshow', true);
}