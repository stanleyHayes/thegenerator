import './App.css';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import countryTelData from "country-telephone-data";
import axios from "axios";
import {useState} from "react";

function App() {
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            digits: "",
            countryCode: `none`
        },
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values, {resetForm, setSubmitting}) => {
            try {
                setSubmitting(true);
                const response = await axios({
                    method: 'POST',
                    url: `https://thegenerator-api.herokuapp.com/api/v1/admin/phone-numbers`,
                    data: values,
                    responseType: 'blob'
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(`download`, `${values.countryCode}.txt`);
                document.body.appendChild(link);
                link.click();
                setSubmitting(false);
                setError(null);
            } catch (e) {
                setSubmitting(false);
                setError(e.response.data.message);
            }
            resetForm();
        },
        validationSchema: Yup.object().shape({
            digits: Yup.string().required('4 digits required').length(4, 'Digits must be 4 in length'),
            countryCode: Yup.string().required('Country required')
        })
    });
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center'
            }}>
            <Container maxWidth="sm">
                <form onSubmit={formik.handleSubmit}>
                    <Card elevation={0}>
                        {formik.isSubmitting && (
                            <LinearProgress variant="query" color="secondary" />
                        )}
                        <CardContent>
                            {error && (
                                <Alert severity="error">
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            <Stack sx={{mb: 4}} direction="column" spacing={2}>
                                <Typography
                                    align="center"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 200,
                                        textTransform: 'uppercase',
                                    }} variant="h3">
                                    The Enigma
                                </Typography>

                                <Typography align="center" variant="body1" sx={{color: 'text.secondary', mb: 2}}>
                                    Select the country you want to generate numbers for
                                </Typography>
                                <Typography align="center" variant="body1" sx={{color: 'text.secondary', mb: 2}}>
                                    Enter the four-digit prefix for the numbers
                                </Typography>
                                <Typography align="center" variant="body1" sx={{color: 'text.secondary', mb: 2}}>
                                    Exercise some patients while the numbers get generated
                                </Typography>
                            </Stack>
                            <Grid sx={{mb: 4}} container={true} spacing={2}>
                                <Grid item={true} xs={12} md={6}>
                                    <Select
                                        fullWidth={true}
                                        sx={{mb: 2}}
                                        required={true}
                                        variant="outlined"
                                        size="medium"
                                        value={formik.values.countryCode}
                                        onChange={formik.handleChange}
                                        name="countryCode"
                                        type="text"
                                        label="Country">
                                        <MenuItem value="none">Select Country</MenuItem>
                                        {countryTelData.allCountries.map(country => {
                                            return (
                                                <MenuItem
                                                    key={country.iso2}
                                                    value={country.iso2}>
                                                    {country.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    {formik.touched.countryCode && formik.errors.countryCode &&
                                        (
                                            <Typography variant="body2" color="error">
                                                {formik.errors.countryCode}
                                            </Typography>
                                        )}
                                </Grid>
                                <Grid item={true} xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        size="medium"
                                        placeholder="Enter 4 digit prefix"
                                        label="4 Digits"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(formik.touched.digits && formik.errors.digits)}
                                        helperText={formik.errors.digits && formik.errors.digits}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        name="digits"
                                        value={formik.values.digits}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                disabled={formik.isSubmitting}
                                sx={{textTransform: 'capitalize'}}
                                size="large"
                                color="secondary"
                                fullWidth={true}
                                variant="contained"
                                disableElevation={true}>
                                Generate Numbers
                            </Button>

                        </CardContent>
                    </Card>
                </form>
            </Container>
        </Box>
    );
}

export default App;
