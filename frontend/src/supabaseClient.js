import {createClient} from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl,supabaseAnonKey);

export const getBooksSupabase = async () => {
  const { data, error } = await supabase.from('books').select('*');
  if (error) console.error(error);
  return data;
};

export const addBookSupabase = async (newBook) => {
  const { data, error } = await supabase.from('books').insert([newBook]).select().single();
  if (error) console.error(error);
  return data;
};

export const updateBookSupabase = async (id, updatedBook) => {
  const { data, error } = await supabase.from('books').update(updatedBook).eq('id', id).select().single();
  if (error) console.error(error);
  return data;
};

export const deleteBookSupabase = async (id) => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Errore durante l'eliminazione:", error);
    return false;
  }
  return true;
};