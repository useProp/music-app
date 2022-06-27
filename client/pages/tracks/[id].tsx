import React, {useEffect, useState} from 'react';
import {Track} from "../../types/track";
import {useRouter} from "next/router";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<Track>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/tracks/comments', {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, res.data] })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <MainLayout title={`Music App - ${track.name} - ${track.artist}`}>
      <Button
        variant={'outlined'}
        style={{fontSize: 32}}
        onClick={() => router.push('/tracks')}
      >
        Back To List
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <img src={'http://localhost:4000/' + track.picture} width={200} height={200}/>
        <div style={{margin: 30}}>
          <h1>Name - {track.name}</h1>
          <h1>Artist - {track.artist}</h1>
          <h1>Listens - {track.listens }</h1>
        </div>
      </Grid>
      <h1>Track&apos;s Text</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField
          {...username}
          label={'Enter your name'}
          fullWidth
        />
        <TextField
          {...text}
          label={'Enter your comment'}
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
      <Button onClick={addComment}>
        Send
      </Button>
      <div>
        {track.comments.map((comment, index) =>
          <div key={index} style={{margin: 10}}>
            <hr/>
            <div>Author - {comment.username}</div>
            <div>Comments - {comment.text }</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const res = await axios.get('http://localhost:4000/api/tracks/' + params.id);
  console.log(res.data)
  return {
    props: {
      serverTrack: res.data,
    }
  }
}
