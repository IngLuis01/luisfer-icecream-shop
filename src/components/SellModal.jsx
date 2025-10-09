// src/components/SellModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function SellModal({ show, onHide, product, onConfirm, working }) {
  const [cantidad, setCantidad] = useState(1);

  const handleConfirm = () => {
    onConfirm(cantidad);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vender: {product?.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Precio: <strong>${product?.precio_publico}</strong></p>
        <Form.Group>
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </Form.Group>
        <p className="mt-2 text-muted">Se descontará inventario y se registrará la venta.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={working}>Cancelar</Button>
        <Button variant="primary" onClick={handleConfirm} disabled={working}>
          {working ? 'Procesando...' : 'Confirmar venta'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

