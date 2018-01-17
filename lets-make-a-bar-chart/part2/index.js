const data = [4, 8, 15, 16, 23, 42];

const width = 420;
const barHeight = 20;

// stage 1
// const scaleRange = d3.scaleLinear()
//     .domain([0, d3.max(data)])
//     .range([0, width]);

// const chart = d3.select('.chart')
//     .attr('width', width)
//     .attr('height', barHeight * data.length);

// const bar = chart.selectAll('g')
//     .data(data)
//   .enter().append('g')
//     .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

// bar.append('rect')
//     .attr('width', scaleRange)
//     .attr('height', barHeight - 1);

// bar.append('text')
//     .attr('x', (d) => scaleRange(d) - 3)
//     .attr('y', barHeight / 2)
//     .attr('dy', '0.35em')
//     .text((d) => d);

// stage 2
function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

const scaleRange = d3.scaleLinear()
    .range([0, width]);

const chart = d3.select('.chart')
    .attr('width', width);

d3.tsv('data.tsv', type, (error, data) => {
  if (error) {
    alert('NOPE');
    return;
  }

  // timeout to imitate slow connection
  setTimeout(() => {
    scaleRange.domain([0, d3.max(data, (d) => d.value)]);

    chart.attr('height', barHeight * data.length);

    const bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

    bar.append('rect')
        .attr('width', (d) => scaleRange(d.value))
        .attr('height', barHeight - 1);

    bar.append('text')
        .attr('x', (d) => scaleRange(d.value) - 3)
        .attr('y', barHeight / 2)
        .attr('dy', '0.35em')
        .text((d) => d.value);
  }, 2000);
});
