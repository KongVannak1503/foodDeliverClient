import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

const CreateDelivery = () => {
    const [form] = Form.useForm();
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }

        try {
            const response = await fetch('http://localhost:5000/api/delivery-partners/create', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',  // This header tells the server you're expecting JSON
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred');
            }

            message.success(data.message || 'Delivery Partner created successfully!');
            form.resetFields();
            setError(null);
        } catch (error) {
            console.error('Error creating delivery partner:', error);
            setError(error.message || 'Failed to create delivery partner.');
            message.error(error.message || 'Failed to create delivery partner.');
        }
    };


    return (
        <>
            <h1 className="text-2xl font-bold mb-8">Create Delivery Partner</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded overflow-hidden shadow-lg bg-white p-8">
                {error && <div className="text-red-500">{error}</div>}
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    encType="multipart/form-data"
                >
                    {/* Name field */}
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Name is required!' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Phone Number field */}
                    <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Phone number is required!' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Address field */}
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Address is required!' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Gender field */}
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Gender is required!' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Availability field */}
                    <Form.Item
                        name="available"
                        label="Available"
                        valuePropName="checked"
                        rules={[{ required: true, message: 'Availability is required!' }]}
                    >
                        <Checkbox>Available</Checkbox>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Delivery Partner
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateDelivery;
