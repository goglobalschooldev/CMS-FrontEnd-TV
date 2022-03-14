import styled from '@emotion/styled'
import { Box, Button, Grid, Typography, } from '@mui/material'
import React from 'react'

const AlignTitle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[700],
    // backgroundColor: "#fff",
    justifyContent: 'center',
    display: 'flex',
    padding: theme.spacing(1),
    width: '100%',
    height: '100px'
}))

const BoxImg = styled(Button)(({ theme }) => ({
    width: '100%',
    borderRadius: 5,
    background: theme.palette.grey[100],
    padding: 30
}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    padding: 5,
};
export default function ModalforImg({ handleCloseSub, handleAddSubs, title }) {

    return (
        <Box sx={style}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ textAlign: 'center', color: "grey.700" }}>
                        {title}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <BoxImg>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <AlignTitle
                                    onClick={() => {
                                        handleAddSubs();
                                        handleCloseSub();
                                    }}
                                    sx={{
                                        borderRadius: "10px"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </BoxImg>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <BoxImg>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AlignTitle

                                    sx={{
                                        borderRadius: "10px 0 0 10px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <AlignTitle
                                    sx={{
                                        borderRadius: "0 10px 10px 0"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </BoxImg>
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <BoxImg>
                        <Grid container spacing={1.5} >
                            <Grid item xs={4}>
                                <AlignTitle
                                    sx={{
                                        borderRadius: "10px 0 0 10px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <AlignTitle />
                            </Grid>
                            <Grid item xs={4}>
                                <AlignTitle
                                    sx={{
                                        borderRadius: "0 10px 10px 0"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </BoxImg>
                </Grid>
            </Grid>
        </Box >

    )
}
