import React from 'react';
import { Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Typography, Grid, Box, Button, Modal } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TableMedia from '../components/Media/TableMedia';
import AddAsset from '../components/Media/AddAsset';
import { useVCAxios } from 'use-vc-axios'
import api from '../api/posts'


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
const fSubtitle = { xs: '16px', sm: '16px', md: '12px', lg: '10px', xl: '16px' }

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
        backgroundColor: '#f5f5f5',
        borderRadius: 7,
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const gridStyle = {
    justifyContent: 'right',
    display: 'flex'

}


export default function Media() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState('')
    // const [location, setLocation] = React.useState('')
    const [post, setPost] = React.useState([])

    const { data, loading, refetch, error } = useVCAxios({
        axiosInstance: api,
        method: 'GET',
        url: `/api/cms/media/get?page=${page}&limit=${limit}&keyword=${keyword}`

    })

    React.useEffect(() => {
        refetch()
    }, [keyword])

    React.useEffect(() => {
        if (data) {
            // console.log(data, "file Media")
            setPost(data.docs)
        }
    }, [data])

    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant='h4' > Media </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={6} >
                    <Search sx={{
                        borderRadius: 7,
                        justifyContent: 'left',
                        display: 'flex'
                    }} >
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'grey.400' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Grid>

                <Grid item xs={6} style={gridStyle} >
                    <Button variant='contained' onClick={handleOpen}>Add Asset+</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            borderRadius: 7,
                            width: 350,
                            p: 3,
                        }}>

                            <AddAsset />
                        </Box>
                    </Modal>
                </Grid>
                <Grid item xs={12}>
                    <TableMedia post={post} />
                </Grid>

            </Grid>

        </Box>
    )
}
