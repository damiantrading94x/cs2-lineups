import { NextRequest, NextResponse } from 'next/server';

const MAP_IMAGES: Record<string, string> = {
  mirage:
    'https://static.wikia.nocookie.net/cswikia/images/f/f5/De_mirage_cs2.png/revision/latest?cb=20230807124319',
  inferno:
    'https://static.wikia.nocookie.net/cswikia/images/1/17/Cs2_inferno_remake.png/revision/latest?cb=20250730204740',
  nuke:
    'https://static.wikia.nocookie.net/cswikia/images/d/d6/De_nuke_cs2.png/revision/latest?cb=20240426010253',
  ancient:
    'https://static.wikia.nocookie.net/cswikia/images/5/5c/De_ancient_cs2.png/revision/latest?cb=20250815011913',
  anubis:
    'https://static.wikia.nocookie.net/cswikia/images/a/a0/CS2_Anubis_B_site.png/revision/latest?cb=20260122021359',
  dust2:
    'https://static.wikia.nocookie.net/cswikia/images/1/16/Cs2_dust2.png/revision/latest?cb=20230913150804',
  train:
    'https://static.wikia.nocookie.net/cswikia/images/2/2c/De_train_cs2_new.png/revision/latest?cb=20250730205931',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ mapId: string }> }
) {
  const { mapId } = await params;
  const imageUrl = MAP_IMAGES[mapId];

  if (!imageUrl) {
    return NextResponse.json({ error: 'Map not found' }, { status: 404 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: 502 }
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 502 }
    );
  }
}
