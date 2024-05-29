import {useEffect, useState} from "react";
import {getAllStudents} from "./client";
import {Breadcrumb, Layout, Table} from 'antd';
import './App.css';

const {Header, Content, Footer} = Layout;

// get data from backend and display it
function App() {
    const [students, setStudents] = useState([]);

    const fetchStudents = () => {
        getAllStudents()
            .then(data => {
                setStudents(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching students:", error);
            });
    };

    useEffect(() => {
        console.log("the component is mounted");
        fetchStudents();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Layout>
                <Header style={{padding: 0, background: '#fff'}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: '#fff'}}>
                        <Table dataSource={students} columns={columns} rowKey="id"/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;
