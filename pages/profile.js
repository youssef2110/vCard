import React from 'react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { supabase } from '../components/supabase/supabaseClient';
import { hasCookie } from 'cookies-next';

export default function profile() {
    
  return (
    <div>profile</div>
  )
}


export async function getServerSideProps(context) {
    const { res, req } = context
    const session = hasCookie('access_token',{ req, res }); 
    if (!session) {
        res.writeHead(302, {
            Location: '/',
        })
        res.end();
        return {
            props: {

            },
        }
    }
    return {
        props: {
        },
    }
}