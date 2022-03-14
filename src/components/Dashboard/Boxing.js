import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { GoGraph } from "react-icons/go";
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import api from '../../api/posts';
import { Markup } from 'interweave';

const fTitle = { xs: '18px', sm: '18px', md: '12px', lg: '12px', xl: '18px' }
const fSubtitle = { xs: '12px', sm: '12px', md: '10px', lg: '8px', xl: '12px' }
const fText = { xs: '20px', sm: '25px', md: '20px', lg: '15px', xl: '25px' }
const f200 = { xs: '25px', sm: '30px', md: '20px', lg: '20px', xl: '30px' }

const colors = '#472CC9'

const Item = styled(Box)(() => ({
    border: '1px solid #797E7F',
    borderRadius: 30,
    height: 270,
    padding: 25,
}))

const Border = styled(Box)(() => ({
    border: '2px solid #797E7F',
    borderRadius: 5,
}))

const Title = styled(Typography)(() => ({
    color: '#797E7F',
    fontWeight: 'bold',
    marginTop: 1,
    fontSize: fTitle,
}))
const SubTitle = styled(Typography)(() => ({
    color: '#797E7F',
    marginTop: 1,
    fontSize: fSubtitle,
}))

const NextText = styled(Typography)(() => ({
    color: colors,
    fontWeight: 'bold',
    marginTop: 10,
}))

const Status = styled(GoGraph)(() => ({
    color: colors,
    marginTop: 10,
    width: 250,
    height: 220,
    borderRadius: 10,

}))

const Status1 = styled(GoGraph)(() => ({
    color: '#797E7F',
    marginTop: 10,
    width: 250,
    height: 220,
    borderRadius: 10,

}))


const TextPro = styled(Typography)(() => ({
    color: colors,
    fontWeight: 'bold',
    fontSize: fText,

}))



function Boxing() {
    const [totalView, setTotalView] = useState([])
    const [totalLike, setTotalLike] = useState([])
    const [topView, setTopView] = useState([])
    const [topLike, setTopLike] = useState([])
    const [doc, setDoc] = useState("");

    useEffect(async () => {
        await api.get('api/cms/dashboard/getTotalView').then((res) => {
            setTotalView(res.data.totalViews)
        })
        await api.get('/api/cms/dashboard/getTotalLike').then((res) => {
            // console.log(res.data.totalLike)
            setTotalLike(res.data.totalLike)

        })
        await api.get('/api/cms/dashboard/getTopViews').then((res) => {
            console.log(res.data)
            setTopView(res.data)

            setDoc(new DOMParser().parseFromString("<h2>New Acticle</h2>", "text/xml"))
            console.log(doc.firstChild.innerHTML)

        })
        await api.get('/api/cms/dashboard/getTopLike').then((res) => {
            setTopLike(res.data)
        })
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NextText sx={{ fontSize: f200 }}>
                    30 Days Performance
                </NextText>
            </Grid>

            {/*TotalViews*/}
            <Grid item xs={12} sm={6} md={4} lg={3} >
                <Item sx={{ display: 'flex' }}>
                    <Status>
                        <GoGraph />
                    </Status>

                    <Grid container >
                        <Grid xs={6}>
                            <TextPro sx={{ fontSize: fText, mt: 10 }}>
                                {totalView}
                            </TextPro>
                            <TextPro sx={{ fontSize: fText }}>
                                Views
                            </TextPro>
                        </Grid>
                    </Grid>
                </Item>
            </Grid>

            {/*TotalLikes*/}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item sx={{ display: 'flex' }} >
                    <Status1>
                        <GoGraph />
                    </Status1>
                    <Grid container >
                        <Grid xs={6}>
                            <TextPro sx={{ fontSize: fText, mt: 10 }}>
                                {totalLike}
                            </TextPro>
                            <TextPro sx={{ fontSize: fText }}>
                                Likes
                            </TextPro>
                        </Grid>
                    </Grid>
                </Item>
            </Grid>

            {/*TopViews*/}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item sx={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        <Grid xs={12}>
                            <TextPro sx={{ fontSize: fText }}>
                                Top Views
                            </TextPro>
                        </Grid>

                        {topView.map((item, index) => (
                            <>
                                <Grid xs={10}>
                                    <Title sx={{ fontSize: fTitle }}>
                                        {/* 1. {item.article} */}
                                        <Markup content={item.title} />

                                    </Title>
                                    <SubTitle sx={{ fontSize: fSubtitle }}>
                                        {/* {item.article} */}
                                    </SubTitle>

                                </Grid>
                                <Grid xs={2}>
                                    <Border sx={{ mt: 3 }}>
                                        <CardMedia
                                            component="img"
                                            height="40"
                                            image="https://www.inpixio.com/remove-background/images/main-before.jpg"
                                            fontSize="10"
                                        />
                                    </Border>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Item>
            </Grid>


            {/*TopLikes*/}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item sx={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        <Grid xs={12}>
                            <TextPro sx={{ fontSize: fText }}>
                                TopLike
                            </TextPro>
                        </Grid>
                        {topLike.map((item, index) => (
                            <>
                                <Grid item xs={10}>
                                    <Title sx={{ fontSize: fTitle }}>
                                        1. {item.article}
                                    </Title>
                                    <SubTitle sx={{ fontSize: fSubtitle }}>
                                        Lorem ipsum dolor sit amet, consetetur
                                        sadipscing elitr, sed diam nonumy eirmod
                                    </SubTitle>
                                </Grid>

                                <Grid xs={2}>
                                    <Border sx={{ mt: 3 }}>
                                        <CardMedia
                                            component="img"
                                            height="40"
                                            image="https://www.inpixio.com/remove-background/images/main-before.jpg"
                                            fontSize="10"
                                        />
                                    </Border>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Item>

            </Grid>

        </Grid>
    )
}

export default Boxing