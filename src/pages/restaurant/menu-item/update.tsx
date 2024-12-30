import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UpdateMenu = () => {
    const { id, itemId } = useParams(); // Access restaurantId and itemId from the URL
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    // Fetch the menu item data on component mount
    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/restaurant/items/view/${itemId}`);
                setMenuItem(response.data.data);
                form.setFieldsValue(response.data.data); // Populate form fields
            } catch (error) {
                message.error('Failed to load menu item details');
                console.error('Error loading menu item:', error);  // Log error
            }
        };

        fetchMenuItem();
    }, [itemId, form]);

    const handleUpdate = async (values) => {
        try {
            setLoading(true);

            // Create the form data object
            const formData = new FormData();

            // Append form values to formData
            formData.append('restaurantId', id);  // Adding restaurantId from URL
            formData.append('name', values.name);
            formData.append('code', values.code);
            formData.append('description', values.description);
            formData.append('price', values.price);

            // Append image file only if selected
            if (values.image && values.image.fileList && values.image.fileList.length > 0) {
                formData.append('image', values.image.fileList[0].originFileObj);
            }

            // Send the PUT request with the form data
            const response = await axios.put(
                `http://localhost:5000/api/restaurant/items/update/${itemId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setLoading(false);
            message.success('Menu item updated successfully!');
            navigate(`/restaurant/menu-items/${id}`);  // Navigate to the menu items list
        } catch (error) {
            setLoading(false);
            message.error('Failed to update menu item');
            console.error('Error updating menu item:', error.response ? error.response.data : error.message);  // Log detailed error
        }
    };


    // If the menu item is not yet loaded, display loading state
    if (!menuItem) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">Update Menu Item</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-3">
                    <div className="p-6 shadow-lg bg-white">
                        <Form
                            form={form}
                            initialValues={menuItem}
                            onFinish={handleUpdate}
                            layout="vertical"
                            encType="multipart/form-data"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input the menu item name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[{ required: true, message: 'Please input the item code!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input the item description!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input the item price!' }]}
                            >
                                <Input type="number" step="0.01" min="0" />
                            </Form.Item>

                            {/* Image Upload Field */}
                            <Form.Item label="Image" name="image">
                                <Upload
                                    beforeUpload={() => false} // Prevent automatic upload
                                    maxCount={1}
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Select Image</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Update Menu Item
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateMenu;
