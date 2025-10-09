// src/components/ProductCard.jsx
import React, { useState } from 'react';
import SellModal from './SellModal';
import { useAuth } from '../context/AuthContext';
import { venderProducto, getCalorias, getCosto, getRentabilidad } from '../services/productos';

export default function ProductCard({ product, onSold }) {
  const { profile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [working, setWorking] = useState(false);
  const [meta, setMeta] = useState(null);

  const openModal = async () => {
    // opcional: prefetch vistas
    const [cResp, costResp, rResp] = await Promise.all([
      getCalorias(product.id),
      getCosto(product.id),
      getRentabilidad(product.id)
    ].map(p => p.catch?.(()=>null)));
    setMeta({ calorias: cResp?.data, costo: costResp?.data, rentabilidad: rResp?.data });
    setShowModal(true);
  };

  const handleConfirm = async (cantidad) => {
    if (!profile) return alert('Debes iniciar sesión');
    setWorking(true);
    const { data, error } = await venderProducto(product.id, profile.id, cantidad);
    setWorking(false);
    setShowModal(false);
    if (error) return alert('Error: ' + error.message);
    alert(`Venta OK. Rentabilidad: ${data?.rentabilidad ?? 'N/A'}`);
    if (onSold) onSold(); // refrescar lista
  };

  return (
    <article className="card h-100 shadow-sm">
      <section className="card-body d-flex flex-column">
        <header>
          <h5 className="card-title">{product.nombre}</h5>
          <p className="card-subtitle mb-2 text-muted">Precio: ${Number(product.precio_publico).toFixed(2)}</p>
        </header>

        <div className="mt-auto">
          <button className="btn btn-outline-primary me-2" onClick={openModal}>Vender</button>
          <a className="btn btn-outline-secondary" href={`/productos/${product.id}`}>Ver</a>
        </div>
      </section>

      <SellModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={product}
        onConfirm={handleConfirm}
        working={working}
      />
    </article>
  );
}
