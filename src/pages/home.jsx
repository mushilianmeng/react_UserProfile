import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './home.css';

const { Title, Text } = Typography;

function Profile() {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
      } catch (error) {
        message.error('Failed to fetch user data');
      }
    }
    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/userupdate', values);
      setUser(values);
      setIsEditing(false);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Title level={2}>User Profile</Title>
      <Card className="card">
        {isEditing ? (
          <Form layout="vertical" initialValues={user} onFinish={handleSave}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 2, message: 'Name must be at least 2 characters long' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, type: 'email', message: 'Please input a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <PhoneInput
                country={'us'}
                value={user.phone}
                onChange={phone => setUser({ ...user, phone })}
                inputStyle={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
            </Form.Item>
          </Form>
        ) : (
          <div>
            <Text><strong>Name:</strong> {user.name}</Text><br />
            <Text><strong>Email:</strong> {user.email}</Text><br />
            <Text><strong>Phone:</strong> {user.phone}</Text><br />
            <Button type="primary" onClick={handleEdit}>Edit</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Profile;