import React from 'react';
import Navbar from "../components/Navbar";
import {Container} from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords } ) => {
  return (
    <>
      <Head>
        <title>{title || 'Music App'}</title>
        <meta name={'description'} content={'Music App - Perfect place for all your tracks:) ' + description || ''}/>
        <meta name={'robots'} content={'index, follow'} />
        <meta name={'keywords'} content={keywords || 'Music, Tracks, Artists'}/>
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'}/>
      </Head>
      <Navbar/>
      <Container style={{marginTop: 90}}>
        {children}
      </Container>
      <Player/>
    </>
  );
};

export default MainLayout;
