import { NextRequest, NextResponse } from 'next/server';
import { supabase, db } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    const filters: any = {};
    if (category) filters.category = category;
    if (featured) filters.featured = true;

    const { data: products, error } = await db.getProducts(filters);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, image_url, category, stock_quantity, is_featured } = body;

    // Validate required fields
    if (!name || !description || !price || !image_url || !category || stock_quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name,
        description,
        price: parseFloat(price),
        image_url,
        category,
        stock_quantity: parseInt(stock_quantity),
        is_featured: Boolean(is_featured)
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}