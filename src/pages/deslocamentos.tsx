import { QUERY } from '@/constants';
import { getAllClientes } from '@/services/cliente.service';
import { getAllCondutores } from '@/services/condutor.service';
import { getAllDeslocamentos } from '@/services/deslocamento.service';
import { getAllVeiculos } from '@/services/veiculo.service';
import { CondutorPageTemplate } from '@/templates/Condutor';
import { getAxiosData } from '@/utils/getAxiosData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function DeslocamentoPage() {
  return <CondutorPageTemplate />
}

export default DeslocamentoPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERY.ALL_DESLOCAMENTOS], getAxiosData(getAllDeslocamentos));
  await queryClient.prefetchQuery([QUERY.ALL_CLIENTES], getAxiosData(getAllClientes));
  await queryClient.prefetchQuery([QUERY.ALL_CONDUTORES], getAxiosData(getAllCondutores));
  await queryClient.prefetchQuery([QUERY.ALL_VEICULOS], getAxiosData(getAllVeiculos));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}