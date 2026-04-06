import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if any admin user exists
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      return NextResponse.json(
        { error: 'Setup locked. Admin users already exist.' }, 
        { status: 403 }
      );
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create the initial admin user
    const admin = await User.create({
      email: 'admin@mortgagepro.co.il',
      password: hashedPassword,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Default admin created securely.',
      credentials: {
        email: 'admin@mortgagepro.co.il',
        password: 'admin123'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error during setup' }, { status: 500 });
  }
}
