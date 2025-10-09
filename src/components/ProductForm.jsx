// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createProducto, updateProducto } from '../services/products';
import { fetchIngredientes } from '../services/Ingredient';

export default function ProductForm({ edit = null, onSaved }) {
  const [form, setForm] = useState({
    nombre: '',
    precio_publico: '',
    tipo: 'copa',
    vaso: '',
    volumen_onzas: '',
    ingredientes: [] // ids
  });
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(()=> {
    // cargar ingredientes para seleccionar
    fetchIngredientes().then(({data})=> setIngredientes(data || []));
    if (edit) {
      setForm({
        nombre: edit.nombre,
        precio_publico: edit.precio_publico,
        tipo: edit.tipo,
        vaso: edit.vaso,
        volumen_onzas: edit.volumen_onzas,
        ingredientes: [] // opcional: cargar ingredientes asociados
      });
    }
  }, [edit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({...prev, [name]: type==='checkbox'?checked:value}));
  };

  const handleIngredToggle = (id) => {
    setForm(prev => {
      const exists = prev.ingredientes.includes(id);
      return {...prev, ingredientes: exists ? prev.ingredientes.filter(i=>i!==id) : [...prev.ingredientes, id]};
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      precio_publico: parseFloat(form.precio_publico),
      tipo: form.tipo,
      vaso: form.tipo==='copa' ? form.vaso : null,
      volumen_onzas: form.tipo==='malteada' ? parseInt(form.volumen_onzas||0,10) : null
    };
    try {
      if (edit) {
        await updateProducto(edit.id, payload);
      } else {
        const { data, error } = await createProducto(payload);
        if (error) throw error;
        // si quieres relacionar ingredientes, insert en producto_ingrediente aquí (requiere otro service)
      }
      if (onSaved) onSaved();
    } catch (err) {
      alert(err.message || 'Error guardando producto');
    }
  };

  return (
    <article className="card p-3 mb-3">
      <header><h5 className="fw-bold">Crear / Editar Producto</h5></header>
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Precio</label>
          <input className="form-control" name="precio_publico" type="number" step="0.01" value={form.precio_publico} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Tipo</label>
          <select className="form-select" name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="copa">Copa</option>
            <option value="malteada">Malteada</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Vaso</label>
          <input className="form-control" name="vaso" value={form.vaso} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Vol (oz)</label>
          <input className="form-control" name="volumen_onzas" type="number" value={form.volumen_onzas} onChange={handleChange}/>
        </div>

        <div className="col-12">
          <label className="form-label">Ingredientes (selecciona)</label>
          <div className="d-flex flex-wrap gap-2">
            {ingredientes.map(ing => (
              <div key={ing.id} className="form-check">
                <input className="form-check-input" type="checkbox" id={`ing-${ing.id}`} checked={form.ingredientes.includes(ing.id)} onChange={()=>handleIngredToggle(ing.id)} />
                <label className="form-check-label" htmlFor={`ing-${ing.id}`}>{ing.nombre}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 text-end">
          <button className="btn btn-primary mt-2">Guardar producto</button>
        </div>
      </form>
    </article>
  );
}
