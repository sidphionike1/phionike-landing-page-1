'use client'

/**
 * Pixel-perfect geometric composition for the Hero section
 * Manually positioned grid-based layout with fixed dimensions and spacing
 */
export function HeroVisual() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid"
        style={{
          width: 'fit-content',
          height: 'auto',
          gridTemplateColumns: '268px 173px 233px',
          gap: '22px 22px',
          alignItems: 'end',
          justifyItems: 'stretch',
        }}
      >
      {/* Row 1 */}
      {/* Orange Card - Column 1 */}
      <div
        style={{
          width: '268px',
          height: '303px',
          borderRadius: '30px',
          backgroundColor: '#FF5A1F',
          gridColumn: '1',
          gridRow: '1',
        }}
      />

      {/* Small Yellow Square - Column 3 (centered above Large Yellow) */}
      <div
        style={{
          width: '109px',
          height: '100px',
          borderRadius: '28px',
          backgroundColor: '#F5B800',
          gridColumn: '3',
          gridRow: '1',
          justifySelf: 'center',
          marginBottom: '18px',
        }}
      />

      {/* Row 2 */}
      {/* Purple Card - Column 1 */}
      <div
        style={{
          width: '173px',
          height: '159px',
          borderRadius: '30px',
          backgroundColor: '#CDAAF5',
          gridColumn: '1',
          gridRow: '2',
        }}
      />

      {/* Blue Card - Column 2 */}
      <div
        style={{
          width: '173px',
          height: '159px',
          borderRadius: '30px',
          backgroundColor: '#3F39F6',
          gridColumn: '2',
          gridRow: '2',
        }}
      />

      {/* Large Yellow Card - Column 3 */}
      <div
        style={{
          width: '233px',
          height: '280px',
          borderRadius: '30px',
          backgroundColor: '#F5B800',
          gridColumn: '3',
          gridRow: '2',
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
