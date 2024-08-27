import Link from 'next/link'


export default function Home() {
  return (
    <>
      <div style={{ margin: '0 auto', textAlign: 'center', fontSize: '30px', marginTop: '100px' }}>
        <p style={{ marginBottom: '10px' }}>Hello...</p>
        <button style={{padding: '15px', fontSize: "20px", color: 'white'}}>
          <Link href={'/map'} >Let's learn</Link>
        </button>
      </div>

    </>
  )
}