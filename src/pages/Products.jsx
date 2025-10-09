// src/pages/Productos.jsx
import React, { useEffect, useState } from 'react';
import { fetchProductos, deleteProducto } from '../services/products';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm'; // veremos abajo
import Toasts from '../components/Toasts';   

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit] = useState(9);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const load = async (p = 0) => {
    setLoading(true);
    const { data, error, count } = await fetchProductos({ limit, offset: p * limit });
    if (error) {
      setMessage({ type: 'error', text: 'Error cargando productos' });
    } else {
      setProductos(data || []);
      setCount(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => { load(page); }, [page]);

  const handleDelete = async (id) => {
    if (!confirm('Eliminar producto?')) return;
    const { error } = await deleteProducto(id);
    if (error) alert('Error ' + error.message);
    else load(page);
  };

  return (
    <main className="container py-4">
      <header className="mb-4 text-center">
        <h2 className="fw-bold text-primary">📦 Productos</h2>
      </header>

      <section className="mb-3">
        <ProductForm onSaved={() => load(page)} />
      </section>

      <section>
        {loading ? (
          <p>Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p>No hay productos.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {productos.map(prod => (
              <article className="col" key={prod.id}>
                <ProductCard product={prod} onSold={() => load(page)} />
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="d-flex justify-content-between align-items-center mt-4">
        <div>
          Mostrando {productos.length} de {count} productos
        </div>
        <div>
          <button className="btn btn-outline-primary me-2" disabled={page===0} onClick={()=>setPage(p=>p-1)}>Anterior</button>
          <button className="btn btn-outline-primary" disabled={(page+1)*limit >= count} onClick={()=>setPage(p=>p+1)}>Siguiente</button>
        </div>
      </section>

      <Toasts message={message} onClose={()=>setMessage(null)} />
    </main>
  );
}
