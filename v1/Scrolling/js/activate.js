/**
 * ACTIVATE FUNCTIONS
 *
 * These will be called their
 * section is scrolled to.
 *
 * General pattern is to ensure
 * all content for the current section
 * is transitioned in, while hiding
 * the content for the previous section
 * as well as the next section (as the
 * user may be scrolling up or down).
 *
 */

/**
 * showTitle - initial title
 *
 * hides: count title
 * (no previous step to hide)
 * shows: intro title
 *
 */
function showTitle(g) {
  g.selectAll('.second-title')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  g.selectAll('.first-title')
    .transition()
    .duration(600)
    .attr('opacity', 1.0);
}

/**
 * showFillerTitle - filler counts
 *
 * hides: intro title
 * hides: square grid
 * shows: filler count title
 *
 */
function showSecondTitle(g) {
  g.selectAll('.first-title')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  g.selectAll('.sum-data')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  g.selectAll('.second-title')
    .transition()
    .duration(600)
    .attr('opacity', 1.0);
}

/**
 * showGrid - square grid
 *
 * hides: filler count title
 * hides: filler highlight in grid
 * shows: square grid
 *
 */
function showSum(g) {
  g.hideAxis();
  g.selectAll('.second-title')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  g.selectAll('.sum-data')
    .transition()
    .duration(600)
    .attr('opacity', 1.0);

  g.selectAll('.bar')
    .transition()
    .duration(600)
    .attr('width', 0);

  g.selectAll('.bar-text')
    .transition()
    .duration(0)
    .attr('opacity', 0);
}

/**
 * showBar - barchart
 *
 * hides: square grid
 * hides: histogram
 * shows: barchart
 *
 */
function showBar(g) {
  // ensure bar axis is set
  g.showAxis();

  g.selectAll('.sum-data')
    .transition()
    .duration(800)
    .attr('opacity', 0);

  g.selectAll('.circle')
    .transition()
    .duration(600)
    .delay(function (d, i) { return 300 * (i); })
    .attr('r', 0)
    .transition()
    .duration(0)
    .attr('opacity', 0)
    .attr('r', function (d) { return d.value / 5; });

  g.selectAll('.circle-text')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  g.selectAll('.bar')
    .transition()
    .delay(function (d, i) { return 300 * (i + 1);})
    .duration(600)
    .attr('width', function (d) { return g.xBarScale(d.value); });

  g.selectAll('.bar-text')
    .transition()
    .duration(600)
    .delay(1200)
    .attr('opacity', 1);
}

function showCircles(g) {
  g.hideAxis();
  g.selectAll('.bar')
    .transition()
    .delay(function (d, i) { return 300 * (i + 1); })
    .duration(600)
    .attr('width', 0)
    .attr('x', g.width / 2)
    .transition()
    .duration(0)
    .attr('x', 0)
    .attr('width', 0);

  g.selectAll('.bar-text')
    .transition()
    .duration(0)
    .attr('opacity', 0);

  g.selectAll('.circle')
    .transition()
    .delay(function (d, i) { return 600 + 300 * (i + 1); })
    .duration(600)
    .attr('opacity', 1.0);

  g.selectAll('.circle-text')
    .transition()
    .duration(600)
    .delay(1800)
    .attr('opacity', 1);
}

