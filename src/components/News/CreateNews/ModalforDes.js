import styled from '@emotion/styled'
import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

const AlignTitle = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(1)
}))

const fontIcon = {
    fontSize: 50,
    color: "grey.700"
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};
export default function ModalforDes({ handleAddSubs, handleCloseSub, title }) {

    return (
        <Box width='100%'>
            <Box sx={style}>
                <Grid container width='100%' spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" width='100%' sx={{ textAlign: 'center', color: "grey.700" }}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <AlignTitle
                            onClick={() => {
                                handleAddSubs();
                                handleCloseSub();
                            }}
                        >
                            <FormatAlignLeftIcon sx={fontIcon} />
                        </AlignTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <AlignTitle>
                            <FormatAlignRightIcon sx={fontIcon} />
                        </AlignTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <AlignTitle>
                            <FormatAlignCenterIcon sx={fontIcon} />
                        </AlignTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <AlignTitle>
                            <FormatAlignJustifyIcon sx={fontIcon} />
                        </AlignTitle>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    )
}
