
export async function getStaticPaths() {
    return {
      paths: [{ params: { name : 'test' } }],
      fallback: true,
    }
  }
export async function getStaticProps(context) {
    return {
      props: { card: {} },
    }
  }

export default function Card({card}) {
  return (
    <div>

      <main>
        Name
      </main>
    </div>
  )
}
