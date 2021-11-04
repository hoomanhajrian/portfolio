import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'







const BarChart = () => {

    const [data, setData] = useState([
        {
            "country": "AD",
            "hot dog": 88,
            "hot dogColor": "hsl(230, 70%, 50%)",
            "burger": 101,
            "burgerColor": "hsl(88, 70%, 50%)",
            "sandwich": 26,
            "sandwichColor": "hsl(80, 70%, 50%)",
            "kebab": 31,
            "kebabColor": "hsl(212, 70%, 50%)",
            "fries": 23,
            "friesColor": "hsl(292, 70%, 50%)",
            "donut": 126,
            "donutColor": "hsl(128, 70%, 50%)"
        },
        {
            "country": "AE",
            "hot dog": 159,
            "hot dogColor": "hsl(149, 70%, 50%)",
            "burger": 111,
            "burgerColor": "hsl(182, 70%, 50%)",
            "sandwich": 122,
            "sandwichColor": "hsl(179, 70%, 50%)",
            "kebab": 118,
            "kebabColor": "hsl(241, 70%, 50%)",
            "fries": 134,
            "friesColor": "hsl(212, 70%, 50%)",
            "donut": 52,
            "donutColor": "hsl(32, 70%, 50%)"
        },
        {
            "country": "AF",
            "hot dog": 5,
            "hot dogColor": "hsl(251, 70%, 50%)",
            "burger": 187,
            "burgerColor": "hsl(160, 70%, 50%)",
            "sandwich": 30,
            "sandwichColor": "hsl(62, 70%, 50%)",
            "kebab": 23,
            "kebabColor": "hsl(28, 70%, 50%)",
            "fries": 118,
            "friesColor": "hsl(341, 70%, 50%)",
            "donut": 124,
            "donutColor": "hsl(246, 70%, 50%)"
        },
        {
            "country": "AG",
            "hot dog": 112,
            "hot dogColor": "hsl(290, 70%, 50%)",
            "burger": 177,
            "burgerColor": "hsl(46, 70%, 50%)",
            "sandwich": 187,
            "sandwichColor": "hsl(349, 70%, 50%)",
            "kebab": 4,
            "kebabColor": "hsl(240, 70%, 50%)",
            "fries": 193,
            "friesColor": "hsl(285, 70%, 50%)",
            "donut": 69,
            "donutColor": "hsl(53, 70%, 50%)"
        },
        {
            "country": "AI",
            "hot dog": 15,
            "hot dogColor": "hsl(79, 70%, 50%)",
            "burger": 79,
            "burgerColor": "hsl(52, 70%, 50%)",
            "sandwich": 191,
            "sandwichColor": "hsl(232, 70%, 50%)",
            "kebab": 165,
            "kebabColor": "hsl(65, 70%, 50%)",
            "fries": 92,
            "friesColor": "hsl(114, 70%, 50%)",
            "donut": 119,
            "donutColor": "hsl(91, 70%, 50%)"
        },
        {
            "country": "AL",
            "hot dog": 32,
            "hot dogColor": "hsl(267, 70%, 50%)",
            "burger": 62,
            "burgerColor": "hsl(160, 70%, 50%)",
            "sandwich": 70,
            "sandwichColor": "hsl(341, 70%, 50%)",
            "kebab": 142,
            "kebabColor": "hsl(216, 70%, 50%)",
            "fries": 161,
            "friesColor": "hsl(240, 70%, 50%)",
            "donut": 37,
            "donutColor": "hsl(31, 70%, 50%)"
        },
        {
            "country": "AM",
            "hot dog": 171,
            "hot dogColor": "hsl(197, 70%, 50%)",
            "burger": 11,
            "burgerColor": "hsl(178, 70%, 50%)",
            "sandwich": 132,
            "sandwichColor": "hsl(176, 70%, 50%)",
            "kebab": 60,
            "kebabColor": "hsl(77, 70%, 50%)",
            "fries": 107,
            "friesColor": "hsl(183, 70%, 50%)",
            "donut": 174,
            "donutColor": "hsl(84, 70%, 50%)"
        }
    ]);

    return (
        <Card className="barchart-card">
            <CardHeader
                title="BarChart with sorting"
            />
            <ResponsiveBar
                data={data}
                keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
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
                    legend: 'food',
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
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
            />


        </Card>
    )
};

export default BarChart;