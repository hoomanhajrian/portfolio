import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ResponsiveRadar } from '@nivo/radar'
import Slider from '@mui/material/Slider';

const Radar = () => {
    let [data, setData] = useState([
        {
            "taste": "fruity",
            "chardonay": 50
        },
        {
            "taste": "bitter",
            "chardonay": 50
        },
        {
            "taste": "heavy",
            "chardonay": 50
        },
        {
            "taste": "strong",
            "chardonay": 50
        },
        {
            "taste": "sunny",
            "chardonay": 50
        }
    ]);

    const getFruityValue = (e) => {
        let newData = data;
        newData[0].chardonay = e.target.value;
        setData(newData);
    }

    const getBitterValue = (e) => {
        let newData = data;
        newData[1].chardonay = e.target.value;
        setData(newData);
    }

    const getHeavyValue = (e) => {
        let newData = data;
        newData[2].chardonay = e.target.value;
        setData(newData);
    }

    const getStrongValue = (e) => {
        let newData = data;
        newData[3].chardonay = e.target.value;
        setData(newData);
    }

    const getSunnyValue = (e) => {
        let newData = data;
        newData[4].chardonay = e.target.value;
        setData(newData);
    }
    return (
        <Card className="radar-card">
            <Typography><h3>Radar</h3></Typography>
            <Slider
                aria-label="Small steps"
                defaultValue={50}
                onChange={getFruityValue}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
            />
            <Slider
                aria-label="Small steps"
                defaultValue={50}
                onChange={getBitterValue}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
            />
            <Slider
                aria-label="Small steps"
                defaultValue={50}
                onChange={getHeavyValue}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
            />
            <Slider
                aria-label="Small steps"
                defaultValue={50}
                onChange={getStrongValue}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
            />
            <Slider
                aria-label="Small steps"
                defaultValue={50}
                onChange={getSunnyValue}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
            />
            <ResponsiveRadar
                data={data}
                keys={['chardonay']}
                indexBy="taste"
                valueFormat=">-.2f"
                margin={{ top: 50, right: 80, bottom: 250, left: 80 }}
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