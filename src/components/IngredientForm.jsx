import { useState, useEffect } from "react";

export default function IngredienteForm({ onSave, selected, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    calorias: "",
    inventario: "",
    es_vegetariano: false,
    es_sano: true,
    tipo: "base",
    sabor: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      nombre: "",
      precio: "",
      calorias: "",
      inventario: "",
      es_vegetariano: false,
      es_sano: true,
      tipo: "base",
      sabor: "",
    });
  };

  return (
    <section className="mb-4">
      <article className="card p-4 shadow-sm">
        <header>
          <h5 className="text-primary fw-bold mb-3">
            {selected ? "Editar Ingrediente" : "Nuevo Ingrediente"}
          </h5>
        </header>

        <form onSubmit={handleSubmit}>
          <section className="row">
            <article className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </article>

            <article className="col-md-3 mb-3">
              <label className="form-label">Precio ($)</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </article>

            <article className="col-md-3 mb-3">
              <label className="form-label">Calorías</label>
              <input
                type="number"
                name="calorias"
                className="form-control"
                value={form.calorias}
                onChange={handleChange}
                required
              />
            </article>
          </section>

          <section className="row">
            <article className="col-md-3 mb-3">
              <label className="form-label">Inventario</label>
              <input
                type="number"
                name="inventario"
                className="form-control"
                value={form.inventario}
                onChange={handleChange}
              />
            </article>

            <article className="col-md-3 mb-3">
              <label className="form-label">Tipo</label>
              <select
                name="tipo"
                className="form-select"
                value={form.tipo}
                onChange={handleChange}
              >
                <option value="base">Base</option>
                <option value="complemento">Complemento</option>
              </select>
            </article>

            <article className="col-md-3 mb-3">
              <label className="form-label">Sabor (solo si es base)</label>
              <input
                type="text"
                name="sabor"
                className="form-control"
                value={form.sabor}
                onChange={handleChange}
                disabled={form.tipo === "complemento"}
              />
            </article>

            <article className="col-md-3 d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="es_vegetariano"
                  checked={form.es_vegetariano}
                  onChange={handleChange}
                />
                <label className="form-check-label">Vegetariano</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="es_sano"
                  checked={form.es_sano}
                  onChange={handleChange}
                />
                <label className="form-check-label">Sano</label>
              </div>
            </article>
          </section>

          <footer className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
              {selected ? "Actualizar" : "Agregar"}
            </button>
            {selected && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>
            )}
          </footer>
        </form>
      </article>
    </section>
  );
}
