// src/pages/Ingredientes.jsx
import { useEffect, useState } from "react";
import {
  fetchIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
  reabastecerIngrediente,
  vaciarIngrediente,
} from "../services/Ingredient";
import IngredienteForm from "../components/IngredientForm";

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false); // para acciones
  const [message, setMessage] = useState(null); // {type:'success'|'error', text:''}

  const load = async () => {
    setLoading(true);
    const { data, error } = await fetchIngredientes();
    if (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error cargando ingredientes." });
    } else {
      setIngredientes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const showMsg = (type, text, timeout = 3000) => {
    setMessage({ type, text });
    if (timeout) setTimeout(() => setMessage(null), timeout);
  };

  const handleSave = async (payload) => {
    setWorking(true);
    try {
      if (selected) {
        const { error } = await updateIngrediente(selected.id, payload);
        if (error) throw error;
        showMsg("success", "Ingrediente actualizado");
        setSelected(null);
      } else {
        const { error } = await createIngrediente(payload);
        if (error) throw error;
        showMsg("success", "Ingrediente creado");
      }
      await load();
    } catch (err) {
      console.error(err);
      showMsg("error", err.message || "Error al guardar");
    } finally {
      setWorking(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar ingrediente? Esta acción no se puede deshacer")) return;
    setWorking(true);
    try {
      const { error } = await deleteIngrediente(id);
      if (error) throw error;
      showMsg("success", "Ingrediente eliminado");
      await load();
    } catch (err) {
      console.error(err);
      showMsg("error", err.message || "Error al eliminar");
    } finally {
      setWorking(false);
    }
  };

  const handleReabastecer = async (id) => {
    setWorking(true);
    try {
      const { error } = await reabastecerIngrediente(id, 100);
      if (error) throw error;
      showMsg("success", "Inventario reabastecido");
      await load();
    } catch (err) {
      console.error(err);
      showMsg("error", err.message || "Error al reabastecer");
    } finally {
      setWorking(false);
    }
  };

  const handleVaciar = async (id, tipo) => {
    if (tipo !== "complemento") return showMsg("error", "Solo complementos se pueden vaciar");
    if (!confirm("Vaciar inventario del complemento?")) return;
    setWorking(true);
    try {
      const { error } = await vaciarIngrediente(id);
      if (error) throw error;
      showMsg("success", "Inventario vaciado");
      await load();
    } catch (err) {
      console.error(err);
      showMsg("error", err.message || "Error al vaciar");
    } finally {
      setWorking(false);
    }
  };

  return (
    <main className="container py-4">
      <header className="mb-4 text-center">
        <h2 className="fw-bold text-primary">🍦 Gestión de Ingredientes</h2>
        <p className="text-muted">Crear, editar, eliminar y controlar inventarios</p>
      </header>

      <section aria-live="polite">
        {message && (
          <article className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`} role="alert">
            {message.text}
          </article>
        )}
      </section>

      <section>
        <IngredienteForm onSave={handleSave} selected={selected} onCancel={() => setSelected(null)} />
      </section>

      <section>
        <article className="card shadow-sm">
          <header className="card-header bg-primary text-white fw-bold">Lista de Ingredientes</header>
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Calorías</th>
                  <th>Inventario</th>
                  <th>Tipo</th>
                  <th>Vegetariano</th>
                  <th>Sano</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr><td colSpan="9">Cargando...</td></tr>
                ) : ingredientes.length === 0 ? (
                  <tr><td colSpan="9">No hay ingredientes.</td></tr>
                ) : (
                  ingredientes.map((ing) => (
                    <tr key={ing.id}>
                      <td>{ing.id}</td>
                      <td>{ing.nombre}</td>
                      <td>${Number(ing.precio).toFixed(2)}</td>
                      <td>{ing.calorias}</td>
                      <td>{ing.inventario}</td>
                      <td>{ing.tipo}</td>
                      <td>{ing.es_vegetariano ? "Yes" : "No"}</td>
                      <td>{ing.es_sano ? "Yes" : "No"}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => setSelected(ing)}
                          aria-label={`Editar ${ing.nombre}`}
                        >
                          ✏️
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger me-1"
                          onClick={() => handleDelete(ing.id)}
                          aria-label={`Eliminar ${ing.nombre}`}
                        >
                          🗑️
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success me-1"
                          onClick={() => handleReabastecer(ing.id)}
                        >
                          🔄
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleVaciar(ing.id, ing.tipo)}
                        >
                          ❄️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <footer className="text-muted text-center mt-3">
        <small>Recuerda: los complementos pueden vaciar inventario a 0.</small>
      </footer>
    </main>
  );
}
