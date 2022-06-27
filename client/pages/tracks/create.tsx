import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import {useRouter} from "next/router";
import axios from "axios";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [audio, setAudio] = useState();
  const [picture, setPicture] = useState();
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const next = () => {
    if ( activeStep < 2) {
      setActiveStep(prev => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('audio', audio);
      formData.append('picture', picture);
      axios.post('http://localhost:4000/api/tracks', formData)
        .then(() => router.push('/tracks'))
        .catch(e => console.log(e))
    }
  }

  const back = () => {
    activeStep > 0 && setActiveStep(prev => prev - 1);
  }

  return (
    <MainLayout title={'Upload Track'}>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction={'column'} style={{padding: 20}}>
            <TextField
              {...name}
              label={'Track name'}
              style={{marginTop: 10}}
            />
            <TextField
              {...artist}
              label={'Artist'}
              style={{marginTop: 10}}
            />
            <TextField
              {...text}
              label={'Text'}
              style={{marginTop: 10}}
              multiline
              rows={3}
            />
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload
            setFile={setPicture}
            accept={'image/*'}
          >
            <Button>Upload Picture</Button>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload
            setFile={setAudio}
            accept={'audio/*'}
          >
            <Button>Upload Track</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent={'space-between'}>
        <Button disabled={activeStep === 0} onClick={back}>Back</Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
