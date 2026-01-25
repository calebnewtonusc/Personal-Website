import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_ojj4hci2Q0M5Gcrd8Wt98Q_H5oFdzFR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
