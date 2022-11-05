import { supabase } from "../../components/supabase/supabaseClient"


export default async function handler(req,res){
  const { data } = await supabase
    .from('cards')
    .select('*')      
  
  if(data){
      res.setHeader('Cache-Control', 'stale-while-revalidate')
      res.status(200).json(data)
  }
}
