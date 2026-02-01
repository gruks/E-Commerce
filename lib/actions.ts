'use server';

import { supabase, db } from './supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Authentication Actions
export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'customer'
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect('/login?message=Check your email to confirm your account');
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect('/');
}

export async function signOut() {
  await supabase.auth.signOut();
  redirect('/login');
}

// Product Actions
export async function createProduct(formData: FormData) {
  const productData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    image_url: formData.get('imageUrl') as string,
    category: formData.get('category') as string,
    stock_quantity: parseInt(formData.get('stockQuantity') as string),
    is_featured: formData.get('isFeatured') === 'on'
  };

  const { error } = await supabase.from('products').insert(productData);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const productData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    image_url: formData.get('imageUrl') as string,
    category: formData.get('category') as string,
    stock_quantity: parseInt(formData.get('stockQuantity') as string),
    is_featured: formData.get('isFeatured') === 'on'
  };

  const { error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
}

// Cart Actions
export async function addToCartAction(productId: string, quantity: number = 1) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { error } = await db.addToCart(user.id, productId, quantity);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/cart');
}

export async function removeFromCart(productId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/cart');
}