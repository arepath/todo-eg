import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../styles/ToDoList.css'

export function ToDoList() {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', fecha: '' });
  const [entries, setEntries] = useState([
    { nombre: 'Tarea 1', descripcion: 'Descripción de la tarea 1', fecha: '2024-05-01' },
    { nombre: 'Tarea 2', descripcion: 'Descripción de la tarea 2', fecha: '2024-05-02' },
  ]);
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
    <Container>
      <Row>
        <Col md={6}>
          <h2>Agregar</h2>
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
            <Button variant="primary" type="submit" className="btnAdd">
              Agregar
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h2>Entradas</h2>
          {entries.map((entry, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>Nombre: {entry.nombre}</Card.Title>
                <Card.Text>Descripción:{entry.descripcion}</Card.Text>
                <Card.Text>Fecha: {entry.fecha}</Card.Text>
                <Button variant="danger" onClick={() => handleRemove(index)}>
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