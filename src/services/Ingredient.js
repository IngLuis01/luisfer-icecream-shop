// src/services/ingredientes.js
import { supabase } from "../lib/supabaseClient";

/**
 * Trae todos los ingredientes ordenados por id
 */
export async function fetchIngredientes() {
  const { data, error } = await supabase
    .from("ingredientes")
    .select("*")
    .order("id", { ascending: true });
  return { data, error };
}

/**
 * Trae un ingrediente por id
 */
export async function getIngrediente(id) {
  const { data, error } = await supabase
    .from("ingredientes")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

/**
 * Crear ingrediente
 * payload: { nombre, precio, calorias, inventario, es_vegetariano, es_sano, tipo, sabor }
 */
export async function createIngrediente(payload) {
  const { data, error } = await supabase.from("ingredientes").insert([payload]);
  return { data, error };
}

/**
 * Actualizar ingrediente por id
 */
export async function updateIngrediente(id, payload) {
  const { data, error } = await supabase
    .from("ingredientes")
    .update(payload)
    .eq("id", id);
  return { data, error };
}

/**
 * Eliminar ingrediente
 */
export async function deleteIngrediente(id) {
  const { data, error } = await supabase
    .from("ingredientes")
    .delete()
    .eq("id", id);
  return { data, error };
}

/**
 * Reabastecer (poner inventario en una cantidad)
 */
export async function reabastecerIngrediente(id, cantidad = 100) {
  const { data, error } = await supabase
    .from("ingredientes")
    .update({ inventario: cantidad })
    .eq("id", id);
  return { data, error };
}

/**
 * Vaciar inventario (poner en 0) - usar sólo si es complemento
 */
export async function vaciarIngrediente(id) {
  const { data, error } = await supabase
    .from("ingredientes")
    .update({ inventario: 0 })
    .eq("id", id);
  return { data, error };
}
