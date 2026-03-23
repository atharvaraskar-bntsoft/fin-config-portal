export const presets = {
  line: {
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Minutes',
            },
            ticks: {
              autoSkip: true,
              beginAtZero: true,
              maxTicksLimit: 5,
            },
            tooltips: {
              mode: 'label',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'no of transactions',
            },
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (value % 1 === 0) {
                  return value;
                }
              },
            },
          },
        ],
      },
      showLine: true,
      tooltips: {
        mode: 'label',
      },
    },
  },

  bar: {
    dataset: {
      borderWifth: 2,
    },
    legend: {
      display: false,
    },
    maintainAspectRatio: true,
    options: {
      responsive: true,

      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(192,192,192,0.1)',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(192,192,192,0.1)',
            },
          },
        ],
      },
    },
  },

  doughnut: {
    dataset: {},
    options: {
      legend: {
        display: true,
        position: 'bottom',
      },
      responsive: true,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            if ('datasets' in data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const labels = data.labels[tooltipItem.index];
              const split = labels.split(':');
              const total = dataset.data.reduce(
                (previousValue, currentVal, currentIndex, array) => {
                  return previousValue + currentVal;
                },
              );
              const currentValue = dataset.data[tooltipItem.index];
              const fixedValue = ((currentValue / total) * 100).toFixed(2);
              if (split && split[0]) {
                return fixedValue + '%';
              } else {
                return fixedValue + '%';
              }
            }
          },
        },
      },
    },
  },

  pie: {
    dataset: {},
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(192,192,192,0.1)',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(192,192,192,0.1)',
            },
          },
        ],
      },
    },
  },
};
