import { QUERY } from '@/constants';
import { getAllVeiculos } from '@/services/veiculo.service';
import { VeiculoPageTemplate } from '@/templates/Veiculo';
import { getAxiosData } from '@/utils/getAxiosData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function VeiculoPage() {
  return <VeiculoPageTemplate />
}

export default VeiculoPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERY.ALL_VEICULOS], getAxiosData(getAllVeiculos));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}
