import React, { useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password);

        if (res && res.data.EC === 0) {
            localStorage.setItem('access_token', res.data.access_token);
            notification.success({
                message: 'Login Successful',
                description: 'You have logged in successfully!',
            });
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.data?.user?.email ?? "",
                    name: res?.data?.user?.name ?? "",
                }
            });
            navigate('/');
        } else {
            notification.error({
                message: 'Login Failed',
                description: res?.data.EM ?? 'There was an error during login.',
            });
        }

        console.log('>>> Success:', res);
    };

    return (
        <div style={{ margin: 50 }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                    style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
                >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item
                >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginPage;