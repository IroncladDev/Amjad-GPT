export default function Reauth() {
  return "Please clear your cookies and try logging in again"
}

export async function getServerSideProps({ req, res }) {
  return {
    redirect: {
      destination: "/"
    }
  }
}