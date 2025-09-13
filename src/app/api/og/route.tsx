import { ImageResponse } from 'next/og'
import { NextResponse } from 'next/server'

import { getOGImageFonts } from '@/lib/fonts'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')

  if (!title) {
    return NextResponse.json(
      {
        error: 'Missing title'
      },
      {
        status: 400
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#000',
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          flexDirection: 'column',
          padding: 70,
          color: '#fff'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='50' fill='none' viewBox='0 0 114 138'>
              <path
                stroke='#fff'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='12'
                d='M6.602 116.25v-94.5A15.75 15.75 0 0 1 22.352 6h78.75a6.3 6.3 0 0 1 6.3 6.3v113.4a6.3 6.3 0 0 1-6.3 6.3h-78.75a15.75 15.75 0 0 1-15.75-15.75m0 0a15.75 15.75 0 0 1 15.75-15.75h85.05'
              />
            </svg>
            <div style={{ marginLeft: 32, fontSize: 48, fontWeight: 600 }}>One Blog</div>
          </div>
          <div style={{ marginTop: 80, fontSize: 40, fontWeight: 500 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 24, fontWeight: 500 }}>
          one-blog.nelsonlai.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await getOGImageFonts()
    }
  )
}
