import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { addGoal, removeGoal, initGoals } from '../store/reducers/goalReducer';
import { addTask, removeTask, initTasks } from '../store/reducers/taskReducer';
import '../styles/ToDoList.scss'

function ToDoList({ type }) {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', fecha: '' });
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    if (type === 'metas') {
      fetch("http://localhost:3001/goal/getGoals", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123456"
        },
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            dispatch(initGoals(data));
          }
        })
        .catch(error => {
          console.error("Error fetching goals:", error);
        });
    } else if (type === 'tareas') {
      fetch("http://localhost:3001/task/getTasks", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123456"
        },
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            dispatch(initTasks(data));
          }
        })
        .catch(error => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [dispatch, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'metas') {
      dispatch(addGoal(formData));
      setFormData({ nombre: '', descripcion: '', fecha: '' });
    } else if (type === 'tareas') {
      dispatch(addTask(formData));
      setFormData({ nombre: '', descripcion: '', fecha: '' });
    }
  };

  const handleRemove = (id) => {
    if (type === 'metas') {
      dispatch(removeGoal(id));
    } else if (type === 'tareas') {
      dispatch(removeTask(id));
    }
  };

  const items = type === 'metas' ? goals : tasks;

  return (
    <Container className="full-height">
      <Row>
        <Col xs={12} md={6}>
          <h2>Agregar {type === 'metas' ? 'Meta' : 'Tarea'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" type="submit" className="primary-button">
                Agregar
              </Button>
            </div>
          </Form>
        </Col>

        <Col xs={12} md={6}>
          <h2>{type === 'metas' ? 'Metas' : 'Tareas'}</h2>
          {Array.isArray(items) && items.map((item) => (
            <Card key={item.id} className="card">
              <Card.Body>
                <Card.Title>Nombre: {item.nombre}</Card.Title>
                <Card.Text>Descripción: {item.descripcion}</Card.Text>
                <Card.Text>Fecha: {item.fecha}</Card.Text>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="danger" onClick={() => handleRemove(item.id)} className="primary-button card-button">
                    Remover
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ToDoList;