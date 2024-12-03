import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Product } from '@/app/types/Product';


const CreateProductModal = ({ open, handleClose, handleCreate, handleUpdate, productData } : any) => {
  const [formData, setFormData] = useState<Product>({
    _id: productData?._id || '',
    name: productData?.name || '',
    description: productData?.description || '',
    ratings: productData?.ratings || [],
    averageRating: productData?.averageRating || 0,
    imageUrl: productData?.imageUrl || '',
    isFavorite: productData?.isFavorite || false,
    estimatedPrice: {
        minPrice: productData?.estimatedPrice?.minPrice || 1,
        maxPrice: productData?.estimatedPrice?.maxPrice || 2,
    },
    comments: productData?.comments || []
  });



  useEffect(() => {
    if (open && productData) {
      setFormData(productData);
    }
  }, [open, productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevData => {
      if (name === 'minPrice' || name === 'maxPrice') {
          return {
            ...prevData,
            estimatedPrice: {
                ...prevData.estimatedPrice,
                [name]: Number(value)
            }
          };
      } else {
          return {
            ...prevData,
            [name]: value
          };
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); //evitar que refresque la pagina (default behaviour del form)
    if (formData._id) {
      console.log("Form data id: ", formData._id)
      console.log("Form data: ", formData)
      handleUpdate(formData._id, formData); // LLama function update con datos del form
    } else {
      handleCreate(formData); // LLama function create
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-4 rounded-md">
    <Typography variant="h6" component="h2" gutterBottom>

        {formData._id ? 'Update' : 'Create'} Product

        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin="normal"
            name="minPrice"
            label="Min. Price"
            type="number"
            value={formData.estimatedPrice.minPrice.toString()}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="maxPrice"
            label="Max. Price"
            type="number"
            value={formData.estimatedPrice.maxPrice.toString()}
            onChange={handleChange}
            required
          />
          {/* <TextField
            fullWidth
            margin="normal"
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          /> */}

          <div className="mt-4 flex justify-center">
            <Button
                onClick={handleClose}
                sx={{ mr: 1 }}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300
                    rounded-md hover:bg-gray-50"
            >
                Cancel
            </Button>
            <Button
                type='submit'
                sx={{ mr: 1 }}
                className="px-4 py-2 text-sm font-bold text-white bg-black rounded-md hover:bg-gray-800"
            >
                {formData._id ? 'Update' : 'Create'}
            </Button>
          </div>

        </form>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;