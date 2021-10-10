import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ResponsiveRadar } from '@nivo/radar'



const Radar = () => {
    const [data, setData] = useState([
        {
            "taste": "fruity",
            "chardonay": 10
        },
        {
            "taste": "bitter",
            "chardonay": 75
        },
        {
            "taste": "heavy",
            "chardonay": 96
        },
        {
            "taste": "strong",
            "chardonay": 26
        },
        {
            "taste": "sunny",
            "chardonay": 61
        }
    ]);


    return (
        <Card className="radar-card">
            <Typography><h3>Radar</h3></Typography>
            <ResponsiveRadar
                data={data}
                keys={['chardonay']}
                indexBy="taste"
                valueFormat=">-.2f"
                margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
                borderColor={{ from: 'color' }}
                gridLabelOffset={36}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
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

export default Radar;