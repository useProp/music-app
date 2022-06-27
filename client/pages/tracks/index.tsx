import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Card, Grid, Button, Box, TextField} from "@mui/material";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks, searchTracks} from "../../store/action-creators/track";
import {useDispatch} from "react-redux";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector(state => state.track);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => await dispatch(await searchTracks(e.target.value)), 500)
    )
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Music App - Track List`}>
      <Grid container justifyContent={'center'}>
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent={'space-between'}>
              <h1>Tracks List</h1>
              <Button onClick={() => router.push('/tracks/create')}>Upload Track</Button>
            </Grid>
          </Box>
          <TextField
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () =>
  {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());

    return { props: {} }
  }
);
