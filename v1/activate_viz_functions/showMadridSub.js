function showMadridSub(svg) {
  // Show madrid map - In case a user scrolls up to this section
  svg.select('#madridMap').selectAll('path')
      .transition().duration(0)
      .attr('opacity', 1);

  // Show madrid subway
  svg.select('#madridSub').selectAll('path')
      .transition().duration(1200)
      .attr('opacity', 1); 
}