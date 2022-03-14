import * as React from 'react'
import { Typography, Grid, Box, Button, Stack, InputLabel, Container } from '@mui/material'
import Divider from '@mui/material/Divider';
import { withStyles, styled } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@mui/material/InputAdornment';
import AlertMessage from '../components/Footer/AlertMessage';
import api from '../api/posts'

const CssTextField = withStyles({
    root: {
        "& .MuiInputLabel-root": {
            color: "black",
        },
        "& label.Mui-focused": {
            color: "#e0e0e0",
        },
        "& .MuiFilledInput-root": {
            backgroundColor: '#e0e0e0',
            borderColor: "#e0e0e0",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#e0e0e0",
                borderRadius: 15,
            },
            "&:hover fieldset": {
                borderColor: "black",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#424242",
            },
        },
    },
})(TextField);

const CssAboutText = withStyles({
    root: {
        "& .MuiInputLabel-root": {
            color: "black",
        },
        "& label.Mui-focused": {
            color: "#e0e0e0",
        },
        "& .MuiFilledInput-root": {
            backgroundColor: '#e0e0e0',
            borderColor: "#e0e0e0",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: 15,
                border: "2px dashed #e0e0e0",

            },
            "&:hover fieldset": {
                borderColor: "black",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#424242",
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFilledInput-root": {
            backgroundColor: '#e0e0e0'
        }
    },
    body: {
        width: "95%",
        height: 780,
        backgroundColor: "white",
        borderRadius: 20,
        // marginLeft: 5,
        padding: 3,
        margin: 20,

    }
}));

