/**
 * Handles the details of figuring out which section
 * the user is currently scrolled to.
 */
function scroller() {
  var container = d3.select('body');

  // Event dispatcher
  var dispatch = d3.dispatch('active', 'progress');

  // Array of all text sections
  var sections = null;
  var currentIndex = -1;
  var containerStart = 0;

  /**
   * Constructor Function
   * Sets up scroller to monitor scrolling of
   * elements selection.
   * @param elements - d3 select of elements that
   * will be scrolled through by the user
   */
  function scroll(elements) {
    sections = elements;

    // When window is scrolled call position.  When
    // it is resized call resize.
    d3.select(window)
      .on('scroll.scroller', position)
      .on('resize.scroller', resize);

    // Manually call resize to initially set
    // up scroller
    resize();

    // Hack to get position to be called once for the
    // scroll position on load.
    var t = d3.timer(function() {
      position();
      t.stop();
    });
  }



  /**
   * Called initially and also when page is resized.
   * Resets sectionPositions
   */
  function resize() {
    sectionPositions = [];
    var startPos;
    sections.each(function(d,i) {
      var top = this.getBoundingClientRect().top;
      if (i === 0) {
        startPos = top;
      }
      sectionPositions.push(top - startPos);
    });
    containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;
  }

  /**
   * Gets current user's position
   * If the user has scrolled to a new section,
   * dispatch active event new section index.
   */
  function position() {
    var pos = window.pageYOffset - 10;
    var sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);

    if (currentIndex !== sectionIndex) {
      // Keeping d3.v4 code commented out
      // dispatch.call('active', this, sectionIndex);

      // d3.v3 code
      dispatch.active(sectionIndex);

      currentIndex = sectionIndex;
    }

    var prevIndex = Math.max(sectionIndex - 1, 0);
    var prevTop = sectionPositions[prevIndex];
    var progress = (pos - prevTop) / (sectionPositions[sectionIndex] - prevTop);

    // Keeping d3.v4 code commented out
    // dispatch.call('progress', this, currentIndex, progress);

    // d3.v3 code
    dispatch.progress(currentIndex, progress);
  }

  /**
   * Get/set the parent element of the sections.
   * Useful for if the scrolling doesn't start at
   * the very top of the page.
   * 
   * @param value - the new container value
   */
  scroll.container = function (value) {
    if (arguments.length === 0) {
      return container;
    }
    container = value;
    return scroll;
  }

  /**
   * Implements a .on method to pass in a callback
   * to the dispatcher.
   */
  scroll.on = function (action, callback) {
    dispatch.on(action, callback);
  }
    
  return scroll;
}