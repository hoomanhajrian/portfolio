import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@mui/material';
import CardMedia from '@material-ui/core/CardMedia';

const DogApi = () => {

    const [data, setData] = useState();
    const [bool, changeBool] = useState(true);

    const getDogs = async () => {
        try {
            const result = await axios.get('https://dog.ceo/api/breeds/image/random');
            setData(result.data);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="dog-card">
            <CardHeader
                title="Calling Api"
                subheader="src: https://dog.ceo/dog-api/"
            />
            <Form className="contact-form">
                <Form.Item
                    name={'Breed'}
                    label="Breed"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={() => { changeBool(false) }} />
                </Form.Item>

            </Form>
            <Button disabled={bool} type="primary" htmlType="submit" onClick={getDogs} className="getdogs-button">
                Show Pictures
            </Button>
            {data ? <CardMedia
                component="img"
                height="194"
                image={data.message}
                alt={data.message}
            /> : <p>Please type in the breed name to load the picture</p>}
        </Card >
    )
};

export default DogApi;




