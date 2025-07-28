// app/api/download/[component]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest, context: { params: Promise<{ component: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;  // Await here to resolve the Promise
  const { component } = params;
  // Add type assertion or interface for session.user if needed
  const tier = (session.user as { tier?: string }).tier || 'Pleb';

  const accessMap: { [key: string]: string[] } = {
    Pleb: ['basic-component'],
    Standard: ['basic-component', 'standard-component'],
    Premium: ['basic-component', 'standard-component', 'premium-component'],
    Maxi: ['basic-component', 'standard-component', 'premium-component', 'maxi-component'],
  };

  if (!accessMap[tier].includes(component)) {
    return NextResponse.json({ error: `No access to ${component} for ${tier} tier` }, { status: 403 });
  }

  return NextResponse.json({ message: `Download ${component} for ${tier}` });
}