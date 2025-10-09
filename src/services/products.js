// src/services/productos.js
import { supabase } from "../lib/supabaseClient";

export async function fetchProductos({ limit = 12, offset = 0 } = {}) {
  const { data, error, count } = await supabase
    .from("productos")
    .select("*", { count: 'exact' })
    .range(offset, offset + limit - 1)
    .order('id', { ascending: true });
  return { data, error, count };
}

export async function getProductoById(id) {
  const { data, error } = await supabase.from("productos").select("*").eq('id', id).single();
  return { data, error };
}

export async function createProducto(payload) {
  const { data, error } = await supabase.from("productos").insert([payload]);
  return { data, error };
}

export async function updateProducto(id, payload) {
  const { data, error } = await supabase.from("productos").update(payload).eq('id', id);
  return { data, error };
}

export async function deleteProducto(id) {
  const { data, error } = await supabase.from("productos").delete().eq('id', id);
  return { data, error };
}

/** RPC para vender producto */
export async function venderProducto(productoId, userId, cantidad = 1) {
  const { data, error } = await supabase.rpc('vender_producto', {
    p_producto_id: productoId,
    p_user_id: userId,
    p_cantidad: cantidad
  });
  return { data, error };
}

/** Vistas */
export async function getCalorias(productoId) {
  const { data, error } = await supabase.from('v_calorias_producto').select('*').eq('producto_id', productoId).single();
  return { data, error };
}
export async function getCosto(productoId) {
  const { data, error } = await supabase.from('v_costo_producto').select('*').eq('producto_id', productoId).single();
  return { data, error };
}
export async function getRentabilidad(productoId) {
  const { data, error } = await supabase.from('v_rentabilidad_producto').select('*').eq('producto_id', productoId).single();
  return { data, error };
}
