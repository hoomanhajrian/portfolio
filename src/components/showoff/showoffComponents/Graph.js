import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ResponsivePie } from '@nivo/pie'

const data = [
    {
        "id": "React",
        "label": "React",
        "value": 100,
        "color": "hsl(149, 70%, 50%)"
    },
    {
        "id": "Java",
        "label": "Java",
        "value": 80,
        "color": "hsl(273, 70%, 50%)"
    },
    {
        "id": "JavaScript",
        "label": "JavaScript",
        "value": 80,
        "color": "hsl(172, 70%, 50%)"
    },
    {
        "id": "Python",
        "label": "Python",
        "value": 45,
        "color": "hsl(126, 70%, 50%)"
    },
    {
        "id": "CSS and SASS",
        "label": "CSS and SASS",
        "value": 70,
        "color": "hsl(126, 70%, 50%)"
    },
    {
        "id": "C/C++",
        "label": "C/C++",
        "value": 40,
        "color": "hsl(270, 70%, 50%)"
    }
];

const Graph = () => {
    return (
        <Card className="graph-card">
            <Typography><h3>Languages</h3></Typography>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 110, bottom: 80, left: 60 }}
                startAngle={-180}
                sortByValue={true}
                innerRadius={0.55}
                padAngle={4}
                cornerRadius={15}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'category10' }}
                borderWidth={6}
                borderColor={{ from: 'color', modifiers: [['darker', '0.4']] }}
                arcLinkLabelsTextColor="#000"
                arcLinkLabelsOffset={-10}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'React'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'Java'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'JavaScript'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'Python'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'CSS and SASS'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'C/C++'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </Card>
    )
}

export default Graph;