function showMadridMapZoom(svg) {
  svg.select('#madridMap')
      .selectAll('Path')
      .transition()
      .duration(2000)
      .attr('d', svg.madPathZoom);
}