import React from 'react';
import {
    Box,
    Grid,
    Typography
} from '@mui/material';
import { styled } from "@material-ui/styles";
import IosShareIcon from '@mui/icons-material/IosShare';
import IconButton from '@mui/material/IconButton';


//dash border
const boxStyle = {

    border: '2px dashed #797E7F',
    direction: "column",
    alignItems: "center",
    justify: "center",
    borderRadius: 15,

}
const Input = styled('input')({
    display: 'none',
});

const Title = styled(Typography)(() => ({
    // fontWeight: 'bold',
    color: '#797E7F',
    marginTop: 5,
    fontSize: fTitle,
}))

const SubTitle = styled(Typography)(() => ({
    color: '#797E7F',
    marginTop: 1,
    fontSize: fSubtitle,
}))

const fTitle = { xs: '18px', sm: '18px', md: '12px', lg: '12px', xl: '18px' }
const fSubtitle = { xs: '12px', sm: '12px', md: '10px', lg: '8px', xl: '12px' }

export default function AddAsset() {
    return (


        <Box style={boxStyle}  >
            <Grid container spacing={1}>
                <Grid item xs={12} display="flex" sx={{ justifyContent: 'center' }}>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <IosShareIcon sx={{ mt: 15, zIndex: 2, color: '#797E7F' }} />
                    </label>
                </Grid>
                <Grid item xs={12} display="flex" sx={{ justifyContent: 'center' }}>
                    <Title sx={{ fontSize: fTitle }}>
                        Select folders to upload Images
                    </Title>
                </Grid>
                <Grid item xs={12} display="flex" sx={{ justifyContent: 'center' }}>
                    <SubTitle sx={{ fontSize: fSubtitle }}>
                        or Drag and Drop, Copy and Paste
                    </SubTitle>
                </Grid>
            </Grid>
        </Box>
    );
}