export default function Footer() {
    const [alert, setAlert] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [typeMessage, setTypeMessage] = React.useState("")
    const classes = useStyles();

    const SupplySchema = Yup.object().shape({
        email: Yup.string().required("email is required!"),
        tell: Yup.string().required("tell is required!"),
        address: Yup.string().required("address is required!"),
        aboutUs: Yup.string().required("aboutUs is required!"),
        facebook: Yup.string(),
        instagram: Yup.string(),
        telegrame: Yup.string(),
        youtube: Yup.string(),
        tiktok: Yup.string()

    });
    const formik = useFormik({
        initialValues: {

        },
        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(values);

            await api.put('/api/cms/footer/editFooter', values).then((res) => {
                // console.log(res.data.message)
                setMessage(res.data.message)
                setTypeMessage('success')
                setAlert(true)
            })
        },
    });

    const {
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setFieldValue,
        resetForm,
    } = formik;


    React.useEffect(async () => {
        await api.get('/api/cms/footer/getFooter').then((res) => {
            console.log(res?.data[0], "footer")

            setFieldValue("email", res?.data[0].email)
            setFieldValue("tell", res?.data[0].tell)
            setFieldValue("address", res?.data[0].address)
            setFieldValue("aboutUs", res?.data[0].aboutUs)
            setFieldValue("facebook", res?.data[0].facebook)
            setFieldValue("instagram", res?.data[0].instagram)
            setFieldValue("telegrame", res?.data[0].telegrame)
            setFieldValue("youtube", res?.data[0].youtube)
            setFieldValue("tiktok", res?.data[0].tiktok)
        })
    }, [])

    return (

        <Box >
            <Grid container spacing={2} sx={{ marginBottom: 5 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: 3 }}>
                    <Typography variant='h4'> Footer </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
            <Box className={classes.body}>
                <Grid container>
                    <Grid item xs={8} sx={{ px: 10, py: 5 }}>
                        <Container sx={{ alignItems: 'center', alignSelf: 'center', }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="h4" component="h3" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                                    Contact Us
                                </Typography>
                                <Typography sx={{ fontSize: 12, }}>
                                    Anyone question or marks? Just writeus a message
                                </Typography>
                            </Box>

                            <FormikProvider value={formik} sx={{ alignSelf: 'center', }} >
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    {/* <Stack direction="row" spacing={5} sx={{ mt: 5, mb: 2 }}> */}
                                    <Grid container spacing={3} sx={{ mt: 3, mb: 2 }}>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                            <Box>
                                                <InputLabel>
                                                    Email
                                                </InputLabel>
                                                <CssTextField
                                                    fullWidth
                                                    {...getFieldProps("email")}
                                                    error={Boolean(
                                                        touched.email && errors.email
                                                    )}
                                                    helperText={touched.email && errors.email}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                            <Box>
                                                <InputLabel>
                                                    Phone Number
                                                </InputLabel>
                                                <CssTextField
                                                    fullWidth
                                                    {...getFieldProps("tell")}
                                                    error={Boolean(
                                                        touched.tell && errors.tell
                                                    )}
                                                    helperText={touched.tell && errors.tell}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* </Stack> */}
                                    <Box sx={{ mt: 2 }}>
                                        <InputLabel>
                                            Address
                                        </InputLabel>
                                        <CssTextField
                                            fullWidth
                                            {...getFieldProps("address")}
                                            error={Boolean(
                                                touched.address && errors.address
                                            )}
                                            helperText={touched.address && errors.address}
                                        />
                                    </Box>
                                </Form>
                            </FormikProvider>

                            <Box sx={{ textAlign: "center", mt: 7, mb: 5 }}>
                                <Typography variant="h4" component="h3" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                                    Contact Us
                                </Typography>
                                <Typography sx={{ fontSize: 12, }}>
                                    Anyone question or marks? Just writeus a message
                                </Typography>
                            </Box>
                            <Box sx={{ height: 100 }}>
                                <CssAboutText
                                    rows={8}
                                    multiline
                                    fullWidth
                                    {...getFieldProps("aboutUs")}
                                    error={Boolean(
                                        touched.aboutUs && errors.aboutUs
                                    )}
                                    helperText={touched.aboutUs && errors.aboutUs}
                                />
                            </Box>
                        </Container>
                    </Grid>

                    <Grid item xs={4} sx={{ pr: 5, py: 6 }}>
                        <Container>
                            <Box sx={{ marginBottom: 5 }}>
                                <Typography variant="h4" component="h3" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                                    FollowUs
                                </Typography>
                                <Typography sx={{ fontSize: 12, }}>
                                    Anyone question or marks?
                                </Typography>
                            </Box>
                            <FormikProvider value={formik} sx={{ alignSelf: 'center' }} >
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                                    <Box sx={{ mt: 2 }}>
                                        <InputLabel>
                                            Facebook Link
                                        </InputLabel>
                                        <CssTextField
                                            placeholder='https:'
                                            fullWidth
                                            {...getFieldProps("facebook")}
                                            error={Boolean(
                                                touched.facebook && errors.facebook
                                            )}
                                            helperText={touched.facebook && errors.facebook}
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             https:
                                        //         </InputAdornment>
                                        //     ),
                                        // }}

                                        />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <InputLabel>
                                            Instagram Link
                                        </InputLabel>
                                        <CssTextField
                                            placeholder='https:'
                                            fullWidth
                                            {...getFieldProps("instagram")}
                                            error={Boolean(
                                                touched.instagram && errors.instagram
                                            )}
                                            helperText={touched.instagram && errors.instagram}

                                        />
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <InputLabel>
                                            Telegram Link
                                        </InputLabel>
                                        <CssTextField
                                            placeholder='https:'
                                            fullWidth
                                            {...getFieldProps("telegrame")}
                                            error={Boolean(
                                                touched.telegrame && errors.telegrame
                                            )}
                                            helperText={touched.telegrame && errors.telegrame}

                                        />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <InputLabel>
                                            Youtube Link
                                        </InputLabel>
                                        <CssTextField
                                            placeholder='https:'
                                            fullWidth
                                            {...getFieldProps("youtube")}
                                            error={Boolean(
                                                touched.youtube && errors.youtube
                                            )}
                                            helperText={touched.youtube && errors.youtube}

                                        />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <InputLabel>
                                            Tik Tok Link
                                        </InputLabel>
                                        <CssTextField
                                            fullWidth
                                            placeholder='https:'
                                            {...getFieldProps("tiktok")}
                                            error={Boolean(
                                                touched.tiktok && errors.tiktok
                                            )}
                                            helperText={touched.tiktok && errors.tiktok}

                                        />
                                    </Box>

                                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                                        <Button
                                            type="submit"
                                            size="large"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            sx={{
                                                backgroundColor: "#5B5BF6",
                                                "&:hover": {
                                                    backgroundColor: "#5B5BF6",
                                                },
                                            }}
                                        >
                                            SAVE ALL
                                        </Button>
                                        <Typography sx={{ fontSize: 12, mt: 2, textAlign: 'center' }}>
                                            This is for saving all of contact, about and follow us!
                                        </Typography>
                                    </Box>
                                </Form>
                            </FormikProvider>

                        </Container>
                    </Grid>

                    {/* </Grid> */}

                </Grid>
            </Box>
            <AlertMessage alert={alert} setAlert={setAlert} message={message} typeMessage={typeMessage} />
        </Box>



    )
}

