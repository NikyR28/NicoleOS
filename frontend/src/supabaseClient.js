import {createClient} from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl,supabaseAnonKey);

export async function getBooksSupabase(){
    const {books, error} = await supabase
        .from('books')
        .select('*');
    if(error) alert('Qualcosa è andato storto nel carimento!');
    else return books;
}