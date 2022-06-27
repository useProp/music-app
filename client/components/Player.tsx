import React, {useEffect} from 'react';
import {Grid, IconButton} from "@mui/material";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from '../styles/Player.module.scss';
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

let audio;

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player);
  const { playTrack, pauseTrack, setActiveTrack, setVolume, setDuration, setCurrentTime } = useActions();

  const play = () => {
    if (pause) {
      playTrack()
      audio.play();
    } else {
      pauseTrack()
      audio.pause();
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    audio.volume = Number(e.target.value) / 100;
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
    audio.currentTime = Number(e.target.value);
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:4000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
  }

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <Pause/> : <PlayArrow/>}
      </IconButton>
      <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
        <div>{active?.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{marginLeft: 'auto'}}/>
      <TrackProgress
        left={volume}
        right={100}
        onChange={changeVolume}
      />
    </div>
  );
};

export default Player;
