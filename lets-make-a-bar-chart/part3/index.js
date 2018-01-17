const margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40,
}
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const xScale = d3.scaleBand()
    .range([0, width], 0.1);

const xAxis = d3.axisBottom(xScale);

const yScale = d3.scaleLinear()
    .range([height, 0]);

const yAxis = d3.axisLeft(yScale)
    .ticks(10, '%');

const chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.tsv('data.tsv', type, (error, data) => {
  if (error) {
    alert('NOPE');
    return;
  }

  xScale.domain(data.map((item) => item.letter))
      .paddingInner(0.1)
      .paddingOuter(0.5);
  yScale.domain([0, d3.max(data, (d) => d.frequency)]);

  chart.append('g')
      // .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

  chart.append('g')
      // .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

  chart.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.letter))
      .attr('y', (d) => yScale(d.frequency))
      .attr('height', (d) => height - yScale(d.frequency))
      .attr('width', xScale.bandwidth());
});


function type(d) {
  d.frequency = +d.frequency; // coerce to number
  return d;
}
