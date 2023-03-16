import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageHeader from 'src/content/Management/Dev/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import { styled } from '@mui/material/styles';
import jwt from 'jsonwebtoken'
import ManageUsers from 'src/content/Management/Dev/ManageUsers';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function DevPanel({ user, product }) {
  const [currentTab, setCurrentTab] = useState('manage_product');

  const tabs = [
  
    { value: 'manage_product', label: 'Gerenciar produtos' },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Gerencimento - Diamonds Store</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader user={user}/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
           
            {currentTab === 'manage_product' && <ManageUsers infos={product[0]} total={product} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DevPanel.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);
export async function getServerSideProps({ req, res }) {
  const id = req.cookies.user || null
  const decoded = jwt.decode(id)
  if(id == null){
    res.writeHead(303, { Location: '/login' });
    res.end();
  return {
    props: {user: null }, 
  }
} else {
  const userApi = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/infouser/'+decoded.id)
  .then(r => r.json())
  .catch(console.error)
  const perms = userApi.Perms
 if(perms.includes('manage_product')){
    res.writeHead(303, { Location: '/'})
    res.end()
    return { 
        props: { }
    }
 }
 const infosProduct = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/dev/painel')
 .then(r => r.json())
 .catch(console.error)
  return {
    props: {user: userApi, id, product: infosProduct }, 
  }
}
}
export default DevPanel;
