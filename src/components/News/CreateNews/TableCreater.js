import React, { useState } from "react";
import { Box, Grid, Typography, Divider, Button, Modal } from '@mui/material'
import { styled } from '@mui/material/styles';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import TitleIcon from '@mui/icons-material/Title';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ModalforTitle from "./ModalforTitle";
import ModalforList from "./ModalforList";
import ModalforImg from "./ModalforImg";
import ModalforSub from "./ModalforSub";

const BoxMain = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
    padding: theme.spacing(3),
    width: '70%',
    borderRadius: 10,
}))

const MiniBox = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "fff" : theme.palette.grey[100],
    ...theme.typography.body1,
    padding: theme.spacing(1),
    width: '100%',
    textAlign: 'center',
    flexDirection: 'column',
    color: theme.palette.grey[700],
}))

const sizeIcon = {
    fontSize: 40
}

export default function TableCreater() {

    const [open, setOpen] = useState(false);
    const [openSub, setOpenSub] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [openDes, setOpenDes] = useState(false);
    const [title, setTitle] = useState("");

    const handleClose = () => {
        setOpen(false);
        setOpenSub(false);
        setOpenList(false);
        setOpenImg(false);
        setOpenDes(false);
    };

    const handleOpenTitle = () => {
        setTitle("Title Formatting")
        setOpen(true);
    }
    const handleOpenSub = () => {
        setTitle("Subtitle Formatting")
        setOpenSub(true);
    }
    const handleOpenDes = () => {
        setTitle("Description Formatting")
        setOpenDes(true);
    }
    const handleOpenList = () => {
        setTitle("List Formatting")
        setOpenList(true);
    }
    const handleOpenImg = () => {
        setTitle("Layout Image Formatting")
        setOpenImg(true);
    }

    return (
        <BoxMain>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <MiniBox onClick={handleOpenTitle} >
                        <TitleIcon sx={sizeIcon} />
                        Title
                    </MiniBox>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <ModalforTitle title={title} handleClose={handleClose} />
                    </Modal>
                </Grid>
                <Grid item xs={6}>
                    <MiniBox onClick={handleOpenSub}>
                        <TextFieldsIcon sx={sizeIcon} />
                        Subtitle
                    </MiniBox>
                    <Modal
                        open={openSub}
                        onClose={handleClose}
                    >
                        <ModalforSub handleCloseSub={handleClose} title={title} />
                    </Modal>
                </Grid>
                <Grid item xs={6}>
                    <MiniBox onClick={handleOpenDes}>
                        <FormatAlignLeftIcon sx={sizeIcon} />
                        Description
                    </MiniBox>
                    <Modal
                        open={openDes}
                        onClose={handleClose}
                    >
                        <ModalforTitle onClose={handleClose} title={title} />
                    </Modal>
                </Grid>
                <Grid item xs={6}>
                    <MiniBox onClick={handleOpenList}>
                        <FormatListNumberedIcon sx={sizeIcon} />
                        List
                    </MiniBox>
                </Grid>
                <Modal
                    open={openList}
                    onClose={handleClose}
                >
                    <ModalforList title={title} />
                </Modal>
                <Grid item xs={12}>
                    <MiniBox onClick={handleOpenImg}>
                        <ImageIcon sx={sizeIcon} />
                        Choose Image
                    </MiniBox>
                    <Modal
                        open={openImg}
                        onClose={handleClose}
                    >
                        <ModalforImg title={title} />
                    </Modal>
                </Grid>
            </Grid>
        </BoxMain>
    )
}
