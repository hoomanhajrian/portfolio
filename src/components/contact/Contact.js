import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import Map from './Map'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const Contact = () => {

    const onFinish = (values) => {
        console.log(values);
    };



    return (
        <div className="contact">
            <h2>Contact me</h2>
            <Map className="googlemap" />
            <Form className="contact-form" {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'Your Message']} label="Your Message">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <ul className="links">

                <li><a href="https://www.linkedin.com/in/hooman-hajarian/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i><span className="visually-hidden">https://www.linkedin.com/in/hooman-hajarian/</span></a></li>

                <li><a href="https://github.com/hoomanhajrian" target="_blank" rel="noreferrer"><i className="fab fa-github-square"></i><span className="visually-hidden">https://github.com/hoomanhajrian</span></a></li>
            </ul>
        </div>
    );
}

export default Contact;
