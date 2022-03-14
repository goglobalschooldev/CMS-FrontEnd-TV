import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Divider, Button, Container, TextField, IconButton, Icon } from '@mui/material'
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from 'uuid';
import TableCreater from "./CreateNews/TableCreater";
import RemoveButton from "@mui/icons-material/Remove"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CreateTool from "./CreateTool";
import { Markup } from "interweave";

const Input = styled('input')({
    display: 'none',
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        ton: {
            margin: theme.spacing(1),
        },
    }
}))

export default function CreateNews() {

    const classes = useStyles();
    const [itemNews, setItemNews] = useState([]);

    const FirstTitle = <TextField
        placeholder="Empty"
        label="title"
    />
    const textArea = <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Empty"
        style={{ width: 200 }}
    />
    const uploadImg = <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
        </IconButton>
    </label>

    const [inputFields, setInputFields] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Input", inputFields);
    };
    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), FirstTitle }])
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4' > News </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={5}>
                            <Typography
                                variant='h4'
                                sx={{
                                    textAlign: 'center',
                                    width: "70%",
                                    paddingBottom: 2,
                                    fontWeight: 'bold',
                                }}>
                                CreateNews
                            </Typography>
                            {/* <TableCreater /> */}
                            <CreateTool setItemNews={setItemNews} />
                        </Grid>
                        <Grid item xs={7}>
                            <Container>
                                <Card sx={{ maxWidth: "100%", p: 2 }}>
                                    {/* <form className={classes.root} onSubmit={handleSubmit}> */}
                                    {/* {inputFields.map(inputField => (
                                            <div
                                                key={inputField.id}
                                                name="FirstTitle"
                                                onChange={event => handleChangeInput(inputField.id, event)}

                                            >
                                                {inputField.FirstTitle}
                                                <IconButton
                                                    disabled={inputFields.length === 0}
                                                    onClick={() => handleRemoveFields(inputField.id)}
                                                >
                                                    <RemoveButton />
                                                </IconButton>
                                            </div>
                                        ))} */}
                                    {/* <Button
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
                                            type="number"
                                            endIcon={<Icon>send</Icon>}
                                            onClick={handleAddFields}
                                        >
                                            Add
                                        </Button> */}

                                    <Grid container spacing={3}>

                                        {
                                            itemNews.map((i) => (
                                                <Grid item xs={12}>
                                                    {i.check === "Title" ? <Markup content={`<h3>${i.text}</h3>`} /> : <></>}
                                                    {i.check === "Subtitle" ? <Markup content={`<p>${i.text}</p>`} /> : <></>}
                                                    {i.check === "Description" ? <Markup content={`<p>${i.text}</p>`} /> : <></>}
                                                    {i.check === "List" ?
                                                        <Markup content={`<ul>  
                                                        ${i.text.split('\n').map(t => (`<li>${t}</li>`)).join('')}
                                                        </ul>`} /> : <></>
                                                    }

                                                    {i.check === "Image" ? <Markup content={`<img
                                                                src=""                                                            
                                                                alt="preview"
                                                            />`} /> : <></>
                                                    }

                                                </Grid>
                                            ))
                                        }

                                        {/* ${i.text.split('/wtv7q/').map((itext, key) => {
                                                            return `<li>${itext}</li>`.join('')
                                                    })} */}

                                        <Grid item xs={12}>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                endIcon={<Icon>send</Icon>}
                                                onClick={handleSubmit}
                                            >
                                                POST
                                            </Button>
                                        </Grid>
                                    </Grid>





                                    {/* </form> */}
                                </Card>
                            </Container>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {/* <TableCreater /> */}
                </Grid>
            </Grid>
        </Box>
    )
}
