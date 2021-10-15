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
            const breed = document.getElementById('Breed').value;
            const result = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
            setData(result.data);
        } catch (err) {
            setData(err);
            console.error(err);
        }
    };

    return (
        <Card className="dog-card">
            <CardHeader
                title="Calling Api(under construction)"
                subheader="source: https://dog.ceo/dog-api/"
            />
            <Form className="contact-form">
                <Form.Item
                    name={'Breed'}
                    label="Breed"
                    labelAlign="left"
                    id="Breed"
                    rules={[
                        {
                            required: true,
                            validator: (_, value) =>
                                value ? changeBool(false) : changeBool(true),
                        },

                    ]}
                >
                    <Input placeholder="Exp: husky, bulldog, ..." allowClear={true} />
                </Form.Item>
                <Button disabled={bool} type="primary" htmlType="submit" onClick={getDogs} className="getdogs-button">
                    Show Picture
                </Button>
            </Form>

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




