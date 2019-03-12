
/**
 * This function defines each of the visuals and initially
 * sets them to opacity of 0.
 */
var scrollVis = function() {
  // Define the size and margins of the vis area
  var width = 600;
  var height = 520;
  var margin = {
    top: 0,
    left: 20,
    bottom: 40,
    right: 10
  };

  // Keep track of the last and current visualizations
  // that the user scrolled to.  When user scrolls
  // quickly, we want to call all the activate
  // functions they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // Sizing for the grid visualization
  var squareSize = 6;
  var squarePad = 2;
  var numPerRow = width / (squareSize + squarePad);

  // Main svg used for visualization
  var svg = null;

  // d3 selection that will be used for displaying
  // visualizations
  var g = null;

  // Set the range now and the domain when the data
  // is processed
  var xBarScale = d3.scaleLinear()
    .range([0, width]);

    // Set an ordinal scale for the bar chart
  var yBarScale = d3.scaleBand()
    .paddingInner(.08)
    .domain([0,1,2])
    .range([0, height - 50], .1, .1);

  // Color is determined by the index of the bars
  var barColors = {
    0: '#008080',
    1: '#399785',
    2: '#5AAF8C'
  };

  var yCircleScale = d3.scaleBand()
    .domain([0,1,2])
    .range([(1/6) * height, height]);

  // Color is determined by the index of the circle
  var circleColors = {
    0: '#43de3e',
    1: '#de633e',
    2: '#de3e93'
  };

  // Bar chart bottom axis
  var xAxisBar = d3.axisBottom()
    .scale(xBarScale);

  // When scrolling to a new section, the 
  // activation function for that section is called
  var activateFunctions = [];

  // If a section has an update function then it is
  // called while scrolling through the current section
  var updateFunctions = [];

  /**
   * 
   * @param selection - The current d3 selection(s)
   * to draw the visualization in.  For this example,
   * we will be drawing in #vis.
   */
  var chart = function(selection) {
    selection.each(function(rawData) {
      // Create svg and give width and height
      svg = d3.select(this).selectAll('svg').data([fakeData]);
      var svgE = svg.enter().append('svg')
      // Use merge to combine enter and existing solution
      svg = svg.merge(svgE);

      svg.attr('width', width + margin.left + margin.right);
      svg.attr('height', height + margin.top + margin.bottom);

      svg.append('g');

      // This group element will comtain all other elements
      g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // We need to attach to g all objects and functions that are called in the
      // activate functions.  Do that here
      g.width = width;
      g.height = height;
      g.margin = margin;
      g.xBarScale = xBarScale;

      g.showAxis = function () {
        g.select('.x.axis')
          .call(xAxisBar)
          .transition().duration(500)
          .style('opacity', 1);
      }

      g.hideAxis = function () {
        g.select('.x.axis')
          .transition().duration(500)
          .style('opacity', 0);
      }

      // Perform some preprocessing on raw data
      var fakeData = getData(rawData);

      var fakeMax = d3.max(fakeData, function (d) { return d.value;});
      xBarScale.domain([0, fakeMax]);

      var fakeSum = d3.sum(fakeData, function (d) { return d.value});

      setupVis(fakeData, fakeSum);
      setupSections();
    });
  };
  

  var setupVis = function (fakeData, fakeSum) {
    // axis
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisBar);
    g.select('.x.axis').style('opacity', 0);

    // First Title
    g.append('text')
      .attr('class', 'vis-title first-title')
      .attr('x', width / 4)
      .attr('y', height / 3)
      .text('Big Text');

    g.append('text')
      .attr('class', 'sub-title first-title')
      .attr('x', width / 4)
      .attr('y', (height / 3) + (height / 5))
      .text('Small Text');

    g.selectAll('.first-title')
      .attr('opacity', 0);

    // Second title
    g.append('text')
      .attr('class', 'vis-title second-title')
      .attr('x', width / 4)
      .attr('y', height / 3)
      .text('Second Title');

    g.append('text')
      .attr('class', 'sub-title second-title')
      .attr('x', width / 4)
      .attr('y', (height / 3) + (height / 5))
      .text('If we need it');

    g.selectAll('.second-title')
      .attr('opacity', 0);

    // Sum of data
    g.append('text')
      .attr('class', 'highlight vis-title sum-data')
      .attr('x', width / 4)
      .attr('y', height / 3)
      .text(fakeSum);

    g.append('text')
      .attr('class', 'sub-title sum-data')
      .attr('x', width / 4)
      .attr('y', (height / 3) + (height / 5))
      .text('The sum of the fake data');

    g.selectAll('.sum-data')
      .attr('opacity', 0);

    // Bar chart
    var bars = g.selectAll('.bar').data(fakeData);
    var barsE = bars.enter()
      .append('rect')
      .attr('class', 'bar');
    bars = bars.merge(barsE)
      .attr('x', 0)
      .attr('y', function (d, i) { return yBarScale(i); })
      .attr('fill', function (d, i) { return barColors[i]; })
      .attr('width', 0)
      .attr('height', yBarScale.bandwidth());

    var barText = g.selectAll('.bar-text').data(fakeData);
    barText.enter()
      .append('text')
      .attr('class', 'bar-text')
      .text(function (d) { return d.category; })
      .attr('x', 0)
      .attr('dx', 15)
      .attr('y', function (d, i) { return yBarScale(i);})
      .attr('dy', yBarScale.bandwidth() / 1.2)
      .style('font-size', '110px')
      .attr('fill', 'white')
      .attr('opacity', 0);

    // Circles
    var circles = g.selectAll('.circle').data(fakeData);
    var circlesE = circles.enter()
      .append('circle')
      .attr('class', 'circle')
    circles = circles.merge(circlesE)
      .attr('cx', width / 2)
      .attr('cy', function (d,i) { return yCircleScale(i); })
      .attr('r', function (d) { return d.value / 5; })
      .attr('fill', function (d, i) { return circleColors[i]; });

    g.selectAll('.circle')
      .attr('opacity', 0);

    var circleText = g.selectAll('.circle-text').data(fakeData);
    circleText.enter()
      .append('text')
      .attr('class', 'circle-text')
      .text(function (d) { return d.category; })
      .attr('x', width / 2 - 40)
      .attr('y', function (d, i) { return yCircleScale(i); })
      .attr('dy', 80)
      .style('font-size', '50px')
      .attr('fill', 'white')
      .attr('opacity', 0)
  };

  /**
   * Each section is activated by a separate function.
   * Here we associate these functions to the sections
   * based on the section's index
   */
  var setupSections = function () {
    // activateFunctions are called each time the
    // active section changes
    activateFunctions[0] = showTitle;
    activateFunctions[1] = showSecondTitle;
    activateFunctions[2] = showSum;
    activateFunctions[3] = showBar;
    activateFunctions[4] = showCircles;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for (var i = 0; i < 9; i++) {
      updateFunctions[i] = function () {};
    }
  };

  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i](g);
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};

