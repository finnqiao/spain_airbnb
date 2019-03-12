var showStarted = false;

function showBarcaEvents(svg) {

  // Hide landmarks
  svg.select('#barcaLandmarks').selectAll('.mark')
    .transition().duration(0)
    .attr('opacity', 1)
    .attr('width', 0)
    .attr('height', 0)

  svg.select('#barcaLandmarks')
    .classed('noshow', true);

  // Hide slider
  svg.select('#barcaSlider')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  svg.select('#barcaSlider')
    .classed('noshow', true);

  // Hide circles
  svg.select('#barcaCircles').selectAll('.centroid')
    .transition()
    .duration(300)
    .attr('r', 0)
    .attr('opacity', .4);

  svg.select('#barcaCircles')
    .classed('noshow', true);

  // Show event cirles
  var tooltipOffset = 70;
  var iconHeight = 40;
  var iconWidth = 40;

  svg.select('#barcaEvents')
    .classed('noshow', false);
  var ttCircles = svg.select('#barcaEvents')
    .selectAll('.mark');
  var div = d3.select('#tooltipDiv')
  // div.classed('noshow', false);

  ttCircles.transition()
    .duration(0)
    .attr('opacity', .8)
    .transition()
    .ease(d3.easeElastic)
    .delay((d,i) => 300*i)
    .duration(1000)
    .attr('width',iconWidth)
    .attr('height',iconHeight);

  ttCircles.on('mouseenter', function(d) {
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
      '<img class = "mySlides" src = ' + d.imageLink1 + ' width=300>' +
      '<img class = "mySlides" src = ' + d.imageLink2 + ' width=300 style="display:none">' + 
      '<img class = "mySlides" src = ' + d.imageLink3 + ' width=300 style="display:none">'
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
        slides[slideIndex-1].style.display = 'block'; 
        setTimeout(showSlides, 2000); // Change image every 2 seconds
      }

    div.style('left', (d3.event.pageX) + 'px')
      // .style('top', ((d3.event.pageY - cy + height) - ((height - $('#tooltipDiv').height()) * .5) - $('#tooltipDiv').height()) + 'px');
      .style('top', (d3.event.pageY - cy + (height * .1)) + 'px');

  })
  .on('mouseleave', function() {
    div.transition()
      .duration(500)
      .style('opacity', 0);
  });  
}