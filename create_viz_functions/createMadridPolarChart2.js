
function createMadridPolarChart2(madPolarChart, width, height, svg) {

  var minInnerRadius = 5;
  var maxRadius = Math.min(width * .5, height * .5) * .9;
  var minOuterRadius = maxRadius * .5;
  var maxOuterRadius = maxRadius;

  var duration = 500;

  var angle = d3.scaleTime()
    .range([0,Math.PI * 2]);

  var scaleColor = d3.scaleLinear()
    .range(['white','red']);

  var arcs = d3.arc()
    .outerRadius(minInnerRadius+1)
    .innerRadius(minInnerRadius)
    .padAngle(0)
    .padRadius(0);

  var arcs_update = d3.arc()
    .outerRadius(function (d) { return radius(d.avg_price);})
    .innerRadius(minInnerRadius)
    .padAngle(0)
    .padRadius(0);

  var formatDate = d3.timeFormat('%m/%d/%Y');
  var formatDateShort = d3.timeFormat('%m/%d');

  var radius = d3.scaleLinear()
    .range([minOuterRadius,maxOuterRadius]);

  function points(start,stop,k){
    return d3.range(start,stop,(stop-start)/k);
  }

  function daily_data(data, start_year, start_month, start_day, end_year, end_month, end_day){

    var start_date = new Date(start_year, start_month, start_day);
    var end_date = new Date(end_year, end_month, end_day);
    var newdata = [];
    var length = (end_date - start_date)/86400000;
    var sum = 0.0;
    var count = 0;
    var date_data = data.filter(function(d){
      // console.log(d);
      return (d.Day.getTime() === start_date.getTime()) && (d.Price !== '')  ;
    });

    date_data.forEach(function (d) {
      sum += parseFloat(d.Price);
      count++;
    });

    newdata.push({date: start_date, avg_price: sum/count});

    for (var i = 0; i < length; i++){
      var newdate = new Date(start_date.getTime() + (i+1)*86400000);
      sum = 0.0;
      count = 0;
      date_data = data.filter(function(d){return (Math.abs(d.Day.getTime() - newdate.getTime())<36000000) && (d.Price !== '')  ;});

      date_data.forEach(function (d) {
        sum += parseFloat(d.Price);
        count++;
      });
      newdata.push({date: newdate, avg_price: sum/count});
    }
    return(newdata);
  }

  function draw_labels(start, end, svg){

    // svg.selectAll('.chart_labels').remove();

    var outer_text = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(angle)
      .radius(maxOuterRadius+5);

    var polarChart = svg.select('#madridVis')
      .append('g')
      .attr('id', 'madridPolarChart2')
      .attr('transform', 'translate(' + (width * .5) + ',' + (height * .5) + ')')

    polarChart.append('path')
      .datum(points(new Date(start.getTime()-43200000),new Date(end.getTime()+43200000),3600*4))
      .attr('class','chart_labels')
      .attr('id','Outer_LabelsMad2')
      .attr('d',outer_text)
      .style('fill','none')
      .style('stroke','none');

    polarChart.append('text')
      .append('textPath') //append a textPath to the text element
      .attr('xlink:href', '#Outer_LabelsMad2') //place the ID of the path here
      .attr('class','label_text chart_labels polar_chartMad2')
      .attr('id','Start')
      .style('text-anchor','start')
      .attr('startOffset', '0.25%')
      .attr('opacity',1)
      .text(formatDate(start))
      .transition()
      .attr('opacity',1)
      // .duration(400)

    polarChart.append('text')
      .append('textPath') //append a textPath to the text element
      .attr('xlink:href', '#Outer_LabelsMad2') //place the ID of the path here
      .attr('class','label_text chart_labels polar_chartMad2')
      .attr('id','Quad1')
      .style('text-anchor','middle') //place the text halfway on the arc
      .attr('startOffset', '25%')
      .attr('opacity',1)
      .text(formatDateShort(new Date((end.getTime()-start.getTime())/4 + start.getTime())))
      .transition()
      .attr('opacity',1)
      // .delay(400)
      // .duration(400);

    polarChart.append('text')
      .append('textPath') //append a textPath to the text element
      .attr('xlink:href', '#Outer_LabelsMad2') //place the ID of the path here
      .attr('class','label_text chart_labels polar_chartMad2')
      .attr('id','Quad2')
      .style('text-anchor','middle') //place the text halfway on the arc
      .attr('startOffset', '50%')
      .attr('opacity',1)
      .text(formatDateShort(new Date((end.getTime()-start.getTime())/2 + start.getTime())))
      .transition()
      .attr('opacity',1)
      // .delay(800)
      // .duration(400);

    polarChart.append('text')
      .append('textPath') //append a textPath to the text element
      .attr('xlink:href', '#Outer_LabelsMad2') //place the ID of the path here
      .attr('class','label_text chart_labels polar_chartMad2')
      .attr('id','Quad3')
      .style('text-anchor','middle') //place the text halfway on the arc
      .attr('startOffset', '75%')
      .attr('opacity',1)
      .text(formatDateShort(new Date(3*(end.getTime()-start.getTime())/4 + start.getTime())))
      .transition()
      .attr('opacity',1)
      // .delay(1200)
      // .duration(400);

    polarChart.append('text')
      .append('textPath') //append a textPath to the text element
      .attr('xlink:href', '#Outer_LabelsMad2') //place the ID of the path here
      .attr('class','label_text chart_labels polar_chartMad2')
      .attr('id','End')
      .style('text-anchor','end')
      .attr('startOffset', '99.75%')
      .attr('opacity',1)
      .text(formatDateShort(end))
      .transition()
      .attr('opacity',1)
      // .delay(1600)
      // .duration(400);
  }

  function draw_polar_fans(data, svg){

    radius.domain([
      d3.min(data, function(d) { return d.avg_price; }),
      d3.max(data, function(d) { return d.avg_price; })
    ])

    var fans = svg.select('#madridPolarChart2')
      .selectAll('.price_fan')
      .data(data);

    // console.log(fans);

    start = d3.min(data, function(d) { return d.date});
    end = d3.max(data, function(d) { return d.date});

    // console.log(start);
    // console.log(end);

    var new_fans = fans.enter()
      .append('path')
      .attr('class','price_fan')
      .attr('d', function(d) {
          return arcs_update(d);})
      .style('fill',function(d) { return scaleColor(d.avg_price); })
      .style('shape-rendering','geometricPrecision')
      .style('stroke',function(d) { return scaleColor(d.avg_price); })
      .on('mouseenter', null)
      .on('mouseleave', null)
      .attr('opacity','0');

    // new_fans.on('mouseover',function(d) {
    //     div.transition()
    //       .duration(200)
    //       .style('opacity', .9);

    //     div.html( 'DATE: ' + formatDate(d.date) + '<br />DAY OF THE WEEK: ' + days[d.date.getDay()] + '<br />AVG_PRICE: ' + d.avg_price )
    //       .style('left', (d3.event.pageX) + 'px')
    //       .style('top', (d3.event.pageY - 28) + 'px')
    //   })
    //   .on('mouseout',function() {
    //     div.transition()
    //       .duration(500)
    //       .style('opacity', 0);
    //   })
    //   .transition()
    //   .attr('d', function(d) {
    //       return arcs_update(d);})
    //   .delay(function(d,i) { return i*25; })
    //   .duration(duration)
    //   .attr('opacity',1);

    fans.merge(fans)
      .transition()
      .attr('d', function(d) {
          return arcs_update(d);})
      .style('fill',function(d) { return scaleColor(d.avg_price); })
      .style('shape-rendering','geometricPrecision')
      .style('stroke',function(d) { return scaleColor(d.avg_price); })
      .delay(function(d,i) { return i*25; })
      .duration(duration)
      .attr('opacity',1);

    // console.log(fans);

    // chart.merge(chart);

    fans.exit().remove();
  }

  function draw_chart(data, svg){

    start = d3.min(data, function(d) { return d.date});
    end = d3.max(data, function(d) { return d.date});

    angle.domain([new Date(start.getTime()-43200000),new Date(end.getTime()+43200000)]);

    scaleColor.domain(d3.extent(data,function(d) { return d.avg_price; }));

    arcs.startAngle(function (d) { return angle(new Date(d.date.getTime() - 43200000));})
      .endAngle(function (d) { return angle(new Date(d.date.getTime() + 43200000));});

    arcs_update.startAngle(function (d) { return angle(new Date(d.date.getTime() - 43200000));})
      .endAngle(function (d) { return angle(new Date(d.date.getTime() + 43200000));});

    draw_labels(start, end, svg);

    draw_polar_fans(data, svg);

  }

  var newData = daily_data(madPolarChart, 2019, 4, 1, 2019, 5, 30);
  draw_chart(newData, svg);

  svg.select('#madridPolarChart2')
    .classed('noshow', true)
}