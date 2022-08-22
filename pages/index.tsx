
import type { NextPageWithLayout } from './_app';;
import Layout from '../component/layout';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li><a href="/memberships">Memberships</a></li>
        <li><a href="/users">Users</a></li>
      </ul>
    </div>
  );
}

Home.getLayout = Layout;

export default Home;
