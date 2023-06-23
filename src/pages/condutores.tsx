import { QUERY } from '@/constants';
import { getAllCondutores } from '@/services/condutor.service';
import { CondutorPageTemplate } from '@/templates/Condutor';
import { getAxiosData } from '@/utils/getAxiosData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function CondutorPage() {
  return <CondutorPageTemplate />
}

export default CondutorPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERY.ALL_CONDUTORES], getAxiosData(getAllCondutores))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}