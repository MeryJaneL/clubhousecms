import { ReactElement } from 'react';
import Layout from '../layouts';

main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

function main() {
  return <div>main</div>;
}

export default main;
