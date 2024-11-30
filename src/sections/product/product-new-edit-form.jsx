import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { CreateProduct, UpdateProduct } from 'src/api/product';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField,RHFAutocomplete } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function ProductNewEditForm({ currentProduct }) {

  const queryClient = useQueryClient();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();


  const NewProductSchema = Yup.object().shape({
    product_name: Yup.string().required('Product name is required'),
    product_description: Yup.string(),
    images: Yup.array(),
    sku: Yup.string(),
    quantity_type: Yup.string().required('Quantity type is required'),
    default_price: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      product_name: currentProduct?.product_name || '',
      product_description: currentProduct?.product_description || '',
      images: currentProduct?.images || [],
      sku: currentProduct?.sku || '',
      quantity_type: currentProduct?.quantity_type || 'KG',
      default_price: currentProduct?.default_price || 0,

    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {

    // if update product
    let response = {}
    if(currentProduct){
      data.product_id = currentProduct.id
      response = await UpdateProduct(data);
    }
    // if create product
    else{
      response = await CreateProduct(data)
    }

    const {success, description } = response

    // product creation success
    if (success){
      enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');
      // invalidate cache
      queryClient.invalidateQueries(['products']);

      // redirect to product list
      router.push(paths.dashboard.product.root);
      return;
    }

    // product creation failed
    enqueueSnackbar(description);
    reset();

  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="product_name" label="Product Name" />


                <RHFTextField name="sku" label="Product SKU" />

                <RHFAutocomplete
                  name="quantity_type"
                  label="Quantity Type"
                  options={['KG', 'TON','BAG','LITRE','UNIT','NA']}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => setValue('quantity_type', value, { shouldValidate: true })}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                />


                <RHFTextField name="default_price" label="Deafult Price" />

                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <RHFTextField
                    name="product_description"
                    label="Product Descrption"
                    multiline
                    rows={4}
                  />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Images</Typography>
                    <RHFUpload
                      multiple
                      thumbnail
                      name="images"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      onUpload={() => console.info('ON UPLOAD')}
                    />
                  </Stack>
                </Box>
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }} // Align the button to the right
              >
                {!currentProduct ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct: PropTypes.any,
};
