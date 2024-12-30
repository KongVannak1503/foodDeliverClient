import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CreateRestaurant = () => {
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/restaurants', {
                method: 'POST',
                body: formData,
            });

            // Check if the response is JSON before parsing it
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response from server');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred');
            }

            message.success(data.message || 'Restaurant created successfully!');
            form.resetFields();
            setImageFile(null);
            setError(null);
        } catch (error) {
            console.error('Error creating restaurant:', error);
            setError(error.message || 'Failed to create restaurant.');
            message.error(error.message || 'Failed to create restaurant.');
        }
    };

    const handleFileChange = (info) => {
        if (info.fileList.length > 0) {
            setImageFile(info.fileList[0].originFileObj);
        } else {
            setImageFile(null);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">Create Restaurant</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded overflow-hidden shadow-lg bg-white p-8">
                {error && <div className="text-red-500">{error}</div>}
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    encType="multipart/form-data"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Name is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input the phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please input the address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Form.Item
                            name="open_time"
                            label="Open Time"
                            rules={[{ required: true, message: 'Please select the opening time!' }]}
                        >
                            <Input type="time" />
                        </Form.Item>
                        <Form.Item
                            name="close_time"
                            label="Close Time"
                            rules={[{ required: true, message: 'Please select the closing time!' }]}
                        >
                            <Input type="time" />
                        </Form.Item>
                    </div>
                    <Form.Item label="Image">
                        <Upload
                            onChange={handleFileChange}
                            beforeUpload={() => false} // Prevent auto upload
                            showUploadList={true} // Show selected file
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Restaurant
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateRestaurant;
