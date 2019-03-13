function showMadridTooltips(svg) {
  var iconWidth = 30;
  var iconHeight = 30;
  var tooltipOffset = 70;
  
  // Hide madrid landmarks
  svg.select('#madridLandmarks')
    .selectAll('.mark')
    .attr('width', 0)
    .attr('height', 0)
    .attr('opacity', 0);

  svg.select('#madridLandmarks')
    .classed('noshow', true);
  
  // SHow madrid tooltips/listings
  svg.select('#madridTooltips')
    .classed('noshow', false);
  var marks = svg.select('#madridTooltips')
    .selectAll('.mark');
  var div = d3.select('#tooltipDiv');

  marks.transition()
    .duration(0)
    .attr('opacity', .8)
    .transition()
    .ease(d3.easeElastic)
    .delay((d,i) => 200*i)
    .duration(1000)
    .attr('width',iconWidth)
    .attr('height',iconHeight);
  
  marks.on('mouseenter', function(d) {
    var top;
    if (height * .6 >= svg.madProj([d.long, d.lat])[1]) {
      top = (Math.round(d3.event.pageY - tooltipOffset)) + 'px';
    } else {
      top = (Math.round(d3.event.pageY + tooltipOffset - tooltipDivHeight)) + 'px';
    }
    // console.log(top);
    div.style('width', '280px');

    div.transition()
      .duration(200)
      .style('opacity', .9);

    div.html('<b>' + d.Name + '</b><br/><br/' + 
        d.Description + '<br/>' +
        'Neighborhood: ' + d.Neighborhood + '<br/><br/>' + 
        'This ' + d.Type + ' accommodates ' + d.Accommodates + ' people and averages $' + d.Price + ' per night.<br/><br/>' +
        '<img src = ' + d.imageLink + ' width=200 style="padding-left:40px">'
      )
      .style('left', (d3.event.pageX) + 'px')
      .style('top', top);
  })
  .on('mouseleave', function() {
    div.transition()
      .duration(500)
      .style('opacity', 0);
  });
}