function createTitle(svg) {
  svg.append('g')
    .attr('id', 'titleSection')
    .append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * .5) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .style('font-weight', 'bold')
    .style('font-size', '25px')
    .text('Welcome to Spain')
    .attr('opacity', 0);

  svg.select('#titleSection')
    .classed('noshow', true);
}