import { createClient } from '@supabase/supabase-js'
import { Post, User } from '@/types'
import { data } from 'browserslist'

const supabase = createClient(
  'https://dadpwdfxpmpsxxfbjrzr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZHB3ZGZ4cG1wc3h4ZmJqcnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwNTk2MDQsImV4cCI6MjAwMzYzNTYwNH0.FCIh8CKgOIpwhLkqZ0mzJ-kgdsEcIBBAbzaALh7Tmmw'
)

export async function getAll(table: string) {
  return supabase.from(table).select().order('id')
}

export async function updateAll(table: string, data: any) {
  return supabase.from(table).upsert(data).select()
}

export async function deleteItem(table: string, id: number) {
  return supabase.from(table).delete().eq('id', id)
}

export async function addItem(table: string, data: any) {
  return supabase.from(table).insert(data)
}
