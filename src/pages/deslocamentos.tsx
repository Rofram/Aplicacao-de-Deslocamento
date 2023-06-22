import { QUERY } from '@/constants';
import { getAllDeslocamentos } from '@/services/deslocamento.service';
import { CondutorPageTemplate } from '@/templates/Condutor';
import { getAxiosData } from '@/utils/getAxiosData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function DeslocamentoPage() {
  return <CondutorPageTemplate />
}

export default DeslocamentoPage;

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([QUERY.ALL_DESLOCAMENTOS], getAxiosData(getAllDeslocamentos));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}