import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const CreateMenu = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { id } = useParams(); // Get restaurant id from URL

    const onFinish = async (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/restaurant/items/create/${id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            // Read response as text first
            const text = await response.text();
            console.log('Response:', text); // Log the raw response

            const data = JSON.parse(text); // Parse text to JSON

            if (!response.ok) {
                throw new Error(data.message || 'An unknown error occurred');
            }

            message.success(data.message || 'Menu item created successfully!');
            form.resetFields();
            setError(null);
            navigate(`/restaurant/menu-items/${id}`);
        } catch (error) {
            console.error('Error creating menu item:', error);
            setError(error.message || 'Failed to create menu item.');
            message.error(error.message || 'Failed to create menu item.');
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">Create Menu Item</h1>
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
                        name="code"
                        label="Code"
                        rules={[{ required: true, message: 'Code is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Description is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Price is required!' }]}
                    >
                        <Input type="number" step="0.01" min="0" />

                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"

                    >
                        <Input type="file" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Menu Item
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateMenu;