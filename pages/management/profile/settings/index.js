import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageHeader from 'src/content/Management/Users/settings/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { styled } from '@mui/material/styles';
import jwt from 'jsonwebtoken'
import EditProfileTab from 'src/content/Management/Users/settings/EditProfileTab';
import SecurityTab from 'src/content/Management/Users/settings/SecurityTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings({ user }) {
  const [currentTab, setCurrentTab] = useState('edit_profile');


  const tabs = [
  
    { value: 'edit_profile', label: 'Geral' },
    { value: 'security', label: 'Segurança' }
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Configuração de conta - LaionBOT</title>
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
           
            {currentTab === 'edit_profile' && <EditProfileTab user={user} />}
            {currentTab === 'security' && <SecurityTab user={user}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);
export async function getServerSideProps({ req, res }) {
  const id = req.cookies.user || null
  const decoded = jwt.decode(id)
  if(id == null){
    res.writeHead(303, { Location: '/login' });
    res.end();
  return {
    props: {user: null}, 
  }
} else {
  const userApi = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL+'/api/infouser/'+decoded.id)
  .then(r => r.json())
  .catch(console.error)
 
  return {
    props: {user: userApi, id}, 
  }
}
}
export default ManagementUserSettings;
