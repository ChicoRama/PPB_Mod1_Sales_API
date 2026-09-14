import { supabase } from "../config/supabaseClient.js";

export const RestockModel = {
  async create(payload) {
    const { product_id, supplier_name, quantity } = payload;

    // 1. Simpan transaksi ke tabel restock
    const { data: restockData, error: restockError } = await supabase
      .from("restock")
      .insert([{ product_id, supplier_name, quantity }])
      .select()
      .single();

    if (restockError) throw restockError;

    // 2. Ambil stok lama produk
    const { data: productData, error: productFetchError } = await supabase
      .from("products")
      .select("stock")
      .eq("id", product_id)
      .single();

    if (productFetchError) throw productFetchError;

    // 3. Tambahkan stok produk dengan jumlah barang masuk
    const newStock = productData.stock + Number(quantity);

    const { error: updateError } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", product_id);

    if (updateError) throw updateError;

    return restockData;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("restock")
      .select(`
        id, supplier_name, quantity, created_at,
        products ( id, name, sku )
      `);
    if (error) throw error;
    return data;
  }
};