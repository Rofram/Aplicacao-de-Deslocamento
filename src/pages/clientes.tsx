import { QUERY } from '@/constants';
import { getAllClientes } from '@/services/cliente.service';
import { ClientePageTemplate } from '@/templates/Cliente';
import { getAxiosData } from '@/utils/getAxiosData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function ClientPage() {
return <ClientePageTemplate />
}

export default ClientPage;

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([QUERY.ALL_CLIENTES], getAxiosData(getAllClientes));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}