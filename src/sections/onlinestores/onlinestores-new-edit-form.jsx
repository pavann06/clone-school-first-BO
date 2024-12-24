// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// // import { useMemo } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useCallback , useMemo} from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import { useSnackbar } from 'src/components/snackbar';

// // UI Components (Material-UI)
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { MenuItem } from '@mui/material';
// Add this to your Material-UI imports at the top

// Form Components
// import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function OnlineStoresNewEditForm() {
  //   const queryClient = useQueryClient();
  //   const OnlineStoreSchema = Yup.object().shape({
  //     name: Yup.string().required('Item name is required'),
  //     category: Yup.string().required('Category is required'),
  //     description: Yup.string().required('Description is required'),
  //     variants: Yup.object().required('Variants are required'),
  //     thumbnail: Yup.mixed().required('Thumbnail image is required'),
  //     images: Yup.array().min(1, 'At least one image is required'),
  //     status: Yup.boolean().required('Status is required'),
  //     mrp: Yup.number().required('MRP is required').positive('MRP must be positive'),
  //     finalPrice: Yup.number()
  //       .required('Final Price is required')
  //       .positive('Final Price must be positive'),
  //     mrpPercentage: Yup.number()
  //       .required('MRP Percentage is required')
  //       .integer('Percentage must be an integer')
  //       .min(0, 'Cannot be negative'),
  //     gstPercentage: Yup.number()
  //       .required('GST Percentage is required')
  //       .integer('Must be an integer')
  //       .min(0, 'Cannot be negative'),
  //     thumbnailTag: Yup.string(),
  //     discountTag: Yup.string(),
  //     highlights: Yup.array().of(Yup.string().required('Highlight cannot be empty')),
  //     priority: Yup.number().default(1).integer('Priority must be an integer'),
  //     trending: Yup.boolean().required('Trending is required'),
  //   });
  //   const defaultValues = useMemo(
  //     () => ({
  //       name: currentOnlineStore?.name || '',
  //       category: currentOnlineStore?.category || '',
  //       description: currentOnlineStore?.description || '',
  //       variants: currentOnlineStore?.variants || {},
  //       thumbnail: currentOnlineStore?.thumbnail || '',
  //       images: currentOnlineStore?.images || [],
  //       status: currentOnlineStore?.status || false,
  //       mrp: currentOnlineStore?.mrp || 0,
  //       finalPrice: currentOnlineStore?.finalPrice || 0,
  //       mrpPercentage: currentOnlineStore?.mrpPercentage || 0,
  //       gstPercentage: currentOnlineStore?.gstPercentage || 0,
  //       thumbnailTag: currentOnlineStore?.thumbnailTag || '',
  //       discountTag: currentOnlineStore?.discountTag || '',
  //       highlights: currentOnlineStore?.highlights || [],
  //       priority: currentOnlineStore?.priority || 1,
  //       trending: currentOnlineStore?.trending || false,
  //     }),
  //     [currentOnlineStore]
  //   );
  //   const methods = useForm({
  //     resolver: yupResolver(OnlineStoreSchema),
  //     defaultValues,
  //   });
  //   const {
  //     handleSubmit,
  //     setValue,
  //     watch,
  //     formState: { isSubmitting },
  //   } = methods;
  //   const onSubmit = async (data) => {
  //     console.log('Submitted data:', data);
  //     // Perform API call logic here
  //   };
  //   const handleDrop = useCallback(
  //     (acceptedFiles) => {
  //       const files = watch('images') || [];
  //       const newFiles = acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //       setValue('images', [...files, ...newFiles], { shouldValidate: true });
  //     },
  //     [setValue, watch]
  //   );
  //   // Calculate GST Amount
  //   const finalPrice = watch('finalPrice') || 0;
  //   const gstPercentage = watch('gstPercentage') || 0;
  //   const gstAmount =
  //     gstPercentage > 0
  //       ? ((finalPrice / (100 + gstPercentage)) * gstPercentage).toFixed(2)
  //       : '0.00';
  //   return (
  //     <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
  //       <Grid container spacing={3} justifyContent="center" alignItems="center">
  //         <Grid xs={12} md={8}>
  //           <Card>
  //             <CardHeader title="Online Store Form" />
  //             <Stack spacing={3} sx={{ p: 3 }}>
  //               {/* Item Name and Category */}
  //               <RHFTextField name="name" label="Item Name" />
  //               <RHFTextField name="category" label="Category" />
  //               {/* Description */}
  //               <RHFTextField name="description" label="Description" multiline rows={4} />
  //               {/* Variants */}
  //               <RHFTextField name="variants" label="Variants (JSON format)" />
  //               {/* Thumbnail and Images */}
  //               <Typography variant="subtitle2">Thumbnail Image</Typography>
  //               <RHFUpload name="thumbnail" onDrop={handleDrop} />
  //               <Typography variant="subtitle2">Additional Images</Typography>
  //               <RHFUpload name="images" multiple onDrop={handleDrop} />
  //               {/* Pricing and Tags */}
  //               <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
  //                 <RHFTextField name="mrp" label="MRP" type="number" />
  //                 <RHFTextField name="finalPrice" label="Final Price" type="number" />
  //                 <RHFTextField name="mrpPercentage" label="MRP Percentage" type="number" />
  //                 <RHFTextField name="gstPercentage" label="GST Percentage" type="number" />
  //               </Box>
  //               {/* GST Amount (Read-only Field) */}
  //               <TextField
  //   label="GST Amount"
  //   value={gstAmount}
  //   InputProps={{
  //     readOnly: true,
  //   }}
  //   variant="outlined"
  // />
  //               {/* Other Fields */}
  //               <RHFTextField name="thumbnailTag" label="Thumbnail Tag" />
  //               <RHFTextField name="discountTag" label="Discount Tag" />
  //               {/* Highlights */}
  //               <RHFTextField name="highlights" label="Highlights (Comma-separated)" />
  //               {/* Priority and Trending */}
  //               <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
  //                 <RHFTextField name="priority" label="Priority" type="number" />
  //                 {/* <RHFSelect name="trending" label="Trending">
  //                   <MenuItem value={true}>Yes</MenuItem>
  //                   <MenuItem value={false}>No</MenuItem>
  //                 </RHFSelect> */}
  //               </Box>
  //               <LoadingButton
  //                 type="submit"
  //                 variant="contained"
  //                 size="large"
  //                 loading={isSubmitting}
  //               >
  //                 {currentOnlineStore ? 'Save Changes' : 'Create Store'}
  //               </LoadingButton>
  //             </Stack>
  //           </Card>
  //         </Grid>
  //       </Grid>
  //     </FormProvider>
  //   );
}

// OnlineStoresNewEditForm.propTypes = {
//   currentOnlineStore: PropTypes.object,
// };
