import *as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Typography, Grid, Box, Button, Modal } from '@mui/material'
import { Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@mui/styles';
import TableMedia from '../components/Media/TableMedia';
import Add_Ads from '../components/Ads/Add_Ads';
import { useVCAxios } from 'use-vc-axios'
import api from '../api/posts'

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

const useStyles = makeStyles({
    root: {
        background: '#FAFAFA',
        width: "100%",
        borderRadius: 10,
        color: 'black'
    },
    cate: {
        width: "100%",
    },
});

export default function Ads() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openNews, setOpenNews] = React.useState(false);
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [post, setPost] = React.useState([])
    const classes = useStyles();

    const { data, loading, refetch, error } = useVCAxios({
        axiosInstance: api,
        method: 'GET',
        url: `/api/cms/adsData/get?page=${page}&limit=${limit}&keyword=${keyword}&location=${location}`

    })


    React.useEffect(() => {
        refetch()
    }, [keyword, location])

    React.useEffect(() => {
        if (data) {
            console.log(data, "file Ads")
            setPost(data.docs)
        }
    }, [data])

    // console.log(post)
    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4' > Advertisement </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={6} >
                    <Search sx={{ borderRadius: 5, color: 'grey.400' }} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            onChange={(e) => setKeyword(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Grid>

                <Grid item xs={6}
                    style={gridStyle}>
                    <Button variant='contained' onClick={handleOpenNews}> + Add Ads</Button>
                    <Modal
                        open={openNews}
                        onClose={handleCloseNews}
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
                            p: 3,
                        }}>
                            <Add_Ads />
                        </Box>
                    </Modal>
                </Grid>

                <Grid item xs={6} >
                    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={3} >
                            <Button className={classes.root}
                                disableElevation
                                onClick={() => setLocation('')}>
                                All </Button>
                        </Grid>
                        <Grid item xs={3} >
                            <Button className={classes.root} onClick={() => setLocation('topBar')}>Top Bar</Button>
                        </Grid>
                        <Grid item xs={3} >
                            <Button className={classes.root} onClick={() => setLocation('sideBar')}>Side Bar</Button>
                        </Grid>
                        <Grid item xs={3} >
                            <Button className={classes.root} onClick={() => setLocation('body')}>Body</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableMedia post={post} />
                </Grid>
            </Grid>
        </Box >
    );
}
