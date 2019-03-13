
function createMadridSlider2(data, price_flag_color, svg) {
  

  var formatDate = d3.timeFormat('%m/%d');
  // var min_date = new Date(d3.min(data, d=>d.date));
  // var max_date = new Date(d3.max(data, d=>d.date));
  var min_date = new Date(2019, 4, 25);
  var max_date = new Date(2019, 5, 8);

  var data_time = d3.timeDays(min_date, max_date);

  var sliderTime = d3
    .sliderBottom()
    .min(min_date)
    .max(max_date)
    .step(1000 * 60 * 60 * 24)
    .width(400)
    .tickFormat(d3.timeFormat('%-m/%-d'))
    .tickValues(data_time)
    .default(new Date(2019, 5, 1))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%m/%d')(val));
      updateCircles(data, price_flag_color, formatDate(val), '19', 'madrid', svg)
    });

  var gTime = svg.select('#madridVis')
    .append('g')
    .attr('id', 'madridSlider2')
    // .attr('width', 500)
    // .attr('height', 100)
    // .attr('transform', `translate(${translate[0]},${translate[1]})`);
    .attr('transform','translate(30,30)')
    .attr('opacity', 0);

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%m/%d')(sliderTime.value()));

  svg.select('#madridSlider2')
    .classed('noshow', true);
}