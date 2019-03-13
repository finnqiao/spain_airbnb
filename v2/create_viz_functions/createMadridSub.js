function createMadridSub(madSubway, path, svg) {
  // Object.filter = function (obj, predicate) {
  //   Object.keys(obj)
  //     .filter( key => predicate(obj[key]) )
  //     .reduce( (res, key) => (res[key] = obj[key], res), {} );
  // }
  
  svg.select('#madridVis').append('g')
    .attr('id', 'madridSub')
    .selectAll('path').data(madSubway.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke-width', '2')
    .attr('class', function (d) { return 'mad' + d.properties.ref +
      ' ' + d.properties['@id']|| 'noL'; }
    ).attr('opacity', 0);

  svg.select('#madridSub')
    .classed('noshow', true)
}