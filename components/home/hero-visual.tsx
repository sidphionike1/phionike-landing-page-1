'use client'

/**
 * Pixel-perfect geometric composition for the Hero section
 * Absolutely positioned to match exact Figma coordinates
 */
export function HeroVisual() {
  return (
    <div className="flex flex-col gap-4">
      <div
        style={{
          position: 'relative',
          width: '621px',
          height: '487px',
        }}
      >
        {/* Purple Card */}
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '327px',
            width: '172px',
            height: '160px',
            borderRadius: '30px',
            backgroundColor: '#CDAAF5',
          }}
        />

        {/* Blue Card */}
        <div
          style={{
            position: 'absolute',
            left: '192px',
            top: '327px',
            width: '172px',
            height: '160px',
            borderRadius: '30px',
            backgroundColor: '#3F39F6',
          }}
        />

        {/* Orange Card - overlaps top of purple + blue */}
        <div
          style={{
            position: 'absolute',
            left: '96px',
            top: '0px',
            width: '268px',
            height: '303px',
            borderRadius: '30px',
            backgroundColor: '#FF5A1F',
          }}
        />

        {/* Large Yellow Card */}
        <div
          style={{
            position: 'absolute',
            left: '388px',
            top: '207px',
            width: '233px',
            height: '280px',
            borderRadius: '30px',
            backgroundColor: '#F5B800',
          }}
        />

        {/* Small Yellow Card */}
        <div
          style={{
            position: 'absolute',
            left: '484px',
            top: '83px',
            width: '106.41px',
            height: '99.70px',
            borderRadius: '30px',
            backgroundColor: '#F5B800',
            transform: 'rotate(-0.24deg)',
          }}
        />
      </div>

      {/* Signature */}
      <p className="text-right text-xs uppercase tracking-widest text-muted-foreground">
        Design & Strategy Studio
      </p>
    </div>
  )
}