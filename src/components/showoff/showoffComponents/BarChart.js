import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'
import { Button } from 'antd';







const BarChart = () => {

    const [data, setData] = useState([
        {
            "country": "AD",
            "donut": 126,
            "donutColor": "hsl(128, 70%, 50%)"
        },
        {
            "country": "AE",
            "donut": 52,
            "donutColor": "hsl(32, 70%, 50%)"
        },
        {
            "country": "AF",
            "donut": 124,
            "donutColor": "hsl(246, 70%, 50%)"
        },
        {
            "country": "AG",
            "donut": 69,
            "donutColor": "hsl(53, 70%, 50%)"
        },
        {
            "country": "AI",
            "donut": 119,
            "donutColor": "hsl(91, 70%, 50%)"
        },
        {
            "country": "AL",
            "donut": 37,
            "donutColor": "hsl(31, 70%, 50%)"
        },
        {
            "country": "AM",
            "donut": 174,
            "donutColor": "hsl(84, 70%, 50%)"
        }
    ]);

    const randomData = () => {
        const newData = [];
        const randomNumbers = () => {
            data.forEach(e => { newData.push(Math.floor(Math.random() * 200)) });
        };
        randomNumbers();
        setData([
            {
                "country": "AD",
                "donut": newData[0],
                "donutColor": "hsl(128, 70%, 50%)"
            },
            {
                "country": "AE",
                "donut": newData[1],
                "donutColor": "hsl(32, 70%, 50%)"
            },
            {
                "country": "AF",
                "donut": newData[2],
                "donutColor": "hsl(246, 70%, 50%)"
            },
            {
                "country": "AG",
                "donut": newData[3],
                "donutColor": "hsl(53, 70%, 50%)"
            },
            {
                "country": "AI",
                "donut": newData[4],
                "donutColor": "hsl(91, 70%, 50%)"
            },
            {
                "country": "AL",
                "donut": newData[5],
                "donutColor": "hsl(31, 70%, 50%)"
            },
            {
                "country": "AM",
                "donut": newData[6],
                "donutColor": "hsl(84, 70%, 50%)"
            }
        ])
    };

    const sortData = () => {
        const newData = [...data];
        for (let i = 0; i < newData.length - 1; i++) {
            for (let j = 0; j < newData.length - 1; j++) {
                if (newData[j].donut > newData[j + 1].donut) {
                    let tmp = newData[j];
                    newData[j] = newData[j + 1];
                    newData[j + 1] = tmp;
                }
            }
        }

        setData(newData);

    };

    return (
        <Card className="barchart-card">
            <CardHeader
                title="BarChart with sorting"
            />
            <ResponsiveBar
                data={data}
                keys={['donut']}
                indexBy="country"
                margin={{ top: 70, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food (0-200)',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart"
                barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
            />
            <div className="barchart-buttons">
                <Button type="primary" onClick={randomData}>Random Data</Button>
                <Button type="primary" onClick={sortData}>Bubble Sort</Button>
            </div>

        </Card>
    )
};

export default BarChart;