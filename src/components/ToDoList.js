import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../styles/ToDoList.css'


function ToDoList({ type }) {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', fecha: '' });

  const initialEntriesByType = {
    tareas: [
      { nombre: 'Tarea 1', descripcion: 'Descripción de la tarea 1', fecha: '2024-05-01' },
      { nombre: 'Tarea 2', descripcion: 'Descripción de la tarea 2', fecha: '2024-05-02' }
    ],
    metas: [
      { nombre: 'Meta 1', descripcion: 'Descripción de la meta 1', fecha: '2024-05-01' },
      { nombre: 'Meta 2', descripcion: 'Descripción de la meta 2', fecha: '2024-05-02' }
    ]
  };


  const localStorageKey = `entries_${type}`;

  const loadInitialEntries = () => {
    const savedEntries = localStorage.getItem(localStorageKey);
    return savedEntries ? JSON.parse(savedEntries) : initialEntriesByType[type];
  };

  const [entries, setEntries] = useState(loadInitialEntries);

  useEffect(() => {
    setEntries(loadInitialEntries());
  }, [type]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(entries));
  }, [entries, localStorageKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, formData]);
    setFormData({ nombre: '', descripcion: '', fecha: '' });
  };

  const handleRemove = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  return (
    <Container className="full-height">
      <Row>
        <Col xs={12} md={6}>
          <h2>Agregar {type === 'tareas' ? 'Tarea' : 'Meta'}</h2>
          <Form onSubmit={handleSubmit} className='form'>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}> {}
              <Button variant="primary" type="submit" className="primary-button"> {}
                Agregar
              </Button>
            </div>
          </Form>
        </Col>

        <Col xs={12} md={6}>
          <h2>Entradas de {type === 'tareas' ? 'Tareas' : 'Metas'}</h2>
          {entries.map((entry, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>Nombre: {entry.nombre}</Card.Title>
                <Card.Text>Descripción: {entry.descripcion}</Card.Text>
                <Card.Text>Fecha: {entry.fecha}</Card.Text>
                <Button variant="primary" className="primary-button" onClick={() => handleRemove(index)}>
                  Remover
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ToDoList;