import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { data } from '../data/Data';
import { Button, Modal, Form, Row, Col, Table, Navbar, Nav, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import Network from '../graph/Network';
import ToDo from '../toDo/ToDo';
import {v4 as uuid} from 'uuid';

export default function Dashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [devices, setDevices] = useState(false);
    const [signOut, setSignOut] = useState(false);
    const [newDevice, setNewDevice] = useState([]);
    const [showGraph, setShowGraph] = useState(false);
    const [showToDo, setShowToDo] = useState(false);
    const [toDoSet, setToDoSet] = useState([]);

    const pieData = {
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        width: 380
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }
    const barData = {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        width: 380
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
        series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    }


    useEffect(() => {
        if(data.length>0) {
            localStorage.setItem("user", data.at(0));
        }
        let userName = localStorage.getItem('user').split('@')[0];
        setUser(userName);
        const storedToDo = JSON.parse(localStorage.getItem("todo"));
        const storedDevice = JSON.parse(localStorage.getItem("devices"));
        if(storedToDo) {
            setToDoSet(storedToDo);
        }
        if(storedDevice) {
            setNewDevice(storedDevice);
        }
    },[])

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(toDoSet));
    },[toDoSet])

    useEffect(() => {
        localStorage.setItem("devices", JSON.stringify(newDevice));
    },[newDevice])

    //handling sign out
    const handleSignOut = () => setSignOut(true);
    const handleClose = () => setSignOut(false);
    const handleSignOutRemove =() => {
        localStorage.clear();
        navigate("/login");
    }

    //handling device related functions
    const handleDevices = () => setDevices(true);
    const handleCloseDevices = () => {
        setDevices(false);
        setNewDevice(newDevice.filter(k => k.device !== ''));
    }
    const handleAddDevice = (e) => {
        e.preventDefault();
        setNewDevice([...newDevice, {id: uuid(), device: '', number: ''}])
    }
    const handleDeviceChange = (index, e) => {
        let data=[...newDevice];
        data[index][e.target.name]=[e.target.value];
        setNewDevice(data);
    }
    const handleDeviceDelete = (id) => {
        setNewDevice(newDevice.filter(k => k.id !== id));
    }
    const handleDeviceSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
        } else {
            e.preventDefault();
            handleCloseDevices();
        }
    }

    //handling graph display
    const handleGraph = () => setShowGraph(true);
    const handleCloseGraph = () => setShowGraph(false);


    //handling to-do list
    const handleToDo = () => setShowToDo(true);
    const handleCloseToDo = () => setShowToDo(false);
    const handleToDoSet = (todo) => {
        setToDoSet([todo, ...toDoSet]);
    }
    const toDoRemove = (id) => {
        setToDoSet(toDoSet.filter(k => k.id !== id));
    }

    return (
        <div> 
            <Navbar  className="sidebar" collapseOnSelect expand="lg"  variant="dark">
                <Container>
                    <Navbar.Brand>
                        <div className="sidebar-title">
                            <span className="material-icons">account_circle</span>
                            <span>Hi {user}!</span>
                        </div>
                    </Navbar.Brand>
                
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto menu-contents">
                            <Nav className="sidebar-menu-item">Dashboard</Nav>
                            <Nav.Link href="#action" className="sidebar-menu-item sub" onClick={handleDevices}>Devices</Nav.Link>
                            <Nav.Link href="#action" className="sidebar-menu-item sub" onClick={handleGraph}>Graph</Nav.Link>
                            <Nav.Link href="#action" className="sidebar-menu-item sub" onClick={handleToDo}>To-Do List</Nav.Link>
                            <Nav.Link href="#action" className="sidebar-menu-item sub" onClick={handleSignOut}>Sign Out<span className="material-icons">logout</span></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="user-container">
                <div className="table-data">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Devices</th>
                                <th>Number of Devices</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newDevice.length > 0 ? newDevice.map((dev) => {
                                    return (
                                        <tr key={dev.id}>
                                            <td>{dev.device}</td>
                                            <td>{dev.number}</td>
                                        </tr>
                                    )
                                }):  <tr><td>No Devices added</td></tr>
                            }
                        </tbody>
                    </Table>
                    <Table bordered className="to-do-list">
                        <thead>
                            <tr>
                                <th>To Do List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                toDoSet.length> 0 ? toDoSet.map(data => {
                                    return (
                                        <tr key={data.id}>
                                            <td className="lists">
                                                <span style={{textDecoration : toDoSet.completed ? "line-through" : null}}>{data.task}</span>
                                                <Button onClick={(e)=>toDoRemove(data.id)}>X</Button>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr><td>No List</td></tr>
                            }
                        </tbody>
                    </Table>
                </div>  
                <div className="chart-data">
                    <Chart options={pieData.options} series={pieData.series} type="pie" />
                    <Chart options={barData.options} series={barData.series} type="bar" />
                </div>
            </div>
            <Modal show={devices} onHide={handleCloseDevices} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="action-title"> <span className="material-icons">devices</span><span>Add the devices you have:</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={(e) =>handleDeviceSubmit(e)} className="Device-form">
                        {
                            newDevice.map((k, index) => {
                                return (
                                    <Row key={k.id}>
                                        <Col md="5">
                                            <Form.Group className="mb-3" controlId="formBasicDevice">
                                                <Form.Label>Device</Form.Label>
                                                <Form.Select name='device' value={k.device} aria-label="Default select example" onChange={(e)=> handleDeviceChange(index,e)}>
                                                    <option  disabled value=""></option>
                                                    <option value="PC">PC</option>
                                                    <option value="Laptop">Laptop</option>
                                                    <option value="Mobile">Mobile</option>
                                                    <option value="Printer">Printer</option>
                                                    <option value="Router">Router</option>
                                                    <option value="Server">Server</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    Please add device.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group className="mb-3" controlId="formBasicQuantity">
                                                <Form.Label>Number of Devices</Form.Label>
                                                <Form.Control type="number" name='number' value={k.number} onChange={(e)=> handleDeviceChange(index,e)}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Provide number of devices.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            
                                            
                                        </Col>
                                        <Col md="2" className="delete"> 
                                            <Button onClick={(e) => handleDeviceDelete(k.id)}>delete</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <Row>
                            <Col>
                                <Button className="add-button" onClick={(e)=>handleAddDevice(e)}><span className="material-icons">add</span><span>Add Device</span></Button>
                            </Col>
                            <Col>
                                <Button type="submit" style={{float: "right"}}>Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={signOut} backdrop="static" onHide={handleClose} centered>
                <Modal.Body>
                    <div className="logout-content">
                        <span className="material-icons">help</span>
                        <span className="confirm-text">Are you sure you want to log out?</span>
                        <div>
                            <Button className="logout-confirm" onClick={() => handleSignOutRemove()}>Yes</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showGraph} backdrop="static" onHide={handleCloseGraph} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="action-title"> <span className="material-icons">hub</span><span>Graph of devices</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Network newDevice={newDevice}/>
                </Modal.Body>
            </Modal>
            <Modal show={showToDo} backdrop="static" onHide={handleCloseToDo} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="action-title"> <span className="material-icons">list</span><span>To Do List</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToDo handleToDoSet={handleToDoSet} handleCloseToDo={handleCloseToDo}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}
