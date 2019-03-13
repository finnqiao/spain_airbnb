var showStarted = false;

function showBarcaEvents(svg) {

  // Hide landmarks
  svg.select('#barcaLandmarks').selectAll('.mark')
    .transition().duration(0)
    .attr('opacity', 0)
    .attr('width', 0)
    .attr('height', 0);

  svg.select('#barcaLandmarks')
    .classed('noshow', true);

  // Hide barca heatmap
  var div = d3.select('#tooltipDiv');

  svg.select('#barcaMap')
    .classed('noshow', false);

  svg.select('#barcaMap')
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

  // Hide polar chart 1
  svg.select('#barcaPolarChart1')
    .selectAll('.price_fan')
    .on('mouseenter', null)
    .on('mouseleave', null)
    .attr('opacity',0);

  // svg.selectAll('.label_text,.chart_labels,.polar_chart1')
  //   .transition()
  //   .duration(0)
  //   .attr('opacity', 0);

  svg.select('#barcaPolarChart1')
    .classed('noshow', true);

  // Show event images
  var tooltipOffset = 70;
  var iconHeight = 40;
  var iconWidth = 40;

  svg.select('#barcaEvents')
    .classed('noshow', false);
  var events = svg.select('#barcaEvents')
    .selectAll('.mark');
  var div = d3.select('#tooltipDiv');
  // div.classed('noshow', false);

  events.transition()
    .duration(0)
    .attr('opacity', .9)
    .transition()
    .ease(d3.easeElastic)
    .delay((d,i) => 300*i)
    .duration(1000)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  events.on('mouseenter', function(d) {
    var transform = d3.select(this).attr('transform');
    var comma = transform.indexOf(',');

    var cx = transform.substring(10, comma);
    var cy = transform.substring(comma + 1, transform.length - 1);

    div.style('width', (width - cx) + 'px');
    // console.log(height);
    // console.log(svg.barProj([d.long, d.lat])[1]);
    // console.log(d3.event.pageY);
    // console.log(top);
    div.transition()
      .duration(200)
      .style('opacity', .9);
    
    div.html(
      '<b><font size = 4>' + d.Name + '</font><br/>' + 
      'Venue: </b>' + d.Venue + '<br/><br/>' +
      d.Description + '<br/><br/>' +
      d.Description2 + '<br/><br/>' + 
      '<b>Attended By: </b>' + d.AttendedBy + '<br/><br/>' +
      '<img class = "mySlides" src = ' + d.imageLink1 + ' width=300 style="padding-left: ' + ((width - cx) - 300) * .5 + 'px">' +
      '<img class = "mySlides" src = ' + d.imageLink2 + ' width=300 style="display: none;padding-left: ' + ((width - cx) - 300) * .5 + 'px">' + 
      '<img class = "mySlides" src = ' + d.imageLink3 + ' width=300 style="display: none;padding-left: ' + ((width - cx) - 300) * .5 + 'px">'
      )

      var slideIndex = 1;

      if (!showStarted) {
        showSlides();
        showStarted = true;
      }

      function showSlides() {
        var i;
        var slides = document.getElementsByClassName('mySlides');
      
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none'; 
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slides[slideIndex-1]) {
          slides[slideIndex-1].style.display = 'block';
          slides[slideIndex-1].style.paddingLeft = (((width - cx) - 300) * .5) + 'px';
        }; 
        setTimeout(showSlides, 2000); // Change image every 2 seconds
      }

    div.style('left', (d3.event.pageX) + 'px')
      // .style('top', ((d3.event.pageY - cy + height) - ((height - $('#tooltipDiv').height()) * .5) - $('#tooltipDiv').height()) + 'px');
      .style('top', (d3.event.pageY - cy - 70 + (height * .1)) + 'px');

  })
  .on('mouseleave', function() {
    div.transition()
      .duration(500)
      .style('opacity', 0);
  });  
}