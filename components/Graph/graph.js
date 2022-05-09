import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto'

export default function Graph(props) {
    console.log("graph compo", props.data)
    Chart.register(CategoryScale);

    const Container = styled.div`
        width: 90vw;
        max-width: 900px;
    `;

    const options = {
        spanGaps: true,
        maxBarThickness: 30,
        grouped: true,
        interaction: {
          mode: 'index',
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              padding: 10,
              font: {
                family: "'Noto Sans KR', 'serif'",
                lineHeight: 1,
              },
            }
          },
          tooltip: {
            backgroundColor: 'rgba(124, 35, 35, 0.4)',
            padding: 10,
            bodySpacing: 5,
            bodyFont: {
              font: {
                family: "'Noto Sans KR', sans-serif",
              }
            },
            usePointStyle: true,
            filter: (item) => item.parsed.ratio !== null,
            callbacks: {
              title: (context) => context[0].label + '💙',
              label: (context) => {
                let label = context.dataset.label + '' || '';
      
                return context.parsed.ratio !== null
                  ? label + ': ' + context.parsed.ratio + '배'
                  : null;
              },
            },
          },
        },
        scales: {
          period: {
            afterTickToLabelConversion: function (scaleInstance) {
              const ticks = scaleInstance.ticks;
      
              const newTicks = ticks.map((tick) => {
                return {
                  ...tick,
                  label: tick.label
                };
              });
      
              scaleInstance.ticks = newTicks;
            },
            grid: {
              display: false,
              drawTicks: true,
              tickLength: 4,
              color: '#E2E2E230'
            },
            axis: 'x',
            position: 'bottom',
            ticks: {
              minRotation: 45,
              padding: 5,
            },
          },
          ratio: {
            type: 'linear',
            grid: {
              color: '#E2E2E230',
            },
            afterDataLimits: (scale) => {
              scale.max = scale.max * 1.2;
            },
            axis: 'y',
            display: true,
            position: 'left',
            title: {
              display: true,
              align: 'end',
              color: '#808080',
              font: {
                size: 12,
                family: "'Noto Sans KR', sans-serif",
                weight: 300,
              },
              text: '단위: 배'
            }
          }
        }
      };

    return <Container className="py-20">
      <Line 
        type="line" 
        data={props.data} 
        options={options} />
    </Container>
}